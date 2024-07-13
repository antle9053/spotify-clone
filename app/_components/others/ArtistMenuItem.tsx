import { FC } from "react";
import Link from "next/link";
import { cn } from "@/app/_lib/utils";

type ArtistMenuItemProps = {
  Icon: any;
  label: string;
  active: boolean;
  href: string;
};

export const ArtistMenuItem: FC<ArtistMenuItemProps> = ({
  Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={`/artist${href}`}
      className={cn(
        "flex justify-center md:justify-start items-center gap-3 rounded-lg px-3 py-2 transition-all",
        active
          ? "bg-muted text-primary hover:text-primary"
          : "text-muted-foreground hover:text-white"
      )}
    >
      <Icon className="h-4 w-4" />
      <p className="hidden md:block">{label}</p>
    </Link>
  );
};
