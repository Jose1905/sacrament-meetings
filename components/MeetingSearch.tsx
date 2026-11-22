'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');    // Reset pagination to 1 on every new search
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <input
            type='search'
            placeholder='Search by speaker, leader, or meeting type...'
            defaultValue={searchParams.get('query')?.toString()}
            onChange={ (e) => handleSearch(e.target.value) }
            aria-label='Search meetings'
            className='mb-6 w-full max-w-xl rounded-md border border-line bg-surface px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted transition-colors hover:border-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'
        />
    );
}