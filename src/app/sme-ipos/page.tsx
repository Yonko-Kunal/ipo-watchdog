import React from "react";
import Container from "@/components/Common/Container";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Lock, Bell, Download, Activity } from "lucide-react";
import { getCachedActiveIPOs, IPOItem } from "@/lib/ipoScraper";
import IPORow from "@/components/Dashboard/IPORow";

export const dynamic = "force-dynamic";

// Dummy Data for Top Stats (Static parts)
const initialStatCards = [
	{
		id: 1,
		label: "SME IPOs Open",
		value: "0", // dynamic
		subValue: "Active",
		subColor: "text-green-500",
		badge: true,
		icon: Lock,
		iconColor: "text-yellow-500",
	},
	{
		id: 2,
		label: "Listing Today",
		value: "1",
		subValue: "+100% Exp.",
		subColor: "text-green-500",
		badge: false,
		icon: Bell,
		iconColor: "text-yellow-400",
	},
	{
		id: 4,
		label: "Avg GMP",
		value: "+18%",
		subValue: "+2.5%",
		subColor: "text-green-500",
		badge: true,
		icon: Activity,
		iconColor: "text-yellow-400",
	},
];

const SMEIPOPage = async () => {
	const allData = await getCachedActiveIPOs();
	const data = allData.filter((ipo) => ipo.type === "SME");

	// Calculate dynamic stats
	const openIposCount = data.filter((ipo) => ipo.status === "Open").length;
	const statCards = initialStatCards.map((card) => {
		if (card.id === 1) {
			return { ...card, value: openIposCount.toString() };
		}
		return card;
	});

	return (
		<Container className="py-10 space-y-8 text-foreground">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">
						SME IPO Market
					</h1>
				</div>
				<Button
					variant="outline"
					className="gap-2 rounded-full cursor-pointer text-foreground"
					// onClick={() => window.print()}
				>
					<Download className="w-4 h-4 text-foreground" /> Export Data
				</Button>
			</div>

			{/* Top Section - Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{statCards.map((card) => (
					<div
						key={card.id}
						className="bg-secondary text-card-foreground rounded-4xl border border-foreground/15 dark:border-foreground/5 p-6 relative overflow-hidden"
					>
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<p className="text-sm font-medium text-muted-foreground">
									{card.label}
								</p>
							</div>

							<div className="flex items-center gap-2">
								<h2 className="text-2xl font-bold text-foreground">
									{card.value}
								</h2>
								{card.subValue && (
									<Badge
										variant="outline"
										className="text-sm font-medium border-green-500/15 bg-green-500/10"
									>
										<span className={`text-sm font-medium ${card.subColor}`}>
											{card.subValue}
										</span>
									</Badge>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Bottom Section - IPO List Table */}
			<div className="rounded-[2rem] border border-foreground/15 dark:border-foreground/5 bg-secondary text-card-foreground pb-6 pt-0 px-0 min-h-[400px]">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-foreground/15 dark:border-foreground/5">
							<TableHead className="w-[300px] text-xs font-bold text-muted-foreground uppercase tracking-wider py-4 pl-6">
								COMPANY
							</TableHead>
							<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
								IPO PRICE
							</TableHead>
							<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
								ISSUE SIZE
							</TableHead>
							<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
								IPO DATE
							</TableHead>
							<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
								GMP (PREMIUM)
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="h-48 text-center">
									<p className="text-muted-foreground">No SME IPOs found.</p>
								</TableCell>
							</TableRow>
						) : (
							data.map((ipo, index) => <IPORow key={index} ipo={ipo} />)
						)}
					</TableBody>
				</Table>
			</div>
		</Container>
	);
};

export default SMEIPOPage;
