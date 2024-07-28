import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/app/_lib/utils";
import StoreProvider from "./StoreProvider";
import { Sidebar } from "./_components/layout/Sidebar";
import { SupabaseProvider } from "@/app/_providers/SupabaseProvider";
import { Toaster } from "./_components/ui/toaster";
import { Suspense } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
          "min-h-screen h-screen bg-black font-sans antialiased",
          fontSans.variable
        )}
      >
        <SupabaseProvider>
          <StoreProvider>
            <Suspense fallback={<p>Loading ...</p>}>
              <Sidebar>{children}</Sidebar>
            </Suspense>
            <Toaster />
          </StoreProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
