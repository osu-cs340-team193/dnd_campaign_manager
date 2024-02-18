// Single navigation link to an app page.
// See: https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

export type NavLinkInfo = {
  name: string;
  href: string;
};

export default function NavLink({ linkInfo } : { linkInfo: NavLinkInfo })
{
  // Highlight active link.
  // See: https://nextjs.org/learn/dashboard-app/navigating-between-pages
  const pathname = usePathname(); 

  return (
    <Link
      key={linkInfo.name}
      href={linkInfo.href}
      className={
        clsx(
          "flex justify-center h-[50px] rounded-md",
          {
            "bg-sky-500 text-white": pathname === linkInfo.href,
          },
        )
      }
    >
      <p className="text-center text-lg font-medium bg-inherit self-center">
        {linkInfo.name}
      </p>
    </Link>
  );
}