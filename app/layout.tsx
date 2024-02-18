import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";
import SideNav from "@/app/ui/sidenav";
import AppLogo from "@/app/ui/app-logo";

export const metadata: Metadata = {
  title: "DnD Campaign Manager",
  description: "Campaign manager utility for DnD",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) 
{
  return (
    <html lang="en">
      {/* 
        Use antialiasing to make font smoother. 
        See: https://nextjs.org/learn/dashboard-app/optimizing-fonts-images 
      */}
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-row">
          <SideNav />
          <main className="grow h-2 flex flex-col m-5">
            <div className="flex-none self-center">
              <AppLogo />
            </div>
            <div className="h-screen">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
