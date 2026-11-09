import type { ReactNode } from "react";
import Link from "next/link";

export default function MeetingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-gutter">
          <nav
            aria-label="Meetings navigation"
            className="flex min-h-12 items-center gap-6 text-sm"
          >
            <Link
              className="font-medium text-brand hover:text-brand-strong"
              href="/meetings"
            >
              All meetings
            </Link>
            <Link
              className="font-medium text-muted hover:text-brand-strong"
              href="/meetings/current"
            >
              This Sunday
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
