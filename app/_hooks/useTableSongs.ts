import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/app/_hooks/useUser";
import { Song } from "@/app/_types/song";

const PAGE_SIZE = 5;

export const useTableSongs = () => {
  const [page, setPage] = useState(1);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const { supabaseClient } = useSessionContext();
  const { artistDetails } = useUser();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        if (artistDetails && artistDetails.id) {
          const from = (page - 1) * PAGE_SIZE;
          const to = page * PAGE_SIZE;
          const { data, error } = await supabaseClient
            .from("songs")
            .select()
            .eq("author_id", artistDetails.id)
            .range(from, to);

          if (error) {
            console.error(error);
          } else {
            setSongs(data);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [artistDetails, page]);

  const handleNextPage = () => setPage((page) => page + 1);
  const handlePreviousPage = () => setPage((page) => page - 1);
  const handleGotoPage = (_page: number) => setPage(_page);

  return { songs, loading, handleGotoPage, handleNextPage, handlePreviousPage };
};
