"use client";

import { Home, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useMemo } from "react";
import { SidebarItem } from "@/app/_components/others/SidebarItem";

type SidebarProps = {
  children: ReactNode;
};

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathname === "/",
        href: "/",
        icon: Home,
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: Search,
      },
    ],
    [pathname],
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2">
        <div className="bg-neutral-900 rounded-lg h-fit w-full">
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route, index) => (
              <SidebarItem
                key={index}
                Icon={route.icon}
                label={route.label}
                active={route.active}
                href={route.href}
              />
            ))}
          </div>
        </div>
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-y-auto">
          Song library
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};
