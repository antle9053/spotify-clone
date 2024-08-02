import { Song } from "@/app/_types/song";

export interface Album {
  id: string;
  album_name: string;
  thumbnail_path?: string;
  artist_name: string;
  artist_id: string;
  songs: Song[];
}
