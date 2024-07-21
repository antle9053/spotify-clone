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
import { UploadSongDialog } from "./UploadSongDialog";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableSongs() {
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
        {invoices.map((invoice) => (
          <TableRow className="border-white/10" key={invoice.invoice}>
            <TableCell className="font-medium text-white">
              <Image
                src="/images/artworks-WSNEBp4FXJhb-0-t500x500.jpg"
                alt="thumbnail"
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell className="text-white">HEYA</TableCell>
            <TableCell className="text-white">IVE SWITCH</TableCell>
            <TableCell className="text-white">3:23</TableCell>
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
