import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { FC, useState } from "react";
import { Separator } from "@/app/_components/ui/separator";
import { Button } from "@/app/_components/ui/button";
import { Trash } from "lucide-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useToast } from "../../ui/use-toast";
import { Album } from "@/app/_types/album";

interface ConfirmDeleteAlbumDialogProps {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  album: Album;
}

export const ConfirmDeleteAlbumDialog: FC<ConfirmDeleteAlbumDialogProps> = ({
  open,
  handleOpenChange,
  album,
}) => {
  const [loading, setLoading] = useState(false);
  const { supabaseClient } = useSessionContext();
  const { toast } = useToast();

  const deleteAlbum = async () => {
    try {
      setLoading(true);
      const response = await supabaseClient
        .from("albums")
        .delete()
        .eq("id", album.id)
        .select();

      if (response.status === 200) {
        let errorDeleteThumbnailFile;

        if (album.thumbnail_path) {
          const { error } = await supabaseClient.storage
            .from("images")
            .remove([album.thumbnail_path]);
          errorDeleteThumbnailFile = error;
        }

        if (!errorDeleteThumbnailFile) {
          toast({
            title: "Success",
            description: "Delete album successfully",
          });
        } else {
          toast({
            title: "Error",
            description: "Error occur when delete album",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleOpenChange(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        handleOpenChange(open);
      }}
    >
      <DialogTrigger
        asChild
        onClick={(e) => {
          handleOpenChange(true);
        }}
      >
        <Trash size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        id={album.id}
        className="sm:max-w-[500px] max-h-full bg-neutral-900 border-0 overflow-y-auto"
      >
        <DialogTitle className="text-white text-2xl font-semibold">
          Delete album
        </DialogTitle>
        <Separator className="mt-3 bg-white/10" />
        <p className="text-base font-bold text-white/70">
          Do you want to delete this album ?
        </p>
        <div className="flex justify-end items-center gap-2">
          <Button variant="secondary" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await deleteAlbum();
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
