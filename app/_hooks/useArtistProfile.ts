import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/app/_hooks/useUser";
import { useToast } from "@/app/_components/ui/use-toast";

export const useArtistProfile = () => {
  const { supabaseClient } = useSessionContext();
  const { userDetails } = useUser();
  const { toast } = useToast();

  const getProfile = async () => {
    try {
      const { data } = await supabaseClient.from("artist").select();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userDetails);

  const updateProfile = async (values: {
    username: string;
    about?: string;
    cover?: File;
  }) => {
    try {
      if (userDetails && userDetails?.id) {
        console.log(values);
        const { username, about, cover } = values;
        let path = "";
        let errorUpload;
        if (cover) {
          const filename = `${cover.lastModified}-${cover.name}`;
          const { data, error } = await supabaseClient.storage
            .from("images")
            .upload(`pubic/cover/${filename}`, cover, { upsert: false });
          path = data?.path ?? "";
          errorUpload = error;
        }
        const { data, error } = await supabaseClient
          .from("artists")
          .update({
            artist_name: username,
            ...(about && { about }),
            ...(path && { cover_url: path }),
          })
          .eq("user_id", userDetails.id);
        console.log(data);

        if (!error && !errorUpload) {
          console.log("Success");
          toast({
            title: "Success",
            description: "Update successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateProfile,
  };
};
