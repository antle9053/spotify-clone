import type { Metadata } from "next";
import { Lexend as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/app/_lib/utils";
import StoreProvider from "./StoreProvider";
import { Sidebar } from "./_components/layout/Sidebar";
import { SupabaseProvider } from "@/app/_providers/SupabaseProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          fontSans.variable,
        )}
      >
        <SupabaseProvider>
          <StoreProvider>
            <Sidebar>{children}</Sidebar>
          </StoreProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
