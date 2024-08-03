import Image from "next/image";
import { TableCell, TableRow } from "../ui/table";
import { FC } from "react";
import { Edit2 } from "lucide-react";
import { Album } from "@/app/_types/album";
import { useRouter, usePathname } from "next/navigation";

interface TableAlbumItemProps {
  album: Album;
}

export const TableAlbumItem: FC<TableAlbumItemProps> = ({ album }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <TableRow
      className="border-white/10 cursor-pointer"
      onClick={() => {
        router.push(`${pathname}/${album.id}`);
      }}
    >
      <TableCell className="font-medium text-white" width="64px">
        <Image
          src={
            album.thumbnail_path
              ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${album.thumbnail_path}`
              : "/images/music-placeholder.png"
          }
          alt="thumbnail"
          width={50}
          height={50}
        />
      </TableCell>
      <TableCell className="text-white">{album.album_name}</TableCell>
      <TableCell className="text-white">{album.songs.length}</TableCell>
      <TableCell className="text-right text-white">
        <div className="flex gap-4 justify-end items-center">
          <Edit2 size={16} className="cursor-pointer" />
        </div>
      </TableCell>
    </TableRow>
  );
};
