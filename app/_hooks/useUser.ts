"use client";

import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { useCallback, useState } from "react";
import { logOut, setUserDetails } from "../_redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../_redux/hooks";
import { RootState } from "../_redux/store";
import { useToast } from "../_components/ui/use-toast";

export const useUser = () => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
  } = useSessionContext();
  const accessToken = session?.access_token ?? null;
  const user = useSupaUser();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(
    (state: RootState) => state.user.userDetails,
  );

  const { toast } = useToast();

  const getUserDetails = () =>
    supabaseClient.from("users").select("*").single();

  const fetchUserDetails = useCallback(async () => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails()])
        .then((results) => {
          const userDetailResponse = results[0];

          if (userDetailResponse.status === "fulfilled") {
            dispatch(setUserDetails(userDetailResponse.value.data));
          }
        })
        .finally(() => {
          setIsLoadingData(false);
        });
    } else if (!user && !isLoadingData && !isLoadingUser) {
      dispatch(setUserDetails(null));
    } else {
    }
  }, [user, isLoadingUser, isLoadingData]);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    dispatch(logOut());

    router.refresh();

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
    supabaseClient,
    handleLogout,
    fetchUserDetails,
  };
};
