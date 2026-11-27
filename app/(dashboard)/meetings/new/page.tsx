import CreateMeetingForm from "@/components/create-meeting-form";

export default async function NewMeeetingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-gutter py-10 sm:py-14">
      <section aria-labelledby="new-meeting-title">
        <div className="mb-8 border-b border-line pb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Create new meeting
          </p>
          <h1
            id="new-meeting-title"
            className="text-3xl font-semibold sm:text-4xl"
          >
            New meeting
          </h1>
        </div>
        <CreateMeetingForm />
      </section>
    </main>
  );
}
