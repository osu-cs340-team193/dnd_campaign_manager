import type { Metadata } from "next";
//import "@/app/ui/globals.css";
import '@mantine/core/styles.css';

import { inter } from "@/app/ui/fonts";
import Provider from '@/app/ui/extensions/provider';
import { ColorSchemeScript } from '@mantine/core';
import App from "@/app/ui/app";

export const metadata: Metadata = {
  title: "DnD Campaign Manager",
  description: "Campaign manager utility for DnD",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) 
{
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      {/* 
        Use antialiasing to make font smoother. 
        See: https://nextjs.org/learn/dashboard-app/optimizing-fonts-images 
      */}
      <body className={`${inter.className} antialiased`}>
        <Provider>
          <App>
            {children}
          </App>
        </Provider>
      </body>
    </html>
  );
}
