"use client";

import {
  Cog,
  LibraryBig,
  ListMusic,
  Music,
  ShoppingCart,
  Ticket,
  User,
} from "lucide-react";
import { ArtistMenuItem } from "./ArtistMenuItem";
import { usePathname } from "next/navigation";

export function ArtistMenu() {
  const artistMenu = [
    {
      Icon: User,
      label: "Profile",
      href: "/profile",
    },
    {
      Icon: Music,
      label: "Songs",
      href: "/songs",
    },
    {
      Icon: LibraryBig,
      label: "Albums",
      href: "/albums",
    },
    {
      Icon: ListMusic,
      label: "Playlist",
      href: "/playlist",
    },
    {
      Icon: ShoppingCart,
      label: "Merch",
      href: "/merch",
    },
    {
      Icon: Ticket,
      label: "Tours",
      href: "/tours",
    },
    {
      Icon: Cog,
      label: "Settings",
      href: "/settings",
    },
  ];

  const pathname = usePathname();

  return (
    <nav className="grid grid-flow-col md:grid-flow-row items-start text-sm font-medium w-full md:w-[200px] xl:w-[300px]">
      {artistMenu.map((item, index) => (
        <ArtistMenuItem
          key={index}
          Icon={item.Icon}
          label={item.label}
          href={item.href}
          active={pathname === `/artist${item.href}`}
        />
      ))}
    </nav>
  );
}
