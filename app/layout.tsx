import type { Metadata } from "next";
import '@mantine/core/styles.css';

import { inter } from "@/app/ui/fonts";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import App from "@/app/ui/app";

export const metadata: Metadata = 
{
  title: 'DnD Campaign Manager',
  description: 'Campaign manager utility for DnD',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
      color: '#ffffff'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
      color: '#ffffff'
    },
    {
      rel: 'apple-icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/apple-touch-icon.png',
      color: '#ffffff'
    },
  ],
};

// App root
// TODO: Add citation
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) 
{
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="manifest" href="@/app/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
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
