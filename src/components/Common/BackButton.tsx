"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
	className?: string;
	label?: string;
}

export default function BackButton({
	className = "",
	label = "Back",
}: BackButtonProps) {
	const router = useRouter();

	return (
		<Button
			variant="link"
			className={`p-0 text-muted-foreground hover:text-foreground transition-colors ${className}`}
			onClick={() => router.back()}
		>
			<ArrowLeft className="w-4 h-4 mr-2" /> {label}
		</Button>
	);
}
