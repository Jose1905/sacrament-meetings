"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const isMeetingsActive =
    pathname === "/meetings" || pathname.startsWith("/meetings/");

  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center gap-5 text-sm"
    >
      <Link
        className={`font-medium transition-colors hover:text-brand-strong`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`font-medium transition-colors hover:text-brand-strong ${isMeetingsActive ? "text-brand" : "text-muted"}`}
        href="/meetings"
        aria-current={isMeetingsActive ? "page" : undefined}
      >
        Meetings
      </Link>
    </nav>
  );
}
