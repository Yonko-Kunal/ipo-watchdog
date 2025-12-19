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

// IPO Data from User
const ipoData = [
	{
		name: "ICICI Prudential AMC",
		inittial: "I",
		status: "Closed",
		type: "Mainboard",
		ipoPrice: "₹2161 to ₹2165",
		issueSize: "Approx ₹10,602.65 Crores",
		date: "12-16 Dec",
		gmp: [
			{
				currentGmp: "₹530",
				currentGmpPercentage: "24.48%",
			},
		],
	},
	{
		name: "KSH International",
		inittial: "K",
		status: "Closed",
		type: "Mainboard",
		ipoPrice: "₹365 to ₹384",
		issueSize: "Approx ₹710.00 Crores",
		date: "16-18 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Gujarat Kidney",
		inittial: "G",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹108 to ₹114",
		issueSize: "Approx ₹250.80 Crores",
		date: "22-24 Dec",
		gmp: [
			{
				currentGmp: "₹10",
				currentGmpPercentage: "8.77%",
			},
		],
	},
	{
		name: "Clean Max Enviro",
		inittial: "C",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹5,200 Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Sunshine Pictures",
		inittial: "S",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹[.] Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Hero Fincorp",
		inittial: "H",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹3,668.13 Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Orient Cables",
		inittial: "O",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹700 Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Curefoods",
		inittial: "C",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹[.] Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Hero Motors",
		inittial: "H",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹1,200 Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Priority Jewels",
		inittial: "P",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹[.] Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Tea Post",
		inittial: "T",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹[.] Crores, 2,85,00,000 Equity Shares",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Clean Max",
		inittial: "C",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹5,200 Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Juniper Green Energy",
		inittial: "J",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹3,000 Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Omnitech Engineering",
		inittial: "O",
		status: "Upcoming",
		type: "Mainboard",
		ipoPrice: "₹-",
		issueSize: "Approx ₹850 Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Ashwini Container Movers",
		inittial: "A",
		status: "Closed",
		type: "SME",
		ipoPrice: "₹135 to ₹142",
		issueSize: "Approx ₹71.00 Crores",
		date: "12-16 Dec",
		gmp: [
			{
				currentGmp: "₹3",
				currentGmpPercentage: "2.11%",
			},
		],
	},
	{
		name: "Stanbik Agro",
		inittial: "S",
		status: "Closed",
		type: "SME",
		ipoPrice: "₹30",
		issueSize: "Approx ₹12.28 Crores",
		date: "12-16 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Exim Routes",
		inittial: "E",
		status: "Closed",
		type: "SME",
		ipoPrice: "₹83 to ₹88",
		issueSize: "Approx ₹43.73 Crores",
		date: "12-16 Dec",
		gmp: [
			{
				currentGmp: "₹32",
				currentGmpPercentage: "36.36%",
			},
		],
	},
	{
		name: "Neptune Logitek",
		inittial: "N",
		status: "Closed",
		type: "SME",
		ipoPrice: "₹126",
		issueSize: "Approx ₹46.62 Crores",
		date: "15-17 Dec",
		gmp: [
			{
				currentGmp: "₹1",
				currentGmpPercentage: "0.79%",
			},
		],
	},
	{
		name: "MARC Technocrats",
		inittial: "M",
		status: "Open",
		type: "SME",
		ipoPrice: "₹88 to ₹93",
		issueSize: "Approx ₹42.59 Crores",
		date: "17-19 Dec",
		gmp: [
			{
				currentGmp: "₹4",
				currentGmpPercentage: "4.30%",
			},
		],
	},
	{
		name: "Global Ocean",
		inittial: "G",
		status: "Open",
		type: "SME",
		ipoPrice: "₹74 to ₹78",
		issueSize: "Approx ₹30.41 Crores",
		date: "17-19 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Phytochem Remedies",
		inittial: "P",
		status: "Open",
		type: "SME",
		ipoPrice: "₹98",
		issueSize: "Approx ₹38.22 Crores",
		date: "18-22 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Shyam Dhani",
		inittial: "S",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹65 to ₹70",
		issueSize: "Approx ₹38.49 Crores",
		date: "22-24 Dec",
		gmp: [
			{
				currentGmp: "₹40",
				currentGmpPercentage: "57.14%",
			},
		],
	},
	{
		name: "Dachepalli Publishers",
		inittial: "D",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹100 to ₹102",
		issueSize: "Approx ₹40.39 Crores",
		date: "22-24 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "EPW India",
		inittial: "E",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹95 to ₹97",
		issueSize: "Approx ₹31.81 Crores",
		date: "22-24 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Sundrex Oil",
		inittial: "S",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹81 to ₹86",
		issueSize: "Approx ₹32.25 Crores",
		date: "22-24 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Admach Systems",
		inittial: "A",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹227 to ₹239",
		issueSize: "Approx ₹42.60 Crores",
		date: "23-26 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Apollo Techno Industries",
		inittial: "A",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹123 to ₹130",
		issueSize: "Approx ₹47.96 Crores",
		date: "23-26 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Nanta Tech",
		inittial: "N",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹209 to ₹220",
		issueSize: "Approx ₹31.81 Crores",
		date: "23-26 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Dhara Rail Projects",
		inittial: "D",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹120 to ₹126",
		issueSize: "Approx ₹50.20 Crores",
		date: "23-26 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Bai Kakaji Polymers",
		inittial: "B",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹177 to ₹186",
		issueSize: "Approx ₹105.17 Crores",
		date: "23-26 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "E to E Transportation",
		inittial: "E",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹164 to ₹174",
		issueSize: "Approx ₹84.22 Crores",
		date: "26-30 Dec",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Infraprime Logistics",
		inittial: "I",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹-",
		issueSize: "Approx ₹[.] Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
	{
		name: "Victory Electric",
		inittial: "V",
		status: "Upcoming",
		type: "SME",
		ipoPrice: "₹-",
		issueSize: "Approx ₹40.66 Crores",
		date: "2025",
		gmp: [
			{
				currentGmp: "₹0",
				currentGmpPercentage: "0%",
			},
		],
	},
];

const getGmpInfo = (
	gmp: { currentGmp: string; currentGmpPercentage: string }[]
) => {
	const current = gmp[0];
	const value = parseFloat(current.currentGmp.replace(/[^0-9.-]/g, "")) || 0;

	let trend = "flat";
	if (value > 0) trend = "up";
	if (value < 0) trend = "down";

	return {
		trend,
		value: current.currentGmp,
		percentage: current.currentGmpPercentage,
	};
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

const getGmpBadgeStyle = (trend: string) => {
	switch (trend) {
		case "up":
			return "bg-green-500/15 text-green-500 hover:bg-green-500/25 border-green-500/20";
		case "down":
			return "bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20";
		default:
			return "bg-zinc-500/15 text-zinc-400 hover:bg-zinc-500/25 border-zinc-500/20";
	}
};

const getRowStyle = (status: string) => {
	switch (status) {
		case "Open":
			return "bg-green-500/10 hover:bg-green-500/20";
		case "Closed":
			return "bg-red-500/10 hover:bg-red-500/20";
		default:
			return "hover:bg-white/5";
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
			<div className="rounded-[2rem] border border-white/5 bg-secondary text-card-foreground pb-6 pt-0 px-0">
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
							<TableHead className="text-right text-xs font-bold text-zinc-500 uppercase tracking-wider pr-6">
								ACTION
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ipoData.map((ipo, index) => {
							const gmpInfo = getGmpInfo(ipo.gmp);
							return (
								<TableRow
									key={index}
									className={`border-b border-white/5 ${getRowStyle(
										ipo.status
									)}`}
								>
									<TableCell className="py-4 pl-6">
										<div className="flex items-center gap-4">
											<Avatar className="h-10 w-10">
												<AvatarImage src="" alt={ipo.name} />
												<AvatarFallback className="bg-zinc-800 text-white font-bold">
													{ipo.inittial}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col gap-1">
												<span className="font-bold text-white text-base">
													{ipo.name}
												</span>
												<span className="text-xs text-zinc-500">
													{ipo.type}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium text-zinc-300">
										{ipo.ipoPrice}
									</TableCell>
									<TableCell className="font-medium text-zinc-300">
										{ipo.issueSize}
									</TableCell>
									<TableCell className="font-medium text-zinc-300">
										{ipo.date}
									</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={`gap-1 rounded-full px-3 py-1 text-xs font-medium border ${getGmpBadgeStyle(
												gmpInfo.trend
											)}`}
										>
											{getTrendIcon(gmpInfo.trend)}
											{gmpInfo.value} ({gmpInfo.percentage})
										</Badge>
									</TableCell>
									<TableCell className="text-right pr-6">
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
							);
						})}
					</TableBody>
				</Table>
			</div>
		</Container>
	);
};

export default Dashboard;
