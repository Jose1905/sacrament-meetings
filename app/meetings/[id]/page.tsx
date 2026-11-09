import { Suspense } from "react";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

export default function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-gutter py-12 sm:py-16">
      <Suspense
        fallback={
          <div aria-busy="true" className="rounded-md border border-line bg-surface p-6 text-sm text-muted">
            Loading meeting agenda...
          </div>
        }
      >
        <MeetingAgenda params={params} />
      </Suspense>
    </main>
  );
}

async function MeetingAgenda({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = getMeetingById(Number(id));

  if (!meeting) notFound();

  return <MeetingDetail meeting={meeting} />;
}