import type { Metadata, Viewport } from "next";
import { ThemeProvider } from 'next-themes';
import {Rubik, Rubik_Mono_One} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";


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
        <ThemeProvider
          enableSystem
          defaultTheme="system"
          attribute="class"
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
