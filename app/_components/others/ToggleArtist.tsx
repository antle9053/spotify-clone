"use client";

import { Switch } from "@/app/_components/ui/switch";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useUser } from "@/app/_hooks/useUser";
import { useToast } from "@/app/_components/ui/use-toast";
import { PostgrestError } from "@supabase/supabase-js";

export const ToggleArtist = () => {
  const [isLoading, setLoading] = useState(false);
  const { supabaseClient } = useSessionContext();
  const { userDetails } = useUser();
  console.log(userDetails);
  const { toast } = useToast();

  const toggleArtist = async (isArtist: boolean) => {
    try {
      if (userDetails) {
        setLoading(true);
        const { error } = await supabaseClient
          .from("users")
          .update({
            is_artist: isArtist,
          })
          .eq("id", userDetails?.id)
          .select();

        let errorArtist: PostgrestError | null;
        if (isArtist) {
          const { error: errorCreate } = await supabaseClient
            .from("artists")
            .insert({ user_id: userDetails?.id })
            .select();
          errorArtist = errorCreate;
          console.log(errorArtist);
        } else {
          const { error: errorDelete } = await supabaseClient
            .from("artists")
            .delete()
            .eq("user_id", userDetails?.id)
            .select();
          errorArtist = errorDelete;
        }

        if (!error && !errorArtist) {
          console.log("Success");
          toast({
            title: "Success",
            description: "Update successfully",
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-2">Artist</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-base font-normal">
          Enable your account as an artist
        </p>
        {userDetails ? (
          <Switch
            defaultChecked={userDetails.is_artist}
            disabled={isLoading}
            onCheckedChange={async (e) => {
              await toggleArtist(e);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
