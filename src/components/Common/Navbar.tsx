"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { BarChart3, Menu, X } from "lucide-react";
import Container from "@/components/Common/Container";
import { ModeToggle } from "./ModeToggle";
import { motion, AnimatePresence } from "motion/react";
const Navbar = () => {
	const navLinks = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Upcoming", href: "/upcoming-ipos" },
		{ name: "News", href: "/news" },
		{ name: "About", href: "/about" },
	];

	const [hovered, setHovered] = useState<number | null>(null);
	const [menuOpen, setMenuOpen] = useState(false);
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
						<button
							className="block md:hidden text-muted-foreground hover:text-foreground transition-colors"
							onClick={() => setMenuOpen(!menuOpen)}
						>
							{menuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				<AnimatePresence>
					{menuOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							className="overflow-hidden md:hidden"
						>
							<div className="flex flex-col gap-4 py-4 pb-6">
								{navLinks.map((link, idx) => (
									<Link
										key={idx}
										href={link.href}
										className={`text-sm font-medium transition-colors hover:text-foreground ${
											pathname === link.href
												? "text-foreground"
												: "text-muted-foreground"
										}`}
										onClick={() => setMenuOpen(false)}
									>
										{link.name}
									</Link>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</Container>
		</motion.nav>
	);
};

export default Navbar;
