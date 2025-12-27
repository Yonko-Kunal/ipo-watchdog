import { NextResponse } from "next/server";
import { getCachedActiveIPOs } from "../../../lib/ipoScraper";

// Force this route to be dynamic (not cached forever) so you get fresh data
export const dynamic = "force-dynamic";

export async function GET() {
	const ipos = await getCachedActiveIPOs();

	if (ipos.length === 0) {
		return NextResponse.json(
			{ success: false, message: "No IPOs found or Scraper blocked" },
			{ status: 500 }
		);
	}

	return NextResponse.json({
		success: true,
		count: ipos.length,
		data: ipos,
	});
}
