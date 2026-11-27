import { Suspense } from "react";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";
import EditMeetingForm from "@/components/edit-meeting-form";

type EditPageProps = { params: Promise<{ id: string }> };

async function EditMeetingContent({ params }: EditPageProps) {
  const { id: routeId } = await params;
  const id = Number(routeId);

  if (!Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-gutter py-10 sm:py-14">
      <section aria-labelledby="edit-meeting-title">
        <div className="mb-8 border-b border-line pb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Meeting administration
          </p>
          <h1 id="edit-meeting-title" className="text-3xl font-semibold sm:text-4xl">
            Edit meeting
          </h1>
        </div>

        <EditMeetingForm id={id} meeting={meeting} />
      </section>
    </main>
  );
}

export default function Page({ params }: EditPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-6xl px-gutter py-12">
          <p role="status">Loading meeting form...</p>
        </main>
      }
    >
      <EditMeetingContent params={params} />
    </Suspense>
  );
}
