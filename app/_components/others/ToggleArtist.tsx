"use client";

import { Switch } from "@/app/_components/ui/switch";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useUser } from "@/app/_hooks/useUser";

export const ToggleArtist = () => {
  const [isLoading, setLoading] = useState(false);
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  const toggleArtist = async (isArtist: boolean) => {
    try {
      setLoading(true);
      const { error } = await supabaseClient
        .from("users")
        .update({
          is_artist: isArtist,
        })
        .eq("id", user?.id)
        .select();
      if (!error) {
        console.log("Success");
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
        <p className="text-muted-foreground text-xl font-semibold">
          Enable your account as an artist
        </p>
        <Switch
          disabled={isLoading}
          onCheckedChange={async (e) => {
            await toggleArtist(e);
          }}
        />
      </div>
    </div>
  );
};
