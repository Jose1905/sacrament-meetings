import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export default async function MeetingsPage(props: {
	searchParams?: Promise<{ query?: string; page?: string; date?: string }>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query ?? '';
	const currentPage = Number(searchParams?.page) || 1;
	const date = searchParams?.date ?? '';

	const [meetings, totalPages] = await Promise.all([
		getMeetings(query, currentPage, date),
		getMeetingsTotalPages(query, date)
	])

	return (
		<main className="mx-auto w-full max-w-6xl flex-1 px-gutter py-10 sm:py-14">
			<section aria-labelledby="meetings-title">
				<div className="mb-8 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
							Ward calendar
						</p>
						<h1 id="meetings-title" className="text-3xl font-semibold sm:text-4xl">
							All meetings
						</h1>
						<p className="mt-2 max-w-xl text-sm leading-6 text-muted">
							Review meeting assignments, hymns, speakers, and announcements.
						</p>
					</div>
					<p className="text-sm font-medium text-muted">
						{meetings.length} scheduled meetings
					</p>
				</div>
				<MeetingSearch />
				<div className="grid gap-4 lg:grid-cols-2">
					{meetings.map((meeting) => (
						<MeetingCard key={meeting.id} meeting={meeting} />
					))}
				</div>
				<Pagination totalPages={totalPages} />
			</section>
		</main>
	);
}
