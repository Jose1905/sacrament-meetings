import type { SacramentMeeting } from "@/lib/types";
import Link from "next/link";

interface MeetingDetailProps {
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

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    const openingItems = [
        { label: "Opening hymn", value: `${meeting.openingHymn.number} · ${meeting.openingHymn.title}` },
        { label: "Opening prayer", value: meeting.openingPrayer },
    ];
    const closingItems = [
        { label: "Closing hymn", value: `${meeting.closingHymn.number} · ${meeting.closingHymn.title}` },
        { label: "Closing prayer", value: meeting.closingPrayer },
    ];

    return (
        <article className="overflow-hidden rounded-md border border-line bg-surface">
            <header className="border-b border-line px-5 py-5 sm:px-7">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    {meeting.meetingType} sacrament meeting
                </p>
                <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
                    {formatMeetingDate(meeting.date)}
                </h1>
                <p className="mt-2 text-sm text-muted">Meeting {meeting.id}</p>
            </header>

            <div className="grid gap-x-12 gap-y-10 p-5 sm:grid-cols-2 sm:p-7">
                <section aria-labelledby="meeting-leadership">
                    <h2 id="meeting-leadership" className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        Presiding & conducting
                    </h2>
                    <dl className="space-y-3 text-sm leading-6">
                        <div className="flex justify-between gap-4">
                            <dt className="text-muted">Presiding</dt>
                            <dd className="text-right font-medium">{meeting.presiding}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                            <dt className="text-muted">Conducting</dt>
                            <dd className="text-right font-medium">{meeting.conducting}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                            <dt className="text-muted">Stake business</dt>
                            <dd className="text-right font-medium">
                                {meeting.stakeBusiness ? "Scheduled" : "None scheduled"}
                            </dd>
                        </div>
                    </dl>
                    <AgendaItems title="Opening" items={openingItems} />
                    <AgendaItems
                        title="The sacrament"
                        items={[{
                            label: "Sacrament hymn",
                            value: `${meeting.sacramentHymn.number} · ${meeting.sacramentHymn.title}`,
                        }]}
                    />
                    <AgendaItems title="Closing" items={closingItems} />
                </section>

                <section aria-labelledby="meeting-speakers">
                    <h2 id="meeting-speakers" className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        Speakers & musical numbers
                    </h2>
                    <ul className="space-y-5">
                        {meeting.speakers.map((speaker, index) => (
                            <li key={`${speaker.name}-${index}`} className="border-l-2 border-accent/50 pl-3">
                                <p className="text-sm font-medium">{speaker.name}</p>
                                <p className="mt-1 text-sm leading-6 text-muted">
                                    {speaker.type === "musical-number" ? "Musical number" : speaker.topic}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <section className="mt-8" aria-labelledby="meeting-ward-business">
                        <h2 id="meeting-ward-business" className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                            Ward business
                        </h2>
                        {meeting.wardBusiness.length > 0 ? (
                            <ul className="list-inside list-disc space-y-2 text-sm leading-6">
                                {meeting.wardBusiness.map((item) => (
                                    <li key={item.description}>{item.description}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted">No ward business scheduled.</p>
                        )}
                    </section>

                    <section className="mt-8" aria-labelledby="meeting-announcements">
                        <h2 id="meeting-announcements" className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                            Announcements
                        </h2>
                        {meeting.announcements && meeting.announcements.length > 0 ? (
                            <ul className="space-y-2 text-sm leading-6 text-muted">
                                {meeting.announcements.map((announcement) => (
                                    <li key={announcement}>{announcement}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted">No announcements.</p>
                        )}
                    </section>
                </section>
            </div>

            <div className="border-t border-line px-5 py-4 sm:px-7">
                <Link className="text-sm font-medium text-brand hover:text-brand-strong" href="/#schedule">
                    &larr; Back to schedule
                </Link>
            </div>
        </article>
    );
}

function AgendaItems({
    title,
    items,
}: {
    title: string;
    items: { label: string; value: string }[];
}) {
    return (
        <section className="mt-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {title}
            </h2>
            <dl className="space-y-3 text-sm leading-6">
                {items.map((item) => (
                    <div key={item.label} className="flex justify-between gap-4">
                        <dt className="shrink-0 text-muted">{item.label}</dt>
                        <dd className="text-right font-medium">{item.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
