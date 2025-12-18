import React from "react";
import Container from "../Common/Container";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	ArrowRight,
	TrendingUp,
	Lock,
	Bell,
	Download,
	Activity,
	ArrowUpRight,
	ArrowDownRight,
	Minus,
} from "lucide-react";

// Dummy Data for Top Stats
const statCards = [
	{
		id: 1,
		label: "IPOs Open",
		value: "3",
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
		icon: Bell,
		iconColor: "text-yellow-400",
	},
	{
		id: 3,
		label: "Market Sentiment",
		value: "Bullish",
		subValue: "",
		subColor: "",
		icon: TrendingUp,
		iconColor: "text-green-400",
	},
	{
		id: 4,
		label: "Avg GMP",
		value: "+18%",
		subValue: "+2.5%",
		subColor: "text-green-500",
		icon: Activity,
		iconColor: "text-yellow-400",
	},
];

// Dummy Data for IPO List
const ipoData = [
	{
		id: 1,
		company: "TechNova Solutions",
		sector: "Technology",
		initial: "T",
		color: "bg-blue-600",
		price: "₹450 - ₹480",
		issueSize: "₹500 Cr",
		openDate: "12 Oct",
		closeDate: "15 Oct",
		gmp: "15%",
		gmpStatus: "Strong",
		trend: "up", // up, down, flat
	},
	{
		id: 2,
		company: "GreenEnergy Ltd",
		sector: "Energy",
		initial: "G",
		color: "bg-green-600",
		price: "₹120 - ₹125",
		issueSize: "₹1200 Cr",
		openDate: "13 Oct",
		closeDate: "16 Oct",
		gmp: "5%",
		gmpStatus: "Mild",
		trend: "up",
	},
	{
		id: 3,
		company: "FinServe Corp",
		sector: "Finance",
		initial: "F",
		color: "bg-purple-600",
		price: "₹800 - ₹850",
		issueSize: "₹2500 Cr",
		openDate: "14 Oct",
		closeDate: "17 Oct",
		gmp: "0%",
		gmpStatus: "Flat",
		trend: "flat",
	},
	{
		id: 4,
		company: "AutoMotive Gears",
		sector: "Automotive",
		initial: "A",
		color: "bg-orange-600",
		price: "₹210 - ₹220",
		issueSize: "₹300 Cr",
		openDate: "10 Oct",
		closeDate: "12 Oct",
		gmp: "45%",
		gmpStatus: "High",
		trend: "up",
	},
	{
		id: 5,
		company: "Urban Infra",
		sector: "Construction",
		initial: "U",
		color: "bg-red-600",
		price: "₹65 - ₹70",
		issueSize: "₹800 Cr",
		openDate: "18 Oct",
		closeDate: "21 Oct",
		gmp: "-2%",
		gmpStatus: "Weak",
		trend: "down",
	},
];

const getGmpBadgeStyle = (trend: string) => {
	switch (trend) {
		case "up":
			return "bg-green-500/15 text-green-500 hover:bg-green-500/25 border-green-500/20";
		case "down":
			return "bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20";
		default:
			return "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 border-blue-500/20";
	}
};

const getTrendIcon = (trend: string) => {
	switch (trend) {
		case "up":
			return <ArrowUpRight className="w-4 h-4 mr-1" />;
		case "down":
			return <ArrowDownRight className="w-4 h-4 mr-1" />;
		default:
			return <Minus className="w-4 h-4 mr-1" />;
	}
};

const Dashboard = () => {
	return (
		<Container className="py-10 space-y-8 text-white">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Current IPO Market
					</h1>
					<p className="text-muted-foreground mt-1 max-w-xl">
						Real-time tracking of active Initial Public Offerings. Stay updated
						with the latest GMP trends and listing gains.
					</p>
				</div>
				<Button variant="outline" className="gap-2 rounded-full cursor-pointer">
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

								<div className="mt-4 flex items-baseline gap-2">
									<h2 className="text-3xl font-bold text-white">
										{card.value}
									</h2>
									{card.subValue && (
										<span className={`text-sm font-medium ${card.subColor}`}>
											{card.subValue}
										</span>
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
			<div className="rounded-[2rem] border border-white/5 bg-secondary text-card-foreground pb-6 pt-0 px-0">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-white/5 hover:bg-secondary">
							<TableHead className="w-[300px] text-xs font-bold text-zinc-500 uppercase tracking-wider py-4">
								COMPANY
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								IPO PRICE
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								ISSUE SIZE
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								OPEN DATE
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								CLOSE DATE
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
								GMP (PREMIUM)
							</TableHead>
							<TableHead className="text-right text-xs font-bold text-zinc-500 uppercase tracking-wider">
								ACTION
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ipoData.map((ipo) => (
							<TableRow
								key={ipo.id}
								className="border-b border-white/5 hover:bg-white/2"
							>
								<TableCell className="py-4">
									<div className="flex items-center gap-4">
										<Avatar className="h-10 w-10 border border-white/10">
											<AvatarImage src="" alt={ipo.company} />
											<AvatarFallback
												className={`${ipo.color} text-white font-bold`}
											>
												{ipo.initial}
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col gap-1">
											<span className="font-bold text-white text-base">
												{ipo.company}
											</span>
											<span className="text-xs text-zinc-500">
												{ipo.sector}
											</span>
										</div>
									</div>
								</TableCell>
								<TableCell className="font-medium text-zinc-300">
									{ipo.price}
								</TableCell>
								<TableCell className="font-medium text-zinc-300">
									{ipo.issueSize}
								</TableCell>
								<TableCell className="font-medium text-zinc-300">
									{ipo.openDate}
								</TableCell>
								<TableCell className="font-medium text-zinc-300">
									{ipo.closeDate}
								</TableCell>
								<TableCell>
									<Badge
										variant="outline"
										className={`gap-1 rounded-full px-3 py-1 text-xs font-medium border ${getGmpBadgeStyle(
											ipo.trend
										)}`}
									>
										{getTrendIcon(ipo.trend)}
										{ipo.gmp} ({ipo.gmpStatus})
									</Badge>
								</TableCell>
								<TableCell className="text-right">
									<Button
										size="icon"
										variant="ghost"
										className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400"
									>
										<ArrowRight className="h-4 w-4" />
										<span className="sr-only">View Details</span>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Container>
	);
};

export default Dashboard;
