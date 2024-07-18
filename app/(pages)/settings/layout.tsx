import { Header } from "@/app/_components/layout/Header";
import { Separator } from "@/app/_components/ui/separator";
import { ReactNode } from "react";

export default function SettingsPageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto scrollbar">
      <Header>{children}</Header>
    </div>
  );
}
