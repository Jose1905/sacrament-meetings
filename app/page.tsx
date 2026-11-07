import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default function Home() {
  const meetings = getMeetings();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-gutter py-12 sm:py-16">
        <section aria-labelledby="page-title">
          <div className="mb-8 grid gap-6 border-b border-line pb-6 sm:grid-cols-[minmax(0,1fr)_18rem] sm:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Ward calendar
              </p>
              <h1 id="page-title" className="text-3xl font-semibold sm:text-4xl">
                Sacrament meetings
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                Meeting plans, hymns, speakers, and announcements for the ward.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-muted">
                {meetings.length} scheduled meetings
              </p>
              <Image
                src="/chapel.jpg"
                alt="Sunlit chapel interior with rows of wooden pews."
                width={1440}
                height={960}
                sizes="(min-width: 640px) 288px, 100vw"
                priority
                className="h-32 w-full rounded-md object-cover sm:h-36"
              />
            </div>
          </div>

          <div id="schedule" className="grid gap-4 lg:grid-cols-2">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
