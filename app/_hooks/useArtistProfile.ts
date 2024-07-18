import { useSessionContext } from "@supabase/auth-helpers-react";

export const useArtistProfile = () => {
  const { supabaseClient } = useSessionContext();

  const updateProfile = async (values: {
    username: string;
    about?: string;
    cover?: File;
  }) => {
    try {
      const { username, about, cover } = values;
      let path = "";
      if (cover) {
        const { data, error } = await supabaseClient.storage
          .from("images")
          .upload(`pubic/cover/cover1.png`, cover, { upsert: false });
        path = data?.path ?? "";
      }
      await supabaseClient.from("artist").insert({
        artist_name: username,
        ...(about && { about }),
        ...(path && { cover_url: path }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateProfile,
  };
};
