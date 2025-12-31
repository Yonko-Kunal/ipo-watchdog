"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3 } from "lucide-react";
import Container from "@/components/Common/Container";
import { ModeToggle } from "./ModeToggle";
import { motion } from "motion/react";
const Navbar = () => {
	const navLinks = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Upcoming", href: "/upcoming-ipos" },
		{ name: "News", href: "/news" },
		{ name: "About", href: "/about" },
	];

	const [hovered, setHovered] = useState<number | null>(null);
	const pathname = usePathname();

	return (
		<motion.nav className="sticky top-0 z-50 w-full border-b border-muted-foreground/15 bg-background">
			<Container>
				<div className="flex h-16 items-center justify-between">
					{/* Logo & Navigation */}
					<div className="flex items-center gap-10">
						<Link href="/" className="flex items-center gap-2 group">
							<BarChart3 className="h-6 w-6 text-yellow-400" />
							{/* <span className="text-xl font-bold tracking-tight text-foreground">
								IPO Watchdog
							</span> */}
						</Link>

						{/* Desktop Navigation */}
						<div
							className="hidden md:flex items-center gap-2"
							onMouseLeave={() => setHovered(null)}
						>
							{navLinks.map((link, idx) => (
								<Link
									key={idx}
									href={link.href}
									className={`relative px-2 py-1 text-sm font-medium transition-colors dark:hover:text-white hover:text-black ${
										pathname === link.href
											? "text-foreground"
											: "text-muted-foreground"
									}`}
									onMouseEnter={() => setHovered(idx)}
								>
									{hovered === idx && (
										<motion.span
											transition={{
												layout: {
													duration: 0.3,
													ease: "anticipate",
												},
											}}
											layoutId="hovered-span"
											className="absolute inset-0 -z-10 h-full w-full rounded-md bg-neutral-200 dark:bg-neutral-800"
										/>
									)}
									<span className="relative z-10">{link.name}</span>
								</Link>
							))}
						</div>
					</div>

					{/* Right Side: Search & Actions */}
					<div className="flex items-center gap-4">
						<ModeToggle />
					</div>
				</div>
			</Container>
		</motion.nav>
	);
};

export default Navbar;
