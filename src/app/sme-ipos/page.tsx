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
		id: 3,
		label: "Market Sentiment",
		value: "Bullish",
		subValue: "",
		subColor: "",
		badge: false,
		icon: TrendingUp,
		iconColor: "text-green-400",
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
		<Container className="py-10 space-y-8 text-white">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">SME IPO Market</h1>
					<p className="text-muted-foreground mt-1 max-w-xl">
						Real-time tracking of SME Initial Public Offerings. Stay updated
						with the latest GMP trends and listing gains.
					</p>
				</div>
				<Button
					variant="outline"
					className="gap-2 rounded-full cursor-pointer"
					// onClick={() => window.print()}
				>
					<Download className="w-4 h-4 text-zinc-400" /> Export Data
				</Button>
			</div>

			{/* Top Section - Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{statCards.map((card) => (
					<div
						key={card.id}
						className="bg-secondary text-card-foreground rounded-[2rem] border border-white/5 shadow-sm p-6 relative overflow-hidden"
					>
						<div className="flex justify-between items-start">
							<div>
								<div className="flex items-center gap-2">
									<p className="text-sm font-medium text-zinc-400">
										{card.label}
									</p>
									{card.id === 1 && (
										<Lock className="w-3 h-3 text-yellow-500 opacity-80" />
									)}
								</div>

								<div className="mt-4 flex items-center gap-2">
									<h2 className="text-3xl font-bold text-white">
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
							<div className="p-2 rounded-full bg-white/5">
								<card.icon className={`w-5 h-5 ${card.iconColor}`} />
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Bottom Section - IPO List Table */}
			<div className="rounded-[2rem] border border-white/5 bg-secondary text-card-foreground pb-6 pt-0 px-0 min-h-[400px]">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-white/5">
							<TableHead className="w-[300px] text-xs font-bold text-zinc-500 uppercase tracking-wider py-4 pl-6">
								COMPANY
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								IPO PRICE
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								ISSUE SIZE
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								IPO DATE
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								GMP (PREMIUM)
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="h-48 text-center">
									<p className="text-zinc-500">No SME IPOs found.</p>
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
