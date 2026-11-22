import { Suspense } from "react";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

type EditPageProps = { params: Promise<{ id: string }> };

async function EditMeetingForm({ params }: EditPageProps) {
  const { id: routeId } = await params;
  const id = Number(routeId);

  if (!Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  const fieldClassName = "block w-full rounded-md border border-line bg-surface px-3 py-2 text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

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

        <form
          action={updateMeeting.bind(null, id)}
          className="space-y-4 rounded-lg border border-line bg-surface p-6 shadow-sm"
        >
          <div>
            <label htmlFor="date" className="mb-2 block text-sm font-medium">Date</label>
            <input id="date" name="date" type="date" defaultValue={meeting.date} required className={fieldClassName} />
          </div>

          <div>
            <label htmlFor="meeting_type" className="mb-2 block text-sm font-medium">Meeting Type</label>
            <select id="meeting_type" name="meeting_type" defaultValue={meeting.meetingType} required className={fieldClassName}>
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
            </select>
          </div>

          {[
            ["presiding", meeting.presiding],
            ["conducting", meeting.conducting],
            ["openingPrayer", meeting.openingPrayer],
            ["closingPrayer", meeting.closingPrayer],
          ].map(([name, value]) => (
            <div key={name}>
              <label htmlFor={name} className="mb-2 block text-sm font-medium">
                {name.replace(/([A-Z])/g, " $1")}
              </label>
              <input id={name} name={name} type="text" minLength={2} defaultValue={value} required className={fieldClassName} />
            </div>
          ))}

          {[
            ["openingHymn", meeting.openingHymn],
            ["sacramentHymn", meeting.sacramentHymn],
            ["closingHymn", meeting.closingHymn],
          ].map(([name, hymn]) => (
            <div key={name as string}>
              <label htmlFor={name as string} className="mb-2 block text-sm font-medium">
                {String(name).replace(/([A-Z])/g, " $1")}
              </label>
              <textarea
                id={name as string}
                name={name as string}
                rows={2}
                defaultValue={JSON.stringify(hymn)}
                required
                className={`${fieldClassName} font-mono text-sm`}
              />
            </div>
          ))}

          <div>
            <label htmlFor="announcements" className="mb-2 block text-sm font-medium">Announcements (comma-separated)</label>
            <textarea id="announcements" name="announcements" rows={3} defaultValue={meeting.announcements?.join(", ") ?? ""} className={fieldClassName} />
          </div>

          <div>
            <label htmlFor="wardBusiness" className="mb-2 block text-sm font-medium">Ward Business (JSON array)</label>
            <textarea id="wardBusiness" name="wardBusiness" rows={3} defaultValue={JSON.stringify(meeting.wardBusiness)} className={`${fieldClassName} font-mono text-sm`} />
            <p className="mt-1 text-xs text-muted">Example: {`[{"description":"Welcome visitors"}]`}</p>
          </div>

          <div className="flex items-center gap-2">
            <input id="stakeBusiness" name="stakeBusiness" type="checkbox" value="true" defaultChecked={meeting.stakeBusiness} className="h-4 w-4" />
            <label htmlFor="stakeBusiness" className="text-sm font-medium">Stake Business</label>
          </div>

          <div>
            <label htmlFor="speakers" className="mb-2 block text-sm font-medium">Speakers (JSON array)</label>
            <textarea id="speakers" name="speakers" rows={4} defaultValue={JSON.stringify(meeting.speakers)} className={`${fieldClassName} font-mono text-sm`} />
            <p className="mt-1 text-xs text-muted">
              Example: {`[{"name":"Jane Doe","topic":"Faith","type":"speaker"}]`}
            </p>
          </div>

          <button
            type="submit"
            className="min-h-10 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Save meeting
          </button>
        </form>
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
      <EditMeetingForm params={params} />
    </Suspense>
  );
}
