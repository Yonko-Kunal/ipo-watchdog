import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import React from "react";

export const getGmpInfo = (
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

export const getTrendIcon = (trend: string) => {
	switch (trend) {
		case "up":
			return <ArrowUpRight className="w-4 h-4 mr-1" />;
		case "down":
			return <ArrowDownRight className="w-4 h-4 mr-1" />;
		default:
			return <Minus className="w-4 h-4 mr-1" />;
	}
};

export const getGmpBadgeStyle = (percentageVal: number) => {
	if (percentageVal === 0) {
		return "bg-neutral-500/15 text-neutral-400 hover:bg-neutral-500/25 border-neutral-500/20";
	}
	if (percentageVal > 20) {
		return "bg-green-500/15 text-green-500 hover:bg-green-500/25 border-green-500/20";
	}
	return "bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20";
};

export const isListingToday = (dateRange: string) => {
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

export const getRowStyle = (status: string, date: string) => {
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
