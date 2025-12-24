import React from "react";
import Container from "@/components/Common/Container";
import Link from "next/link";

const Footer = () => {
	return (
		<div className="bottom-0 w-full border-t border-white/10">
			<Container className="py-8">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
					<p className="text-neutral-500 text-sm">
						&copy; {new Date().getFullYear()} IPO Watchdog. All rights reserved.
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="/privacy"
							className="text-neutral-500 hover:text-neutral-400 text-sm transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="text-neutral-500 hover:text-neutral-400 text-sm transition-colors"
						>
							Terms of Service
						</Link>
						<Link
							href="/contact"
							className="text-neutral-500 hover:text-neutral-400 text-sm transition-colors"
						>
							Contact
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Footer;
