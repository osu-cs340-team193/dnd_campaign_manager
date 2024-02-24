'use client';

// Side navigation component.
// See: https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages

import { Flex } from '@mantine/core';

// Navigation links to app pages.
// See: https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages

import { usePathname } from 'next/navigation';
import { NavLinkInfo } from '@/app/ui/navigation/nav-link';
import { NavLink } from '@mantine/core';

const linkInfos: NavLinkInfo[] = [
  { name: 'Home', href: '/' },
  { name: 'Campaigns', href: '/campaigns' },
  { name: 'Locations', href: '/locations' },
  { name: 'Monsters', href: '/monsters' },
  { name: 'Actions', href: '/actions' },
  { name: 'Items', href: '/items' },
];

export default function SideNav()
{
  // Highlight active link.
  // See: https://nextjs.org/learn/dashboard-app/navigating-between-pages
  const pathname = usePathname(); 

  return (
    <Flex
      direction='column'
      gap='xs'
    >
      {linkInfos.map((linkInfo) => 
        <NavLink
          key={linkInfo.href}
          label={linkInfo.name}
          href={linkInfo.href}
          active={pathname === linkInfo.href}
        />
      )}
    </Flex>
  );
}