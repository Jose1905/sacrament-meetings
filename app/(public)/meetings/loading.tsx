export default function Loading() {
	return (
		<main
			aria-label="Loading meeting agenda"
			aria-busy="true"
			className="mx-auto w-full max-w-6xl flex-1 px-gutter py-12 sm:py-16"
		>
			<div className="animate-pulse rounded-md border border-line bg-surface p-6 sm:p-8">
				<div className="h-3 w-36 rounded-sm bg-brand/10" />
				<div className="mt-3 h-8 w-64 max-w-full rounded-sm bg-brand/10" />
				<div className="mt-8 grid gap-10 sm:grid-cols-2">
					<div className="space-y-4">
						<div className="h-4 w-40 rounded-sm bg-brand/10" />
						<div className="h-3 w-full rounded-sm bg-brand/10" />
						<div className="h-3 w-4/5 rounded-sm bg-brand/10" />
						<div className="h-3 w-full rounded-sm bg-brand/10" />
					</div>
					<div className="space-y-4">
						<div className="h-4 w-48 rounded-sm bg-brand/10" />
						<div className="h-3 w-full rounded-sm bg-brand/10" />
						<div className="h-3 w-4/5 rounded-sm bg-brand/10" />
						<div className="h-3 w-full rounded-sm bg-brand/10" />
					</div>
				</div>
			</div>
		</main>
	);
}
