import type { Metadata, Viewport } from "next";
import { ThemeProvider } from 'next-themes';
import {Poppins, Roboto_Mono} from "next/font/google";
import { APP_NAME } from "@/config";
import { Toaster } from "@/components/ui/sonner";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/auth";

import "./globals.css";

const poppinsSans = Poppins({
  display: 'swap',
  subsets: ["latin"],
  style: ["normal","italic"] ,
  variable: "--font-poppins-sans",
  weight: ['100','200','300', '400', '500','600','700','800','900'],
});
const robotoMono = Roboto_Mono({
  display: 'swap',
  subsets: ["latin"],
  style: ["normal","italic"],
  variable: "--font-roboto-mono",
  weight: ['100','200','300', '400', '500','600','700'],
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
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
        className={`${poppinsSans.variable} ${robotoMono.variable} font-poppinsSans antialiased`}
      >
        <ThemeProvider
          defaultTheme="dark"
          attribute="class"
          disableTransitionOnChange
        >
          <StackProvider app={stackServerApp}>
            <StackTheme>
              {children}
            </StackTheme>
          </StackProvider>
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
