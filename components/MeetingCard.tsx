import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";


interface MeetingCardProps {
	meeting: SacramentMeeting;
}

function formatMeetingDate(date: string): string {
	return new Intl.DateTimeFormat("en", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(`${date}T00:00:00Z`));
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
	return (
		<Link
			href={`/meetings/${meeting.id}`}
			className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
			aria-label={`View agenda for ${formatMeetingDate(meeting.date)}`}
		>
			<article className="h-full overflow-hidden rounded-md border border-line bg-surface transition-colors group-hover:border-brand/50">
				<div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
							{meeting.meetingType} meeting
						</p>
						<h2 className="mt-1 text-lg font-semibold">{formatMeetingDate(meeting.date)}</h2>
					</div>
					<span className="shrink-0 rounded-sm bg-brand/10 px-2.5 py-1 text-xs font-medium capitalize text-brand">
						#{meeting.id}
					</span>
				</div>

				<div className="grid gap-6 p-5 sm:grid-cols-2">
					<section aria-label="Meeting leadership">
						<h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
							Leadership
						</h3>
						<dl className="space-y-2 text-sm leading-6">
							<div className="flex justify-between gap-3">
								<dt className="text-muted">Presiding</dt>
								<dd className="text-right font-medium">{meeting.presiding}</dd>
							</div>
							<div className="flex justify-between gap-3">
								<dt className="text-muted">Conducting</dt>
								<dd className="text-right font-medium">{meeting.conducting}</dd>
							</div>
						</dl>
					</section>
					<section aria-label="Speakers">
						<h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
							Speakers & musical numbers
						</h3>
						<ul className="space-y-3">
							{meeting.speakers.map((speaker, index) => (
								<li key={`${speaker.name}-${index}`}>
									<p className="text-sm font-medium">{speaker.name}</p>
									<p className="mt-0.5 text-sm text-muted">
										{speaker.type === "musical-number" ? "Musical number" : speaker.topic}
									</p>
								</li>
							))}
						</ul>
					</section>
				</div>

				<div className="border-t border-line px-5 py-3 text-sm font-medium text-brand">
					View agenda <span aria-hidden="true">&rarr;</span>
				</div>
			</article>
		</Link>
	);
}
