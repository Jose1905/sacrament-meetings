'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MeetingsNavLinks() {
  const pathname = usePathname();
  const isCurrentSunday = pathname === "/meetings/current";
  const isAllMeetings =
    pathname === "/meetings" ||
    (pathname.startsWith("/meetings/") && !isCurrentSunday);

  return (
    <nav aria-label="Meetings navigation" className="flex min-h-12 items-center gap-6 text-sm">
      <Link
        className={`relative py-3 font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 ${isAllMeetings ? "text-brand after:bg-brand" : "text-muted after:bg-transparent hover:text-brand-strong"}`}
        href="/meetings"
        aria-current={isAllMeetings ? "page" : undefined}
      >
        All meetings
      </Link>
      <Link
        className={`relative py-3 font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 ${isCurrentSunday ? "text-brand after:bg-brand" : "text-muted after:bg-transparent hover:text-brand-strong"}`}
        href="/meetings/current"
        aria-current={isCurrentSunday ? "page" : undefined}
      >
        This Sunday
      </Link>
    </nav>
  );
}