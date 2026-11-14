'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({totalPages}: { totalPages: number }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        return `${pathname}?${params.toString()}`;
    }

    return (
        <nav aria-label='Pagination' className='mt-8 flex items-center justify-center gap-3 text-sm'>
            {currentPage > 1 && (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className='inline-flex min-h-10 items-center rounded-md border border-line bg-surface px-4 font-medium text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'
                >
                    Previous
                </Link>
            )}
            <span aria-current='page' className='inline-flex min-h-10 items-center rounded-md bg-brand px-4 font-semibold text-surface'>
                Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className='inline-flex min-h-10 items-center rounded-md border border-line bg-surface px-4 font-medium text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'
                >
                    Next
                </Link>
            )}
        </nav>
    );
}