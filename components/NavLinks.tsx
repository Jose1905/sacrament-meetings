'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
	const pathname = usePathname();
	const isScheduleActive = pathname === "/" || pathname.startsWith("/meetings/");

	return (
		<nav aria-label="Main navigation" className="flex items-center gap-5 text-sm">
			<Link
				className={`font-medium transition-colors hover:text-brand-strong ${isScheduleActive ? "text-brand" : "text-muted"}`}
				href="/#schedule"
				aria-current={isScheduleActive ? "page" : undefined}
			>
				Schedule
			</Link>
		</nav>
	);
}
