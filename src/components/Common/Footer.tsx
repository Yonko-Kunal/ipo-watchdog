import React from "react";
import Container from "@/components/Common/Container";
import Link from "next/link";

const Footer = () => {
	return (
		<div className="bottom-0 w-full border-t border-foreground/15 dark:border-foreground/5">
			<Container className="md:py-8 py-4">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 md:pt-2 pt-1">
					<p className="text-muted-foreground md:text-sm text-xs">
						&copy; {new Date().getFullYear()} IPO Watchdog. All rights reserved.
					</p>
					<div className="flex items-center md:gap-6 gap-3">
						<Link
							href="/privacy"
							className="text-muted-foreground hover:text-neutral-400 md:text-sm text-xs transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="text-muted-foreground hover:text-neutral-400 md:text-sm text-xs transition-colors"
						>
							Terms of Service
						</Link>
						<Link
							href="/contact"
							className="text-muted-foreground hover:text-neutral-400 md:text-sm text-xs transition-colors"
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
