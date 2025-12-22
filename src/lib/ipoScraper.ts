import axios from "axios";
import * as cheerio from "cheerio";

interface GMPData {
	gmpValue: string;
	gmpPercent: string;
}

interface IPODetails {
	issueSize: string;
}

export interface IPOItem {
	name: string;
	inittial: string;
	status: string;
	type: string;
	ipoPrice: string;
	issueSize: string;
	date: string;
	gmp: {
		currentGmp: string;
		currentGmpPercentage: string;
	}[];
}

// ==========================================
// HELPER 1: Fetch Issue Size (From Code A)
// ==========================================
async function fetchInnerPageDetails(
	url: string | undefined
): Promise<IPODetails> {
	try {
		if (!url) return { issueSize: "TBA" };

		const { data } = await axios.get(url, {
			headers: { "User-Agent": "Mozilla/5.0" },
			timeout: 5000,
		});
		const $ = cheerio.load(data);

		let issueSize = "TBA";

		// Logic: Scan all rows for "Issue Size"
		$("tr").each((i, el) => {
			const text = $(el).text();
			if (text.includes("Issue Size") && !text.includes("Lot")) {
				const val = $(el).find("td").eq(1).text().trim();
				if (val) issueSize = val;
			}
		});

		return { issueSize };
	} catch (e) {
		return { issueSize: "TBA" };
	}
}

// ==========================================
// HELPER 2: Fetch GMP Map (From Code B)
// ==========================================
async function scrapeGmpMap(): Promise<Record<string, GMPData>> {
	try {
		const url = "https://ipowatch.in/ipo-grey-market-premium-latest-ipo-gmp/";
		const { data } = await axios.get(url, {
			headers: { "User-Agent": "Mozilla/5.0" },
		});
		const $ = cheerio.load(data);
		const gmpMap: Record<string, GMPData> = {};

		let nameIndex = 0;
		let gmpIndex = 1;
		let gainIndex = 3;

		// Dynamic Header Check
		const headerRow = $("table tr").first();
		headerRow.find("td, th").each((i, el) => {
			const text = $(el).text().toLowerCase().trim();
			if (text.includes("stock") || text.includes("ipo name")) nameIndex = i;
			if (text.includes("gmp") && !text.includes("kostak")) gmpIndex = i;
			if (text.includes("gain") || text.includes("listing")) gainIndex = i;
		});

		$("table tr").each((i, el) => {
			if (i === 0) return;
			const tds = $(el).find("td");

			if (tds.length > Math.max(gmpIndex, gainIndex)) {
				const nameRaw = $(tds[nameIndex]).text().trim();
				const gmpRaw = $(tds[gmpIndex]).text().trim();
				const gainRaw = $(tds[gainIndex]).text().trim();

				// Create a normalized key for matching
				const matchName = nameRaw.toLowerCase().replace("ipo", "").trim();

				gmpMap[matchName] = {
					gmpValue: gmpRaw,
					gmpPercent: gainRaw,
				};
			}
		});
		return gmpMap;
	} catch (e) {
		console.error("GMP Scrape Failed:", (e as Error).message);
		return {};
	}
}

// ==========================================
// MAIN FUNCTION: The Merger
// ==========================================
export async function getActiveIPOs(): Promise<IPOItem[]> {
	try {
		// 1. Start fetching the GMP Map immediately (independent task)
		const gmpPromise = scrapeGmpMap();

		// 2. Start fetching the Main Calendar
		const url = "https://ipowatch.in/upcoming-ipo-calendar-ipo-list/";
		const { data } = await axios.get(url, {
			headers: { "User-Agent": "Mozilla/5.0" },
		});
		const $ = cheerio.load(data);

		// 3. Wait for GMP data to be ready before processing rows
		const gmpMap = await gmpPromise;

		const processTable = (tableIndex: number, type: string) => {
			const rows = $("table").eq(tableIndex).find("tr");
			const rowPromises: (() => Promise<IPOItem>)[] = [];

			rows.each((i, el) => {
				if (i === 0) return; // Skip header

				const tds = $(el).find("td");
				if (tds.length >= 4) {
					const nameEl = $(tds[0]);
					const nameRaw = nameEl.text().trim();
					const link = nameEl.find("a").attr("href"); // Captured for Deep Scrape

					if (!nameRaw) return;

					const matchName = nameRaw.toLowerCase().replace("ipo", "").trim();
					const cleanName = nameRaw.replace(" IPO", "").trim();
					const initial = cleanName.charAt(0).toUpperCase();

					const statusRaw = $(tds[1]).text().trim();
					const dateRaw = $(tds[2]).text().trim();
					const priceRaw = $(tds[3]).text().trim();

					// --- GMP MATCHING LOGIC ---
					let currentGmp = "₹0";
					let currentPercent = "0%";

					const gmpData = gmpMap[matchName];
					if (gmpData) {
						if (gmpData.gmpValue && !gmpData.gmpValue.includes("-")) {
							currentGmp = gmpData.gmpValue;
						}
						if (gmpData.gmpPercent && !gmpData.gmpPercent.includes("-")) {
							currentPercent = gmpData.gmpPercent;
						}
					}

					// --- CREATE ASYNC TASK ---
					rowPromises.push(async () => {
						// Action: Visit the inner page to get the correct Issue Size
						const details = await fetchInnerPageDetails(link);

						return {
							name: cleanName,
							inittial: initial,
							status: statusRaw,
							type: type,
							ipoPrice: priceRaw || "TBA",
							issueSize: details.issueSize, // From Inner Page
							date: !dateRaw
								? "TBA"
								: dateRaw.replace(" to ", " - ").replace("–", " - "),
							gmp: [
								{
									currentGmp: currentGmp, // From GMP Map
									currentGmpPercentage: currentPercent,
								},
							],
						};
					});
				}
			});
			return rowPromises;
		};

		// 4. Gather all tasks
		const mainboardTasks = processTable(0, "Mainboard");
		const smeTasks = processTable(1, "SME");

		// 5. Execute all tasks in parallel
		// Note: This might be heavy if there are 50+ IPOs.
		// In production, you might want to slice this array or use a concurrency limiter.
		const allTasks = [...mainboardTasks, ...smeTasks];
		const results = await Promise.all(allTasks.map((fn) => fn()));

		return results;
	} catch (err) {
		console.error("Scraper Error:", (err as Error).message);
		return [];
	}
}
