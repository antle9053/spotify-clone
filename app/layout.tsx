import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/app/_lib/utils";
import StoreProvider from "./StoreProvider";
import { Sidebar } from "./_components/layout/Sidebar";
import { SupabaseProvider } from "@/app/_providers/SupabaseProvider";
import { Toaster } from "./_components/ui/toaster";
import { Suspense } from "react";
import { Player } from "@/app/_components/layout/Player";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spotify",
  description:
    "Spotify clone using NextJS, Shadcn, Tailwindcss, Supabase, Redux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen h-screen bg-black antialiased",
          fontSans.className,
        )}
      >
        <SupabaseProvider>
          <StoreProvider>
            <Suspense fallback={<p>Loading ...</p>}>
              <Sidebar>{children}</Sidebar>
              <Player />
            </Suspense>
            <Toaster />
          </StoreProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
