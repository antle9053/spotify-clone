import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isOpen: boolean;
}

const initialState = {
  isOpen: false,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleOpenChange: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { handleOpenChange } = authSlice.actions;
export default authSlice.reducer;
