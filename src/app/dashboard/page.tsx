"use client";

import React, { useEffect, useState } from "react";
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
	Loader2,
} from "lucide-react";
import axios from "axios";
import { IPOItem } from "@/lib/ipoScraper";

// Dummy Data for Top Stats (Static parts)
const initialStatCards = [
	{
		id: 1,
		label: "IPOs Open",
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

const getGmpInfo = (
	gmp: { currentGmp: string; currentGmpPercentage: string }[]
) => {
	const current = gmp[0] || { currentGmp: "₹0", currentGmpPercentage: "0%" };
	const value = parseFloat(current.currentGmp.replace(/[^0-9.-]/g, "")) || 0;

	let trend = "flat";
	if (value > 0) trend = "up";
	if (value < 0) trend = "down";

	// Parse percentage string to number
	const percentageVal =
		parseFloat(current.currentGmpPercentage.replace(/[^0-9.-]/g, "")) || 0;

	return {
		trend,
		value: current.currentGmp,
		percentage: current.currentGmpPercentage,
		percentageVal,
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

const getGmpBadgeStyle = (percentageVal: number) => {
	if (percentageVal === 0) {
		return "bg-zinc-500/15 text-zinc-400 hover:bg-zinc-500/25 border-zinc-500/20";
	}
	if (percentageVal > 20) {
		return "bg-green-500/15 text-green-500 hover:bg-green-500/25 border-green-500/20";
	}
	return "bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20";
};

const isListingToday = (dateRange: string) => {
	if (!dateRange) return false;
	const parts = dateRange.split("-");
	const endDateStr = parts[parts.length - 1].trim();

	const today = new Date();
	const endDate = new Date(endDateStr);

	return (
		endDate.getDate() === today.getDate() &&
		endDate.getMonth() === today.getMonth() &&
		endDate.getFullYear() === today.getFullYear()
	);
};

const getRowStyle = (status: string, date: string) => {
	if (isListingToday(date)) {
		return "bg-sky-500/10 hover:bg-sky-500/20";
	}
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
	const [data, setData] = useState<IPOItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchIPOs = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/ipo");
			if (response.data.success) {
				setData(response.data.data);
			} else {
				setError("Failed to fetch IPO data");
			}
		} catch (err) {
			setError("Something went wrong. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchIPOs();
	}, []);

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
					<h1 className="text-3xl font-bold tracking-tight">
						Current IPO Market
					</h1>
					<p className="text-muted-foreground mt-1 max-w-xl">
						Real-time tracking of active Initial Public Offerings. Stay updated
						with the latest GMP trends and listing gains.
					</p>
				</div>
				<Button
					variant="outline"
					className="gap-2 rounded-full cursor-pointer"
					onClick={() => window.print()} // Simple export for now
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
										{loading ? (
											<Loader2 className="h-6 w-6 animate-spin" />
										) : (
											card.value
										)}
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
							<TableHead className="text-right text-xs font-bold text-zinc-500 uppercase tracking-wider pr-6">
								ACTION
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={6} className="h-48 text-center">
									<div className="flex flex-col items-center justify-center gap-2">
										<Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
										<p className="text-zinc-500">Fetching latest IPO data...</p>
									</div>
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow>
								<TableCell colSpan={6} className="h-48 text-center">
									<div className="flex flex-col items-center justify-center gap-2">
										<p className="text-red-400 font-medium">{error}</p>
										<Button
											variant="outline"
											onClick={fetchIPOs}
											className="mt-2"
										>
											Retry
										</Button>
									</div>
								</TableCell>
							</TableRow>
						) : data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="h-48 text-center">
									<p className="text-zinc-500">No active IPOs found.</p>
								</TableCell>
							</TableRow>
						) : (
							data.map((ipo, index) => {
								const gmpInfo = getGmpInfo(ipo.gmp);
								return (
									<TableRow
										key={index}
										className={`border-b border-white/5 ${getRowStyle(
											ipo.status,
											ipo.date
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
													gmpInfo.percentageVal
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
							})
						)}
					</TableBody>
				</Table>
			</div>
		</Container>
	);
};

export default Dashboard;
