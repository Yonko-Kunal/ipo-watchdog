import Container from "@/components/Common/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<Container className="py-10 space-y-8 min-h-screen">
			{/* Breadcrumb Skeleton */}
			<div className="flex items-center gap-2">
				<Skeleton className="h-4 w-4" />
				<Skeleton className="h-4 w-32" />
			</div>

			{/* Header Section Skeleton */}
			<div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-foreground/15 pb-8">
				<div className="space-y-4 max-w-3xl w-full">
					<div className="flex md:flex-row flex-col md:items-center items-start gap-3">
						<Skeleton className="h-12 w-3/4 md:w-1/2" />
						<Skeleton className="h-6 w-24 rounded-full" />
					</div>
				</div>
				<Skeleton className="h-10 w-44 rounded-2xl" />
			</div>

			{/* About Text Skeleton */}
			<div className="space-y-3">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-[98%]" />
				<Skeleton className="h-4 w-[95%]" />
				<Skeleton className="h-4 w-2/3" />
			</div>

			{/* IPO Details Table Skeleton */}
			<div className="space-y-4">
				<Skeleton className="h-7 w-48" />
				<div className="rounded-[1.5rem] border border-foreground/15 bg-secondary overflow-hidden">
					<div className="flex flex-col">
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className="flex items-center border-b border-foreground/15 last:border-0 p-4"
							>
								<Skeleton className="h-5 w-1/3 mr-auto" />
								<Skeleton className="h-5 w-1/4" />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Financial Report Table Skeleton */}
			<div className="space-y-4">
				<Skeleton className="h-7 w-64" />
				<div className="rounded-[1.5rem] border border-foreground/15 bg-secondary overflow-hidden">
					<div className="flex flex-col">
						{/* Header */}
						<div className="flex justify-between gap-4 border-b border-foreground/15 p-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<Skeleton key={i} className="h-4 w-1/6" />
							))}
						</div>
						{/* Rows */}
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="flex justify-between gap-4 border-b border-foreground/15 last:border-0 p-4"
							>
								{Array.from({ length: 5 }).map((_, j) => (
									<Skeleton key={j} className="h-5 w-1/6" />
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}
