import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { cn } from "@/app/_lib/utils";
import { FC } from "react";

interface TablePaginationProps {
  currentPage: number;
  totalPage: number;
  handleGoto: (page: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export const TablePagination: FC<TablePaginationProps> = ({
  currentPage,
  totalPage,
  handleGoto,
  handlePrev,
  handleNext,
}) => {
  return (
    <Pagination className="text-white py-2 justify-end">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePrev} />
        </PaginationItem>
        {Array(totalPage)
          .fill(0)
          .map((_, i) => {
            const isActive = i + 1 === currentPage;
            return (
              <PaginationItem key={i} className="cursor-pointer">
                <PaginationLink
                  isActive={isActive}
                  className={cn(isActive ? "text-foreground" : "")}
                  onClick={() => handleGoto(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
