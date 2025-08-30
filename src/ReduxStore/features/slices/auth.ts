// src/ReduxStore/features/slices/auth.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

interface AuthState {
  email: string;
  username: string;
  password?: string;
  otp: string;
  showPassword?: boolean;
  error: string | null;
  loading: boolean;
  isOtpVerification: boolean;
  user: string | null;
  userId: string | null;
  isSignUp: boolean;
  isAuthModelOpen: boolean;
  startWithGoogle: boolean;
  isAuthenticated: string | null;
}

const initialState: AuthState = {
  email: "",
  username: "",
  password: "",
  otp: "",
  showPassword: false,
  error: null,
  loading: false,
  isOtpVerification: false,
  user: "",
  userId: null,
  isSignUp: false,
  isAuthModelOpen: false,
  startWithGoogle: false,
  isAuthenticated: "",

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setField<K extends keyof AuthState>(
      state,
      action: PayloadAction<{ key: K; value: AuthState[K] }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
     setUser(
      state,
      action: PayloadAction<{
        user: string | null;
        userId: string | null;
        isAuthenticated: string;
      }>
    ) {
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setOtpVerification(state, action: PayloadAction<boolean>) {
      state.isOtpVerification = action.payload;
    },
    setIsSignUp(state, action: PayloadAction<boolean>) {
      state.isSignUp = action.payload;
    },
    setIsAuthModelOpen(state, action: PayloadAction<boolean>) {
      state.isAuthModelOpen = action.payload;
    },
    setStartWithGoogle(state, action: PayloadAction<boolean>) {
      state.startWithGoogle = action.payload;
    },
    resetAuthState: () => initialState,
  },
});

export const {
  setField,
  setLoading,
  setError,
  setUser,
  setOtpVerification,
  resetAuthState,
  setIsSignUp,
  setIsAuthModelOpen,
  setStartWithGoogle,

} = authSlice.actions;

export default authSlice.reducer;
