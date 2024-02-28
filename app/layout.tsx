import type { Metadata } from "next";
//import "@/app/ui/globals.css";
import '@mantine/core/styles.css';

import { inter } from "@/app/ui/fonts";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
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
        <MantineProvider
          theme={theme}
        >
          <App>
            {children}
          </App>
        </MantineProvider>
      </body>
    </html>
  );
}
