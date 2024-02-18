// Navigation links to app pages.
// See: https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages

import NavLink from "@/app/ui/nav-link";
import { NavLinkInfo } from "@/app/ui/nav-link";

const linkInfos: NavLinkInfo[] = [
  { name: "Home", href: "/" },
  { name: "Monsters", href: "/monsters" },
];

export default function NavLinks()
{
  return (
    <>
      {linkInfos.map((linkInfo) => 
        <NavLink 
          linkInfo={linkInfo} 
        />
      )}
    </>
  );
}