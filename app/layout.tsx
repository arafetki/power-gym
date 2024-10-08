import type { Metadata, Viewport } from "next";
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import {Rubik, Rubik_Mono_One} from "next/font/google";
import "./globals.css";

const rubikSans = Rubik({
  display: 'swap',
  subsets: ["latin"],
  variable: "--font-rubik-sans",
  weight: ['300', '400', '500','600','700','800','900'],
});
const rubikMono = Rubik_Mono_One({
  display: 'swap',
  subsets: ["latin"],
  variable: "--font-rubik-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Power Gym",
    template: `%s | Power Gym`,
  },
  
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubikSans.variable} ${rubikMono.variable} font-rubikSans antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            enableSystem
            defaultTheme="system"
            attribute="class"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
