// ReduxStore/features/api/history.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface HistoryItem {
  /* note: keep keys exactly as returned by the API */
  referral_earning_id: string;
  enrollment_id?: string | null;
  bought_at?: string | null;
  created_at?: string | null;
  buyer_user_id?: string | null;
  buyer_username?: string | null;
  buyer_display_name?: string | null;
  buyer_email?: string | null;
  referral_level?: number | null;
  course_id?: string | null;
  course_title?: string | null;
  course_price?: number | null;
  commission_percentage?: number | null;
  commission_amount?: number | null;
  earning_status?: string | null;
}

export interface BonusItem {
  bonus_id: string;
  milestone_count: number;
  bonus_amount: number;
  status: string;
  created_at: string;
}

export interface ReferralHistoryResponse {
  user_id: string;
  since: string;
  earnings_count: number;   // number of items in `history`
  bonuses_count: number;    // number of items in `bonuses`
  history: HistoryItem[];
  bonuses: BonusItem[];
}

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      return headers;
    },
  }),
  tagTypes: ["History"],
  endpoints: (builder) => ({
    // GET /history/:userId
    getReferralHistory: builder.query<ReferralHistoryResponse, { userId: string }>({
      query: ({ userId }) => `history/${userId}`,
      providesTags: (result, error, { userId }) => [{ type: "History", id: userId }],
    }),
  }),
});

export const { useGetReferralHistoryQuery, useLazyGetReferralHistoryQuery } = historyApi;
export default historyApi;
