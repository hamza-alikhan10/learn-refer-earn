// ReduxStore/features/api/referral.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  level: string;
}

interface Referral {
  user_id: string;
  referral_code: string;
}

export interface ReferralResponse {
  course: Course;
  referral: Referral;
}

export const referralApi = createApi({
  reducerPath: "referralApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getReferralData: builder.query<
      ReferralResponse,
      { courseId: string; userId: string }
    >({
      query: ({ courseId, userId }) => 
        `referral/${courseId}?userId=${userId}`,
    }),
  }),
});

export const { useLazyGetReferralDataQuery } = referralApi;
