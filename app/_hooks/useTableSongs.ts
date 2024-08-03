import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/app/_hooks/useUser";
import { Song } from "@/app/_types/song";
import useUpdateQueryParams from "./useUpdateQueryParams";

const PAGE_SIZE = 5;

interface UseTableSongsProps {
  albumId?: string;
}

export const useTableSongs = ({ albumId }: UseTableSongsProps) => {
  const [page, setPage] = useState(1);
  const [songs, setSongs] = useState<Song[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { supabaseClient } = useSessionContext();
  const { artistDetails } = useUser();

  const { updateQueryParams, queryParams } = useUpdateQueryParams();

  useEffect(() => {
    if (!queryParams.page) setPage(1);
    else {
      setPage(parseInt(queryParams.page as string));
    }
  }, [queryParams]);

  useEffect(() => {
    const fetchTotalPage = async () => {
      console.log("a");
      if (artistDetails && artistDetails.id) {
        let query = supabaseClient
          .from("songs")
          .select("*", { count: "exact", head: true })
          .eq("author_id", artistDetails.id);

        if (albumId) {
          query = query.eq("album_id", albumId);
        }

        const { count } = await query;

        const totalPage = Math.ceil((count ?? 1) / PAGE_SIZE);

        setTotalPage(totalPage);
      }
    };
    void fetchTotalPage();
  }, [artistDetails, albumId]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        if (artistDetails && artistDetails.id) {
          const from = (page - 1) * PAGE_SIZE;
          const to = page * PAGE_SIZE - 1;

          let query = supabaseClient
            .from("songs")
            .select("*, albums(album_name)")
            .eq("author_id", artistDetails.id);

          if (albumId) {
            query = query.eq("album_id", albumId);
          }

          const { data, error } = await query.range(from, to);

          if (error) {
            console.error(error);
          } else {
            setSongs(data.map((item) => ({ ...item, album: item.albums })));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [artistDetails, page, albumId]);

  const handleNextPage = () => {
    updateQueryParams({ page: page + 1 });
  };
  const handlePreviousPage = () => {
    updateQueryParams({ page: page - 1 });
  };
  const handleGotoPage = (_page: number) => {
    updateQueryParams({ page: _page });
  };

  return {
    songs,
    loading,
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    page,
    totalPage,
  };
};
