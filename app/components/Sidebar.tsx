'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/expenses', label: 'Expenses' },
    // { href: '/reports', label: 'Reports' },
    // { href: '/settings', label: 'Settings'},
];

export default function Sidebar() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname.startsWith(href);

    return (
        <aside className="w-60 border-r min-h-screen bg-white">
            <div className="px-4 py-5 text-lg font-semibold">
                <Link href="/" className="hover:opacity-80">Budget App</Link>
            </div>
            <nav className="px-2 space-y-1">
                {links.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className={`block rounded px-3 py-2 text-sm
                            ${isActive(l.href)
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        {l.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}