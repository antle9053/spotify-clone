import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { TablePagination } from "./TablePagination";
import { useTableAlbums } from "@/app/_hooks/useTableAlbums";
import { TableAlbumItem } from "@/app/_components/others/TableAlbumItem";

export function TableAlbums() {
  const {
    albums,
    loading,
    page,
    totalPage,
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
  } = useTableAlbums();

  console.log(albums);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>No of songs</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="min-h-">
          {albums.map((album, index) => (
            <TableAlbumItem key={index} album={album} />
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
