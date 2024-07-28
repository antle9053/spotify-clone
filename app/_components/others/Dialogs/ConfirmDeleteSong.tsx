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
import { Song } from "@/app/_types/song";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useToast } from "../../ui/use-toast";

interface ConfirmDeleteSongDialogProps {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  song: Song;
}

export const ConfirmDeleteSongDialog: FC<ConfirmDeleteSongDialogProps> = ({
  open,
  handleOpenChange,
  song,
}) => {
  const [loading, setLoading] = useState(false);
  const { supabaseClient } = useSessionContext();
  const { toast } = useToast();

  const deleteSong = async () => {
    try {
      setLoading(true);
      const response = await supabaseClient
        .from("songs")
        .delete()
        .eq("id", song.id)
        .select();

      if (response.status === 200) {
        const { error: errorDeleteSongFile } = await supabaseClient.storage
          .from("songs")
          .remove([song.song_path]);

        let errorDeleteThumbnailFile;

        if (song.thumbnail_path) {
          const { error } = await supabaseClient.storage
            .from("images")
            .remove([song.thumbnail_path]);
          errorDeleteThumbnailFile = error;
        }

        if (!errorDeleteSongFile && !errorDeleteThumbnailFile) {
          toast({
            title: "Success",
            description: "Delete song successfully",
          });
        } else {
          toast({
            title: "Error",
            description: "Error occur when delete song",
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
        onClick={() => {
          handleOpenChange(true);
        }}
      >
        <Trash size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        id={song.id}
        className="sm:max-w-[500px] max-h-full bg-neutral-900 border-0 overflow-y-auto"
      >
        <DialogTitle className="text-white text-2xl font-semibold">
          Delete song
        </DialogTitle>
        <Separator className="mt-3 bg-white/10" />
        <p className="text-base font-bold text-white/70">
          Do you want to delete this song ?
        </p>
        <div className="flex justify-end items-center gap-2">
          <Button variant="secondary" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await deleteSong();
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
