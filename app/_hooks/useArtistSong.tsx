import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/app/_hooks/useUser";
import { useToast } from "@/app/_components/ui/use-toast";

export const useArtistSong = () => {
  const { supabaseClient } = useSessionContext();
  const { artistDetails } = useUser();
  const { toast } = useToast();

  const getProfile = async () => {
    try {
      const { data } = await supabaseClient.from("artist").select();
    } catch (error) {
      console.error(error);
    }
  };

  const uploadSong = async (values: {
    title: string;
    song: File;
    thumbnail?: File;
  }) => {
    try {
      if (artistDetails && artistDetails.id) {
        const { title, song, thumbnail } = values;
        let song_path = "";
        let errorUploadSong;
        let thumbnail_path = "";
        let errorUploadThumbnail;
        if (song) {
          const filename = `${song.lastModified}-${song.name}`;
          const { data, error } = await supabaseClient.storage
            .from("songs")
            .upload(`pubic/${filename}`, song, { upsert: false });
          song_path = data?.path ?? "";
          errorUploadSong = error;
        }
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
        const { data, error } = await supabaseClient
          .from("songs")
          .insert({
            title,
            ...(song_path && { song_path }),
            ...(thumbnail_path && { thumbnail_path }),
            author_id: artistDetails?.id,
            album_id: null,
          })
          .select();
        console.log(data);

        if (!error && !errorUploadSong && !errorUploadThumbnail) {
          console.log("Success");
          toast({
            title: "Success",
            description: "Upload song successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    uploadSong,
  };
};
