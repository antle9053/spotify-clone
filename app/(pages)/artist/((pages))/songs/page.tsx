"use client";

import { useState } from "react";
import { TableSongs } from "@/app/_components/others/TableSongs";
import { UploadSongDialog } from "@/app/_components/others/UploadSongDialog";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { Plus } from "lucide-react";

export default function ArtistSongsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">Song</h1>
        <UploadSongDialog
          triggerElement={
            <Button variant="secondary">
              <Plus size={14} className="mr-2" />
              Upload song
            </Button>
          }
          open={open}
          type="upload"
          handleOpenChange={(open) => setOpen(open)}
        />
      </div>
      <Separator className="my-4 bg-white/10" />
      <TableSongs />
    </div>
  );
}
