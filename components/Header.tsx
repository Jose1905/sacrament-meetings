import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import { Suspense } from "react";
import { connection } from "next/server";

async function CurrentDate() {
  await connection();
  const date = new Date();
  const dateTime = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
  }).format(date);
  const label = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(date);

  return <time dateTime={dateTime}>{label}</time>;
}

export default function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-gutter py-5 sm:py-6">
        <Link
          href="/"
          className="flex items-center gap-4"
          aria-label="San Rafael ward home"
        >
          <span className="grid size-12 place-items-center rounded-sm bg-brand text-base font-semibold text-surface sm:size-14">
            SM
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold sm:text-lg">
              San Rafael
            </span>
            <span className="mt-1 block min-h-5 text-sm text-muted">
              <Suspense
                fallback={
                  <span
                    aria-hidden="true"
                    className="inline-block h-4 w-36 rounded-sm bg-brand/10"
                  />
                }
              >
                <CurrentDate />
              </Suspense>
            </span>
          </span>
        </Link>
        <Suspense
          fallback={
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-5 text-sm"
            >
              <Link className="font-medium text-brand" href="/meetings">
                Meetings
              </Link>
            </nav>
          }
        >
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}
