import Link from "next/link";
import { Search, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/Common/Container";

const Navbar = () => {
	const navLinks = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Upcoming", href: "/upcoming-ipos" },
		{ name: "News", href: "/news" },
		{ name: "About", href: "/about" },
	];

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-md">
			<Container>
				<div className="flex h-16 items-center justify-between">
					{/* Logo & Navigation */}
					<div className="flex items-center gap-10">
						<Link href="/" className="flex items-center gap-2 group">
							<BarChart3 className="h-6 w-6 text-yellow-400" />
							<span className="text-xl font-bold tracking-tight text-white">
								IPO Watchdog
							</span>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-6">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>

					{/* Right Side: Search & Actions */}
					<div className="flex items-center gap-4">
						<div className="relative hidden md:block w-72">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
							<Input
								type="search"
								placeholder="Search companies..."
								className="h-10 w-full rounded-full border-white/10 bg-white/5 pl-10 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-yellow-400/50"
							/>
						</div>
						<Button className="h-10 rounded-full bg-yellow-400 px-6 font-semibold text-black hover:bg-yellow-500 hover:scale-105 transition-all">
							Subscribe
						</Button>
					</div>
				</div>
			</Container>
		</nav>
	);
};

export default Navbar;
