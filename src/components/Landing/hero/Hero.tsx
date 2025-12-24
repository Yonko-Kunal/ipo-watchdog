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
import { Loader2, ArrowUpRight } from "lucide-react";
import axios from "axios";
import { IPOItem } from "@/lib/ipoScraper";
import Link from "next/link";

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
		<div className="bg-secondary text-card-foreground rounded-[2rem] border border-white/5 shadow-sm py-6 px-3 relative overflow-hidden flex flex-col h-full">
			<h2 className="text-lg font-bold text-white mb-6">{title}</h2>
			<div className="grow">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-white/5 hover:bg-transparent">
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider pl-0 h-10">
								COMPANY NAME
							</TableHead>
							<TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider text-right pr-0 h-10">
								IPO DATE
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow className="hover:bg-transparent border-b border-white/5">
								<TableCell colSpan={2} className="h-32 text-center">
									<div className="flex flex-col items-center justify-center gap-2">
										<Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
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
									<p className="text-zinc-500 text-sm">No active IPOs found.</p>
								</TableCell>
							</TableRow>
						) : (
							ipos.slice(0, 3).map((ipo, index) => (
								<TableRow
									key={index}
									className="border-b border-zinc-500/10 hover:bg-white/5"
								>
									<TableCell className="py-4 pl-0">
										<div className="flex items-center gap-3">
											<span className="font-bold text-white text-sm">
												{ipo.name}
											</span>
										</div>
									</TableCell>
									<TableCell className="text-right pr-0 font-medium text-zinc-400 text-sm">
										{ipo.date}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			<div className="mt-6 flex justify-center">
				<Link
					href={link}
					className="flex items-center gap-1 text-neutral-400/50 hover:text-neutral-400 text-sm font-bold transition-colors"
				>
					{linkLabel} <ArrowUpRight className="w-4 h-4" />
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
