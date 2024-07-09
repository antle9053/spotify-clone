"use client";

import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { UserDetails } from "../_redux/slices/userSlice";
import { useRouter } from "next/navigation";

export const a = () => {
  return 1;
};

export const useUser = () => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
  } = useSessionContext();
  const accessToken = session?.access_token ?? null;
  const user = useSupaUser();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const router = useRouter();

  const getUserDetails = () =>
    supabaseClient.from("users").select("*").single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails()]).then((results) => {
        const userDetailResponse = results[0];

        if (userDetailResponse.status === "fulfilled") {
          setUserDetails(userDetailResponse.value.data);
        }
      });
    } else if (!user && !isLoadingData && !isLoadingUser) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
    }
  };

  return {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
    supabaseClient,
    handleLogout,
  };
};
