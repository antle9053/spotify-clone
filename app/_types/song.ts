import { Album } from "@/app/_types/album";

export interface Song {
  id: string;
  album_id?: string;
  album?: Partial<Album>;
  author?: string;
  author_id: string;
  created_at: Date;
  duration: number;
  song_path: string;
  thumbnail_path?: string;
  title: string;
  song_name: string;
}
