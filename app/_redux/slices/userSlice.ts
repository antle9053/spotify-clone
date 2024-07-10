import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/auth-helpers-nextjs";
import Stripe from "stripe";

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface UserState {
  userDetails: UserDetails | null;
}

const initialState = {
  userDetails: null,
} satisfies UserState as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (
      state: UserState,
      action: PayloadAction<UserDetails | null>
    ) => {
      state.userDetails = action.payload;
    },
    logOut: (state: UserState) => {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, logOut } = userSlice.actions;
export default userSlice.reducer;
