import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import Image from "next/image";
import { Edit2, Eye, Trash } from "lucide-react";
import { useTableSongs } from "@/app/_hooks/useTableSongs";
import { formatDuration } from "@/app/_helpers/formatDuration";

export function TableSongs() {
  const { songs, loading } = useTableSongs();

  console.log(songs);
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white/10">
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Album</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songs.map((song, index) => (
          <TableRow className="border-white/10" key={index}>
            <TableCell className="font-medium text-white">
              <Image
                src={
                  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${song.thumbnail_path}` ??
                  "/images/music-placeholder.png"
                }
                alt="thumbnail"
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell className="text-white">{song.title}</TableCell>
            <TableCell className="text-white">{song.album_id ?? ""}</TableCell>
            <TableCell className="text-white">
              {formatDuration(song.duration)}
            </TableCell>
            <TableCell className="text-right text-white">
              <div className="flex gap-4 justify-end items-center">
                <Eye size={16} className="cursor-pointer" />
                <Edit2 size={16} className="cursor-pointer" />
                <Trash size={16} className="cursor-pointer" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
