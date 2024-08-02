import Image from "next/image";
import { TableCell, TableRow } from "../ui/table";
import { Song } from "@/app/_types/song";
import { FC, useState } from "react";
import { formatDuration } from "@/app/_helpers/formatDuration";
import { Edit2 } from "lucide-react";
import { ConfirmDeleteSongDialog } from "./Dialogs/ConfirmDeleteSong";
import { UploadSongDialog } from "@/app/_components/others/UploadSongDialog";

interface TableSongItemProps {
  song: Song;
}

export const TableSongItem: FC<TableSongItemProps> = ({ song }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <TableRow className="border-white/10">
      <TableCell className="font-medium text-white" width="64px">
        <Image
          src={
            song.thumbnail_path
              ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${song.thumbnail_path}`
              : "/images/music-placeholder.png"
          }
          alt="thumbnail"
          width={50}
          height={50}
        />
      </TableCell>
      <TableCell className="text-white">{song.title}</TableCell>
      <TableCell className="text-white">
        {song.album?.album_name ?? ""}
      </TableCell>
      <TableCell className="text-white">
        {formatDuration(song.duration)}
      </TableCell>
      <TableCell className="text-right text-white">
        <div className="flex gap-4 justify-end items-center">
          <UploadSongDialog
            open={openEdit}
            handleOpenChange={(open) => setOpenEdit(open)}
            type="update"
            triggerElement={<Edit2 size={16} className="cursor-pointer" />}
            song={song}
          />
          <ConfirmDeleteSongDialog
            open={openDelete}
            handleOpenChange={(open) => setOpenDelete(open)}
            song={song}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};
