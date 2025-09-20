'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
}

export default function NavigationLink({
  href,
  children,
  className = '',
  exact = true,
}: NavigationLinkProps) {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  const activeClass = isActive
    ? 'text-primary'
    : 'text-foreground hover:text-primary';

  return (
    <Link
      href={href as any}
      className={`font-medium transition-colors focus-ring rounded-md px-2 py-1 ${activeClass} ${className}`}
    >
      {children}
    </Link>
  );
}

interface DropdownNavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function DropdownNavigationLink({
  href,
  children,
  className = '',
}: DropdownNavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const activeClass = isActive
    ? 'text-primary'
    : 'text-foreground hover:bg-muted';

  return (
    <Link
      href={href as any}
      className={`block px-4 py-2 text-sm transition-colors rounded-md focus-ring ${activeClass} ${className}`}
    >
      {children}
    </Link>
  );
}
