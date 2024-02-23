// Side navigation component.
// See: https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages

import AppLogo from "../app-logo";
import NavLinks from "./nav-links";

export default function SideNav()
{
  return (
    <div className="flex flex-col bg-stone-300 h-screen">
      <div className="flex-none mt-2 mx-5">
        <AppLogo />
      </div>
      <div className="grow mt-10 mx-5">
        <NavLinks />
      </div>
    </div>
  );
}