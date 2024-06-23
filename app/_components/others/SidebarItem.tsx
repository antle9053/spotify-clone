import { FC } from "react";
import Link from "next/link";
import { cn } from "@/app/_lib/utils";

type SidebarItemProps = {
  Icon: any;
  label: string;
  active: boolean;
  href: string;
};

export const SidebarItem: FC<SidebarItemProps> = ({
  Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && "text-white",
      )}
    >
      <Icon size={26} />
      <p className="truncate w-[100px]">{label}</p>
    </Link>
  );
};
