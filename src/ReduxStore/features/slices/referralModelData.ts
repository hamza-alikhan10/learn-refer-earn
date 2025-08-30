// ReduxStore/features/referralSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for course and referral
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
}

interface Referral {
  user_id: string;
  referral_code: string;
}

interface ReferralState {
  isOpen: boolean;
  course: Course | null;
  referral: Referral | null;
}

const initialState: ReferralState = {
  isOpen: false,
  course: null,
  referral: null,
};

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setCourseData: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    },
    setReferralData: (state, action: PayloadAction<Referral>) => {
      state.referral = action.payload;
    },
  },
});

export const {
  setIsOpen,
  setCourseData,
  setReferralData,
} = referralSlice.actions;

export default referralSlice.reducer;
