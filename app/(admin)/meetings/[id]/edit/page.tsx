import { Suspense } from "react";

export default async function EditMeetingPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<main className="mx-auto w-full max-w-6xl flex-1 px-gutter py-10 sm:py-14">
			<Suspense fallback={<p className="text-sm text-muted">Loading meeting…</p>}>
				<EditMeetingContent params={params} />
			</Suspense>
		</main>
	);
}

async function EditMeetingContent({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<section aria-labelledby="edit-meeting-title">
			<h1 id="edit-meeting-title" className="text-3xl font-semibold">
				Edit meeting
			</h1>
			<p className="mt-3 text-sm text-muted">
				Edit meeting page placeholder for meeting {id}.
			</p>
		</section>
	);
}
