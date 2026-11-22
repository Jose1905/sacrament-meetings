import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string; date?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const date = searchParams?.date ?? "";

  const totalPages = await getMeetingsTotalPages(query, date);

  const rawPage = searchParams?.page;
  const parsedPage = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
  const requestedPage =
    Number.isSafeInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1;

  const pageLimit = Math.max(1, totalPages);
  const currentPage = Math.min(requestedPage, pageLimit);

  if (rawPage !== undefined && rawPage !== String(currentPage)) {
    const params = new URLSearchParams();

    if (query) params.set("query", query);
    if (date) params.set("date", date);
    params.set("page", String(currentPage));

    redirect(`/meetings?${params.toString()}`);
  }

  const meetings = await getMeetings(query, currentPage, date);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-gutter py-10 sm:py-14">
      <section aria-labelledby="meetings-title">
        <div className="mb-8 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Ward calendar
            </p>
            <h1
              id="meetings-title"
              className="text-3xl font-semibold sm:text-4xl"
            >
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
        <div className="mt-4 flex gap-2">
          <Link
            href={`/meetings/new`}
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Create Meeting
          </Link>
        </div>
      </section>
    </main>
  );
}
