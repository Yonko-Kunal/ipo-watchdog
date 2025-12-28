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
import { Loader2, ArrowUpRight, ChartNoAxesCombined } from "lucide-react";
import axios from "axios";
import { IPOItem } from "@/lib/ipoScraper";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Hero = () => {
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

	const openMainboard = data.filter(
		(ipo) => ipo.status === "Open" && ipo.type === "Mainboard"
	);
	const openSME = data.filter(
		(ipo) => ipo.status === "Open" && ipo.type === "SME"
	);

	const IPOTableCard = ({
		title,
		ipos,
		link,
		linkLabel,
	}: {
		title: string;
		ipos: IPOItem[];
		link: string;
		linkLabel: string;
	}) => (
		<div className="bg-secondary text-card-foreground rounded-4xl border dark:border-white/5 border-black/10 py-6 pb-3 px-3 relative overflow-hidden flex flex-col h-full">
			<h4 className="text-xl tracking-tight font-bold text-foreground mb-6">
				{title}
			</h4>
			<div className="grow">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-muted-foreground/15 hover:bg-transparent">
							<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-0 h-10">
								COMPANY NAME
							</TableHead>
							<TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-right pr-0 h-10">
								IPO DATE
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow className="hover:bg-transparent border-b border-muted-foreground">
								<TableCell colSpan={2} className="h-32 text-center">
									<div className="flex flex-col items-center justify-center gap-2">
										<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
									</div>
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow className="hover:bg-transparent border-b border-white/5">
								<TableCell colSpan={2} className="h-32 text-center">
									<p className="text-red-400 text-sm">{error}</p>
								</TableCell>
							</TableRow>
						) : ipos.length === 0 ? (
							<TableRow className="hover:bg-transparent border-b border-white/5">
								<TableCell colSpan={2} className="h-32 text-center">
									<div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
										<ChartNoAxesCombined className="h-10 w-10" />
										<p className="text-sm font-medium">No active IPOs found.</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							ipos.slice(0, 3).map((ipo, index) => (
								<TableRow
									key={index}
									className="border-b border-neutral-500/10 hover:bg-white/5"
								>
									<TableCell className="py-4 pl-0">
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10">
												<AvatarImage src="" alt={ipo.name} />
												<AvatarFallback className="bg-neutral-800 text-white font-bold">
													{ipo.inittial}
												</AvatarFallback>
											</Avatar>
											<span className="font-bold text-foreground text-sm">
												{ipo.name}
											</span>
										</div>
									</TableCell>
									<TableCell className="text-right pr-0 font-medium text-muted-foreground text-sm">
										{ipo.date}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			<div className="mt-6 flex justify-center">
				{/* <Link
					href={link}
					className="flex items-center gap-1 text-neutral-400/50 hover:text-neutral-400 text-sm font-bold transition-colors"
				>
					{linkLabel} <ArrowUpRight className="w-4 h-4" />
				</Link> */}
				<Link href={link} className="w-full">
					<Button className="cursor-pointer w-full bg-foreground hover:bg-foreground/90 text-background font-bold rounded-2xl h-12 transition-colors">
						{linkLabel} <ArrowUpRight className="ml-1 w-4 h-4" />
					</Button>
				</Link>
			</div>
		</div>
	);

	return (
		<Container className="py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<IPOTableCard
					title="Open Mainboard IPOs"
					ipos={openMainboard}
					link="/mainboard-ipos"
					linkLabel="More Mainboard IPOs"
				/>
				<IPOTableCard
					title="Open SME IPOs"
					ipos={openSME}
					link="/sme-ipos"
					linkLabel="More SME IPOs"
				/>
			</div>
		</Container>
	);
};

export default Hero;
