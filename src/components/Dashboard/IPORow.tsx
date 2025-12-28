"use client";

import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { IPOItem } from "@/lib/ipoScraper";
import { slugify } from "@/lib/utils";
import {
	getGmpInfo,
	getTrendIcon,
	getGmpBadgeStyle,
	getRowStyle,
} from "@/lib/gmpUtils";

interface IPORowProps {
	ipo: IPOItem;
}

const IPORow: React.FC<IPORowProps> = ({ ipo }) => {
	const router = useRouter();
	const gmpInfo = getGmpInfo(ipo.gmp);

	const handleRowClick = () => {
		router.push(`/ipo/${slugify(ipo.name)}`);
	};

	return (
		<TableRow
			className={`border-b border-foreground/15 dark:border-foreground/5 cursor-pointer ${getRowStyle(
				ipo.status,
				ipo.date
			)}`}
			onClick={handleRowClick}
		>
			<TableCell className="py-4 pl-6">
				<div className="flex items-center gap-4">
					<Avatar className="h-10 w-10">
						<AvatarImage src="" alt={ipo.name} />
						<AvatarFallback className="border border-foreground/15 dark:border-foreground/5 bg-secondary text-foreground font-bold">
							{ipo.inittial}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-1">
						<span className="font-bold text-foreground text-base">
							{ipo.name}
						</span>
						<span className="text-xs text-muted-foreground">{ipo.type}</span>
					</div>
				</div>
			</TableCell>
			<TableCell className="font-medium text-foreground">
				{ipo.ipoPrice}
			</TableCell>
			<TableCell className="font-medium text-foreground">
				{ipo.issueSize}
			</TableCell>
			<TableCell className="font-medium text-foreground">{ipo.date}</TableCell>
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
		</TableRow>
	);
};

export default IPORow;
