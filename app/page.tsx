import Image from "next/image";
import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";

export default function Home() {
  const meetings = getMeetings();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-gutter py-10 sm:py-14">
      <section className="grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] sm:gap-12">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            San Rafael Ward
          </p>
          <h1 className="max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">
            Sacrament meetings
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            Find this Sunday&apos;s meeting or review the ward schedule, speakers, hymns, and announcements.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/meetings/current"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-brand px-5 text-sm font-medium text-surface transition-colors hover:bg-brand-strong"
            >
              This Sunday&apos;s meeting
            </Link>
            <Link
              href="/meetings"
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-line px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              View all meetings
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">{meetings.length} meetings in the schedule</p>
        </div>
        <Image
          src="/chapel.jpg"
          alt="Exterior of a Latter-day Saint meetinghouse beneath a blue sky."
          width={900}
          height={500}
          sizes="(min-width: 640px) 50vw, 100vw"
          priority
          className="aspect-[3/2] w-full rounded-md object-cover"
        />
      </section>
    </main>
  );
}
