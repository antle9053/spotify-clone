import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Stripe from "stripe";

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  is_artist: boolean;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface ArtistDetails {
  id: string;
  artist_name: string;
  cover_url?: string;
  about: string;
}

export interface UserState {
  userDetails: UserDetails | null;
  artistDetails: ArtistDetails | null;
}

const initialState = {
  userDetails: null,
  artistDetails: null,
} satisfies UserState as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (
      state: UserState,
      action: PayloadAction<UserDetails | null>,
    ) => {
      state.userDetails = action.payload;
    },
    setArtistDetails: (
      state: UserState,
      action: PayloadAction<ArtistDetails | null>,
    ) => {
      state.artistDetails = action.payload;
    },
    logOut: (state: UserState) => {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, setArtistDetails, logOut } = userSlice.actions;
export default userSlice.reducer;
