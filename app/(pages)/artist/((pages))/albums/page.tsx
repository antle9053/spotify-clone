"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { Plus } from "lucide-react";
import { CreateAlbumDialog } from "@/app/_components/others/Dialogs/CreateAlbumDialog";
import { TableAlbums } from "@/app/_components/others/TableAlbums";

export default function ArtistAlbumsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">Albums</h1>
        <CreateAlbumDialog
          triggerElement={
            <Button variant="secondary">
              <Plus size={14} className="mr-2" />
              Create album
            </Button>
          }
          open={open}
          type="upload"
          handleOpenChange={(open) => setOpen(open)}
        />
      </div>
      <Separator className="my-4 bg-white/10" />
      <TableAlbums />
    </div>
  );
}
