"use client";

import { MorphingText } from "@/components/ui/morphing-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { gsap } from "gsap";

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

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitTextElement {
	key: string;
	selector: string;
	type: "chars" | "lines" | "words";
}

interface SplitTextConfig {
	type: "chars" | "lines" | "words";
	mask?: "chars" | "lines" | "words";
	charsClass?: string;
	linesClass?: string;
}

function createSplitTexts(elements: SplitTextElement[]): Record<string, any> {
	const splits: Record<string, any> = {};

	elements.forEach(({ key, selector, type }) => {
		const config: SplitTextConfig = { type, mask: type };

		if (type === "chars") config.charsClass = "char";
		if (type === "lines") config.linesClass = "line";
		splits[key] = SplitText.create(selector, config);
	});

	return splits;
}

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

	// GSAP SplitText Animation
	useEffect(() => {
		const splitElements: SplitTextElement[] = [
			{ key: "heroTextFirst", selector: ".hero-text-first", type: "lines" },
			{ key: "heroTextSecond", selector: ".hero-text-second", type: "lines" },
		];

		const splits = createSplitTexts(splitElements);

		// Add your GSAP animations here
		// Example:

		gsap.set([splits.heroTextFirst.lines], {
			y: "100%",
			opacity: 0,
			filter: "blur(12px)",
		});
		gsap.set([splits.heroTextSecond.lines], {
			y: "100%",
			opacity: 0,
			filter: "blur(12px)",
		});

		const tl = gsap.timeline();

		tl.to(splits.heroTextFirst.lines, {
			y: "0",
			opacity: 1,
			filter: "blur(0px)",
			duration: 0.6,
			stagger: 0.1,
			ease: "power2.out",
		}).to(
			splits.heroTextSecond.lines,
			{
				y: "0",
				opacity: 1,
				filter: "blur(0px)",
				duration: 0.76,
				stagger: 0.1,
				ease: "circ.out",
			},
			"-=0.6"
		);

		// Cleanup function
		return () => {
			Object.values(splits).forEach((split: any) => {
				if (split?.revert) split.revert();
			});
		};
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
			<h4 className="text-xl tracking-tight text-center font-bold text-foreground mb-6">
				{title}
			</h4>
			<div className="grow">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-muted-foreground/15 hover:bg-transparent p-3">
							<TableHead className="md:pl-4 pl-0 text-xs font-bold text-muted-foreground uppercase tracking-wider h-10">
								COMPANY NAME
							</TableHead>
							<TableHead className="md:pr-4 pr-0 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right h-10">
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
							ipos.map((ipo, index) => (
								<TableRow
									key={index}
									className="border-b border-neutral-500/10 dark:hover:bg-white/5 hover:bg-black/5"
								>
									<TableCell className="py-4 md:pl-4 pl-0">
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10">
												<AvatarImage src="" alt={ipo.name} />
												<AvatarFallback className="dark:bg-neutral-700/60 bg-neutral-200 text-foreground font-bold">
													{ipo.inittial}
												</AvatarFallback>
											</Avatar>
											<span className="font-bold text-foreground text-sm">
												{ipo.name}
											</span>
										</div>
									</TableCell>
									<TableCell className="text-right md:pr-4 pr-0 font-medium text-muted-foreground text-sm">
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
			<div className="hero-text flex flex-col items-center justify-center md:h-[80vh] h-[60vh]">
				<h1 className="hero-text-first md:text-9xl text-4xl font-bold text-foreground tracking-tighter md:text-center text-start">
					Make Your
					<span className="text-green-500"> IPO </span>
				</h1>
				<h1 className="hero-text-second md:text-9xl text-4xl font-bold text-foreground tracking-tighter md:text-center text-start">
					<span className="whitespace-nowrap">
						Research
						<MorphingText texts={["Effortless", "Easy", "Simple"]} />
					</span>
					{/* <svg
						viewBox="0 0 280 60"
						className="inline-block h-[0.9em] align-baseline italic"
						aria-hidden="true"
					>
						<text
							x="50%"
							y="70%"
							textAnchor="middle"
							dominantBaseline="middle"
							fill="transparent"
							stroke="currentColor"
							strokeWidth="0.6"
							strokeDasharray="2 2"
							className="text-6xl tracking-tighter"
						>
							effortless
						</text>
					</svg> */}
				</h1>
				<TextAnimate
					className="mt-4 text-lg text-muted-foreground md:text-center text-start "
					delay={0.78}
					duration={0.7}
					animation="blurInUp"
					by="word"
				>
					Track subscription statuses, GMP trends, and listing gains for
					Mainboard and SME IPOs in one unified dashboard.
				</TextAnimate>
			</div>
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
