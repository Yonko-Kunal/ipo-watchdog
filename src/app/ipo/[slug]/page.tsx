import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

import React from "react";
import Container from "@/components/Common/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableHead,
	TableHeader,
} from "@/components/ui/table";
import { WandSparkles, Loader2, ArrowLeft, Download } from "lucide-react";
import { Link } from "next-view-transitions";
import { getCachedIPOBySlug, IPOItem } from "@/lib/ipoScraper";

// We need a server action to fetch data to keep `ipoScraper` (which might use Node APIs) on server
// But for now, since `ipoScraper` uses axios/cheerio which can run in Node, we should use a Server Component or Route Handler.
// However, the user asked for this structure.
// Let's make this page a Server Component if possible, but we need params.
// Actually, in Next.js 13+, pages are Server Components by default.
// Let's refactor to be a Server Component to fetch data directly.

export default async function IPODetailsPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const ipoData = await getCachedIPOBySlug(slug);

	if (!ipoData) {
		return (
			<Container className="py-20 text-center text-foreground">
				<h1 className="text-2xl font-bold">IPO Not Found</h1>
				<Link href="/dashboard">
					<Button variant="link" className="text-muted-foreground mt-4">
						<ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
					</Button>
				</Link>
			</Container>
		);
	}

	return (
		<Container className="py-10 space-y-8 text-foreground min-h-screen">
			{/* Breadcrumb / Back */}
			<Link
				href="/dashboard"
				className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
			</Link>

			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-foreground/15 dark:border-foreground/5 pb-8">
				<div className="space-y-4 max-w-3xl">
					<div className="flex md:flex-row flex-col md:items-center items-start gap-3">
						<h1
							className="text-4xl font-bold tracking-tight"
							style={{
								viewTransitionName: `ipo-title-${slug}`,
							}}
						>
							{ipoData.name} IPO Details
						</h1>
						<Badge
							className={`
                            ${
															ipoData.status === "Open"
																? "bg-green-500/20 text-green-500 border-green-500/20"
																: ""
														}
                            ${
															ipoData.status === "Closed"
																? "bg-red-500/20 text-red-500 border-red-500/20"
																: ""
														}
                            ${
															ipoData.status === "Upcoming"
																? "bg-neutral-500/20 text-neutral-400 border-neutral-500/20"
																: ""
														}
                        `}
						>
							{ipoData.status}
						</Badge>
					</div>
				</div>

				<Button
					variant="outline"
					className="gap-2 rounded-2xl cursor-pointer text-foreground"
				>
					<WandSparkles className="w-4 h-4" />{" "}
					<AnimatedShinyText>Generate Summary</AnimatedShinyText>
				</Button>
			</div>
			<p className="text-muted-foreground w-full leading-7 md:text-lg text-md">
				{ipoData.about ||
					`${ipoData.name} is one of the leading companies in its sector. The company details and financial reports are listed below for analysis.`}
			</p>

			{/* IPO Details Table */}
			<div className="space-y-4">
				<h2 className="text-xl font-bold">{ipoData.name} IPO Details</h2>
				<div className="rounded-[1.5rem] border border-foreground/15 dark:border-foreground/5 bg-secondary overflow-hidden">
					<Table>
						<TableBody>
							{[
								{ label: "IPO Open Date", value: ipoData.ipoOpenDate },
								{ label: "IPO Close Date", value: ipoData.ipoCloseDate },
								{ label: "Face Value", value: ipoData.faceValue },
								{ label: "IPO Price Band", value: ipoData.ipoPriceBand },
								{ label: "Issue Size", value: ipoData.issueSize },
								{ label: "Fresh Issue", value: ipoData.freshIssue },
								{ label: "Issue Type", value: ipoData.issueType },
								{ label: "IPO Listing", value: ipoData.ipoListing },
							].map((row, i) => (
								<TableRow
									key={i}
									className="border-b border-foreground/15 dark:border-foreground/5 hover:bg-muted-foreground/5"
								>
									<TableCell className="font-medium text-muted-foreground py-4 pl-6 w-1/3">
										{row.label}
									</TableCell>
									<TableCell className="font-bold text-foreground py-4">
										{row.value}
									</TableCell>
								</TableRow>
							))}
							{/* DRHP / RHP Links */}
							<TableRow className="border-b border-foreground/15 dark:border-foreground/5 hover:bg-muted-foreground/5">
								<TableCell className="font-medium text-muted-foreground py-4 pl-6">
									DRHP Draft Prospectus
								</TableCell>
								<TableCell className="py-4">
									{ipoData.drhpProspectus ? (
										<a
											href={ipoData.drhpProspectus}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-wider border border-red-500/20 bg-red-500/10 px-3 py-1 rounded"
										>
											<Download className="w-3 h-3 mr-1" /> Download
										</a>
									) : (
										<span className="text-muted-foreground">N/A</span>
									)}
								</TableCell>
							</TableRow>
							<TableRow className="hover:bg-muted-foreground/5">
								<TableCell className="font-medium text-muted-foreground py-4 pl-6">
									RHP Draft Prospectus
								</TableCell>
								<TableCell className="py-4">
									{ipoData.rhpProspectus ? (
										<a
											href={ipoData.rhpProspectus}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-wider border border-red-500/20 bg-red-500/10 px-3 py-1 rounded"
										>
											<Download className="w-3 h-3 mr-1" /> Download
										</a>
									) : (
										<span className="text-muted-foreground">N/A</span>
									)}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</div>

			{/* Financial Report Table */}
			<div className="space-y-4">
				<h2 className="text-xl font-bold">Company Financial Report</h2>
				<div className="rounded-[1.5rem] border border-foreground/15 dark:border-foreground/5 bg-secondary overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="border-b border-foreground/15 dark:border-foreground/5 hover:bg-transparent">
								<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-4 pl-6">
									Period Ended
								</TableHead>
								<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-4">
									Revenue
								</TableHead>
								<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-4">
									Expense
								</TableHead>
								<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-4">
									PAT
								</TableHead>
								<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-4">
									Assets
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ipoData.financialReport && ipoData.financialReport.length > 0 ? (
								ipoData.financialReport.map((item, index) => (
									<TableRow
										key={index}
										className="border-b border-foreground/15 dark:border-foreground/5 hover:bg-muted-foreground/5 last:border-0"
									>
										<TableCell className="font-bold text-foreground py-4 pl-6">
											{item.periodEnded}
										</TableCell>
										<TableCell className="text-foreground py-4 font-medium">
											{item.revenue}
										</TableCell>
										<TableCell className="text-foreground py-4 font-medium">
											{item.expense}
										</TableCell>
										<TableCell className="text-green-500 py-4 font-bold">
											{item.pat}
										</TableCell>
										<TableCell className="text-foreground py-4 font-medium">
											{item.assets}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={5}
										className="text-center py-8 text-muted-foreground"
									>
										No financial data available.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</Container>
	);
}
