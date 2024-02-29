'use client';

import { usePathname } from 'next/navigation';
import { NavLink } from '@mantine/core';

// Navigation link attributes
type NavLinkInfo =
{
  name: string;
  href: string;
};

// App navigation links
export const navlinkInfos: NavLinkInfo[] = [
  { 
    name: 'Home', 
    href: '/' 
  },
  { 
    name: 'Campaigns', 
    href: '/campaigns' 
  },
  { 
    name: 'Locations', 
    href: '/locations' 
  },
  { 
    name: 'Monsters', 
    href: '/monsters' 
  },
  { 
    name: 'Actions', 
    href: '/actions' 
  },
  { 
    name: 'Items', 
    href: '/items' 
  },
  { 
    name: 'LocationsMonsters', 
    href: '/locations-monsters' 
  },
  { 
    name: 'LocationsItems', 
    href: '/locations-items' 
  },
];

// Navigation component 

// Citation for the following function:
// Date: 02/22/2024
// Title: Adapted from [Learn Next.js: Creating Layouts and Pages]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages
// Description: Logic for highlighting navigation link on current page borrowed from source.
export default function Navbar()
{
  // Gets url path of current page, used for checking against selected navigation link
  // for highlighting it.
  const pathname = usePathname(); 

  return (
    navlinkInfos.map((navlinkInfo) => 
      <NavLink
        key={navlinkInfo.href}
        label={navlinkInfo.name}
        href={navlinkInfo.href}
        active={pathname === navlinkInfo.href}
        variant='subtle'
      />
    )
  );
}