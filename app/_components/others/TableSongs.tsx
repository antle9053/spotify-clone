import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { useTableSongs } from "@/app/_hooks/useTableSongs";
import { TableSongItem } from "./TableSongItem";
import { TablePagination } from "./TablePagination";

export function TableSongs() {
  const {
    songs,
    loading,
    page,
    totalPage,
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
  } = useTableSongs();

  return (
    <>
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

        <TableBody className="min-h-">
          {songs.map((song, index) => (
            <TableSongItem key={index} song={song} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={page}
        totalPage={totalPage}
        handleGoto={handleGotoPage}
        handleNext={handleNextPage}
        handlePrev={handlePreviousPage}
      />
    </>
  );
}
