import axios from "axios";
import * as cheerio from "cheerio";
import { unstable_cache } from "next/cache";

interface GMPData {
	gmpValue: string;
	gmpPercent: string;
}

interface FinancialPeriod {
	periodEnded: string;
	revenue: string;
	expense: string;
	pat: string;
	assets: string;
}

interface IPODetails {
	ipoOpenDate: string;
	ipoCloseDate: string;
	faceValue: string;
	ipoPriceBand: string;
	issueSize: string;
	freshIssue: string;
	issueType: string;
	ipoListing: string;
	drhpProspectus: string;
	rhpProspectus: string;
	financialReport: FinancialPeriod[];
	about: string;
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
	// Extended IPO Details
	ipoOpenDate?: string;
	ipoCloseDate?: string;
	faceValue?: string;
	ipoPriceBand?: string;
	freshIssue?: string;
	issueType?: string;
	ipoListing?: string;
	drhpProspectus?: string;
	rhpProspectus?: string;
	financialReport?: FinancialPeriod[];
	about?: string;
	innerPageUrl?: string; // [NEW] For optimization
}

// ==========================================
// HELPER 1: Fetch Complete IPO Details
// ==========================================
async function fetchInnerPageDetails(
	url: string | undefined
): Promise<IPODetails> {
	const defaultDetails: IPODetails = {
		ipoOpenDate: "TBA",
		ipoCloseDate: "TBA",
		faceValue: "TBA",
		ipoPriceBand: "TBA",
		issueSize: "TBA",
		freshIssue: "TBA",
		issueType: "TBA",
		ipoListing: "TBA",
		drhpProspectus: "",
		rhpProspectus: "",
		financialReport: [],
		about: "",
	};

	try {
		if (!url) return defaultDetails;

		const { data } = await axios.get(url, {
			headers: { "User-Agent": "Mozilla/5.0" },
			timeout: 10000,
		});
		const $ = cheerio.load(data);

		const details: IPODetails = { ...defaultDetails };

		// ========================================
		// 1. SCRAPE IPO DETAILS TABLE
		// ========================================
		$("tr").each((i, el) => {
			const tds = $(el).find("td");
			if (tds.length >= 2) {
				const label = $(tds[0]).text().trim().toLowerCase();
				const value = $(tds[1]).text().trim();

				if (label.includes("ipo open date")) {
					details.ipoOpenDate = value || "TBA";
				} else if (label.includes("ipo close date")) {
					details.ipoCloseDate = value || "TBA";
				} else if (label.includes("face value")) {
					details.faceValue = value || "TBA";
				} else if (label.includes("ipo price band")) {
					details.ipoPriceBand = value || "TBA";
				} else if (label.includes("issue size") && !label.includes("lot")) {
					details.issueSize = value || "TBA";
				} else if (label.includes("fresh issue")) {
					details.freshIssue = value || "TBA";
				} else if (label.includes("issue type")) {
					details.issueType = value || "TBA";
				} else if (label.includes("ipo listing")) {
					details.ipoListing = value || "TBA";
				} else if (label.includes("drhp draft prospectus")) {
					const link = $(tds[1]).find("a").attr("href");
					details.drhpProspectus = link || "";
				} else if (label.includes("rhp draft prospectus")) {
					const link = $(tds[1]).find("a").attr("href");
					details.rhpProspectus = link || "";
				}
			}
		});

		// ========================================
		// 2. SCRAPE FINANCIAL REPORT TABLE
		// ========================================
		$("table").each((tableIndex, table) => {
			const headerRow = $(table).find("tr").first();
			const headerText = headerRow.text().toLowerCase();

			// Check if this is the financial table
			if (
				headerText.includes("period") &&
				headerText.includes("revenue") &&
				headerText.includes("expense")
			) {
				// Find column indices
				let periodIdx = -1,
					revenueIdx = -1,
					expenseIdx = -1,
					patIdx = -1,
					assetsIdx = -1;

				headerRow.find("td, th").each((i, th) => {
					const text = $(th).text().toLowerCase().trim();
					if (text.includes("period")) periodIdx = i;
					if (text.includes("revenue")) revenueIdx = i;
					if (text.includes("expense")) expenseIdx = i;
					if (text.includes("pat")) patIdx = i;
					if (text.includes("asset")) assetsIdx = i;
				});

				// Extract data rows
				$(table)
					.find("tr")
					.each((rowIndex, row) => {
						if (rowIndex === 0) return; // Skip header

						const cells = $(row).find("td");
						if (cells.length > 0) {
							const period: FinancialPeriod = {
								periodEnded:
									periodIdx >= 0 ? $(cells[periodIdx]).text().trim() : "N/A",
								revenue:
									revenueIdx >= 0 ? $(cells[revenueIdx]).text().trim() : "N/A",
								expense:
									expenseIdx >= 0 ? $(cells[expenseIdx]).text().trim() : "N/A",
								pat: patIdx >= 0 ? $(cells[patIdx]).text().trim() : "N/A",
								assets:
									assetsIdx >= 0 ? $(cells[assetsIdx]).text().trim() : "N/A",
							};
							details.financialReport.push(period);
						}
					});
			}
		});

		// ========================================
		// 3. SCRAPE ABOUT SECTION
		// ========================================
		$("h2, h3, h4").each((i, heading) => {
			const headingText = $(heading).text().toLowerCase();
			if (headingText.includes("about")) {
				// Get all following paragraphs until next heading
				let aboutText = "";
				let current = $(heading).next();

				while (current.length > 0 && current.is("p")) {
					aboutText += current.text().trim() + "\n\n";
					current = current.next();
				}

				details.about = aboutText.trim();
				return false; // Break the loop
			}
		});

		return details;
	} catch (e) {
		console.error("Error fetching inner page details:", (e as Error).message);
		return defaultDetails;
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
						// Action: Visit the inner page to get complete IPO details
						const details = await fetchInnerPageDetails(link);

						return {
							name: cleanName,
							inittial: initial,
							status: statusRaw,
							type: type,
							ipoPrice: priceRaw || "TBA",
							issueSize: details.issueSize,
							date: !dateRaw
								? "TBA"
								: dateRaw.replace(" to ", " - ").replace("–", " - "),
							gmp: [
								{
									currentGmp: currentGmp,
									currentGmpPercentage: currentPercent,
								},
							],
							// Extended IPO Details from inner page
							ipoOpenDate: details.ipoOpenDate,
							ipoCloseDate: details.ipoCloseDate,
							faceValue: details.faceValue,
							ipoPriceBand: details.ipoPriceBand,
							freshIssue: details.freshIssue,
							issueType: details.issueType,
							ipoListing: details.ipoListing,
							drhpProspectus: details.drhpProspectus,
							rhpProspectus: details.rhpProspectus,
							financialReport: details.financialReport,
							about: details.about,
							innerPageUrl: link, // [NEW] Store the link
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

// ==========================================
// HELPER 3: Fetch Single IPO by Slug
// ==========================================
export async function getIPOBySlug(slug: string): Promise<IPOItem | null> {
	try {
		// 1. Get the list directly from our Cached function to reuse data
		// This avoids re-scraping the main table and GMP for every detail page request
		const allIPOs = await getCachedActiveIPOs();

		// 2. Find the matching IPO
		const matchedIPO = allIPOs.find((ipo) => {
			const cleanName = ipo.name;
			const currentSlug = cleanName
				.toLowerCase()
				.trim()
				.replace(/\s+/g, "-")
				.replace(/[^\w\-]+/g, "")
				.replace(/\-\-+/g, "-");

			return currentSlug === slug;
		});

		if (!matchedIPO) return null;

		// 3. If we have the details already (from the main scrape), we check if we need more
		// The main scrape ALREADY fetches inner details (ipoOpenDate, etc.)
		// BUT `fetchInnerPageDetails` logic in `processTable` is actually what fills `ipoOpenDate` etc.
		// So `matchedIPO` is ALREADY FULLY POPULATED!
		// We don't need to do ANYTHING else unless `allIPOs` was a "summary-only" list.
		// In `getActiveIPOs`, we do `rowPromises.push(async () => { const details = await fetchInnerPageDetails(link); ... })`
		// So `getCachedActiveIPOs` returns FULL DETAILS.

		return matchedIPO;
	} catch (e) {
		console.error("Error fetching single IPO:", e);
		return null;
	}
}

// ==========================================
// CACHED FUNCTIONS
// ==========================================

export const getCachedActiveIPOs = unstable_cache(
	async () => getActiveIPOs(),
	["active-ipos"],
	{ revalidate: 3600, tags: ["active-ipos"] }
);

export const getCachedIPOBySlug = async (slug: string) => {
	return unstable_cache(async () => getIPOBySlug(slug), ["ipo-details", slug], {
		revalidate: 3600,
		tags: ["ipo-details"],
	})();
};
