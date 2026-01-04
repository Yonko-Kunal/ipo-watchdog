import Container from "@/components/Common/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<Container className="py-10 space-y-8 min-h-screen">
			{/* Breadcrumb Skeleton */}
			<Skeleton className="h-4 w-32" />

			{/* Header Section Skeleton */}
			<div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-muted-foreground/15 pb-8">
				<div className="space-y-4 max-w-3xl w-full">
					<div className="flex md:flex-row flex-col md:items-center items-start gap-3">
						<Skeleton className="h-10 w-3/4 md:w-1/2" />
						<Skeleton className="h-6 w-20 rounded-full" />
					</div>
				</div>
				<Skeleton className="h-10 w-40 rounded-2xl" />
			</div>

			{/* About Text Skeleton */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
			</div>

			{/* IPO Details Table Skeleton */}
			<div className="space-y-4">
				<Skeleton className="h-8 w-48" />
				<div className="rounded-[1.5rem] border border-muted-foreground/15 overflow-hidden">
					<div className="p-4 space-y-4">
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="flex justify-between">
								<Skeleton className="h-4 w-1/3" />
								<Skeleton className="h-4 w-1/4" />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Financial Report Table Skeleton */}
			<div className="space-y-4">
				<Skeleton className="h-8 w-64" />
				<div className="rounded-[1.5rem] border border-muted-foreground/15 overflow-hidden">
					<div className="p-4 space-y-4">
						<div className="flex justify-between gap-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<Skeleton key={i} className="h-4 w-full" />
							))}
						</div>
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="flex justify-between gap-4">
								{Array.from({ length: 5 }).map((_, j) => (
									<Skeleton key={j} className="h-4 w-full" />
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}
