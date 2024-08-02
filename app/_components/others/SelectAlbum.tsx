import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { FC, useEffect, useState } from "react";
import { Album } from "@/app/_types/album";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/app/_hooks/useUser";
import Image from "next/image";
import { createImageLink } from "@/app/_helpers/createLinks";

interface SelectAlbumProps {
  setValue: (value: string) => void;
}

export const SelectAlbum: FC<SelectAlbumProps> = ({ setValue }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const { supabaseClient } = useSessionContext();
  const { artistDetails } = useUser();

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabaseClient
        .from("albums")
        .select()
        .eq("artist_id", artistDetails?.id!);
      if (error) {
        console.error(error);
      } else {
        setAlbums(data);
      }
    };
    void fetchAlbums();
  }, []);

  console.log(albums);

  return (
    <Select onValueChange={(e) => setValue(e)}>
      <SelectTrigger className="w-[300px] h-[36px]">
        <SelectValue placeholder="Select an album" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Album</SelectLabel>
          <SelectItem value="none">None</SelectItem>
          {albums.map((album, index) => (
            <SelectItem key={index} value={album.id}>
              <div className="flex justify-start items-center gap-3">
                <Image
                  src={
                    album.thumbnail_path
                      ? createImageLink(album.thumbnail_path)
                      : "/images/music-placeholder.png"
                  }
                  alt={"aa"}
                  width={20}
                  height={20}
                />
                {album.album_name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
