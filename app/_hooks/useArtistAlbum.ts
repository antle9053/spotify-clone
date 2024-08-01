import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/app/_hooks/useUser";
import { useToast } from "@/app/_components/ui/use-toast";
import { songDialogType } from "@/app/_components/others/UploadSongDialog";

export const useArtistAlbum = () => {
  const { supabaseClient } = useSessionContext();
  const { artistDetails } = useUser();
  const { toast } = useToast();

  const createAlbum = async (
    values: {
      title?: string;
      thumbnail?: File;
    },
    type: songDialogType,
    albumId: string,
  ) => {
    try {
      if (artistDetails && artistDetails.id) {
        console.log(artistDetails.id);
        const { title, thumbnail } = values;

        let thumbnail_path = "";
        let errorUploadThumbnail;
        let errorSubmit;

        if (thumbnail) {
          const filename = `${thumbnail.lastModified}-${thumbnail.name}`;
          const { data, error } = await supabaseClient.storage
            .from("images")
            .upload(`pubic/thumbnails/${filename}`, thumbnail, {
              upsert: false,
            });
          thumbnail_path = data?.path ?? "";
          errorUploadThumbnail = error;
        }

        if (type === "upload") {
          const { error } = await supabaseClient
            .from("albums")
            .insert({
              album_name: title ?? "",
              ...(thumbnail_path && { thumbnail_path }),
              artist_id: artistDetails?.id,
            })
            .select();
          errorSubmit = error;
        } else if (type === "update") {
          const { error } = await supabaseClient
            .from("songs")
            .update({
              title,
              ...(thumbnail_path && { thumbnail_path }),
              author_id: artistDetails?.id,
              album_id: null,
            })
            .eq("id", albumId);

          errorSubmit = error;
        }

        if (!errorSubmit && !errorUploadThumbnail) {
          toast({
            title: "Success",
            description: "Create album successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createAlbum,
  };
};
