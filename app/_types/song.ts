export interface Song {
  id: string;
  album_id?: string;
  author?: string;
  author_id: string;
  created_at: Date;
  duration: number;
  song_path: string;
  thumbnail_path?: string;
  title: string;
}