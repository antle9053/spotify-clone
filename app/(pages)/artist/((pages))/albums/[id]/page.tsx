"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/app/_components/ui/separator";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Album } from "@/app/_types/album";
import { TableSongs } from "@/app/_components/others/TableSongs";

export default function ArtistAlbumsPage({
  params,
}: {
  params: { id: string };
}) {
  const [albumDetail, setAlbumDetail] = useState<Album | null>(null);

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchAlbumDetail = async () => {
      const { data, error } = await supabaseClient
        .from("albums")
        .select()
        .eq("id", params.id);

      if (error) {
        console.log(error);
      } else {
        setAlbumDetail(data?.[0]);
      }
    };

    void fetchAlbumDetail();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">
          Album: {albumDetail?.album_name}
        </h1>
      </div>
      <Separator className="my-4 bg-white/10" />
      <TableSongs albumId={albumDetail?.id} />
    </div>
  );
}
