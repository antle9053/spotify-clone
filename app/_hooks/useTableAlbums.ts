import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/app/_hooks/useUser";
import { Song } from "@/app/_types/song";
import useUpdateQueryParams from "./useUpdateQueryParams";

const PAGE_SIZE = 5;

export const useTableAlbums = () => {
  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useState<Song[]>([]);
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
      if (artistDetails && artistDetails.id) {
        const { count } = await supabaseClient
          .from("albums")
          .select("*", { count: "exact", head: true })
          .eq("artist_id", artistDetails.id);

        const totalPage = Math.ceil((count ?? 1) / PAGE_SIZE);

        setTotalPage(totalPage);
      }
    };
    void fetchTotalPage();
  }, [artistDetails]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        if (artistDetails && artistDetails.id) {
          const from = (page - 1) * PAGE_SIZE;
          const to = page * PAGE_SIZE - 1;

          const { data, error } = await supabaseClient
            .from("albums")
            .select()
            .eq("artist_id", artistDetails.id)
            .range(from, to);

          if (error) {
            console.error(error);
          } else {
            setAlbums(data);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    void fetchAlbums();
  }, [artistDetails, page]);

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
    albums,
    loading,
    handleGotoPage,
    handleNextPage,
    handlePreviousPage,
    page,
    totalPage,
  };
};
