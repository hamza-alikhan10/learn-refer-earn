import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface CourseItem {
  course_id: string;
  title: string;
  description?: string;
  level?: string;
  price: number;
  duration?: string;
  total_earned: number;
  referrals: number;
  potential_per_sale: number;
  enrolled_status?: "enrolled" | "not_enrolled";
}

export interface DashboardResponse {
  user_id: string;
  referral_code: string;
  total_earnings: number;
  available_balance: number;
  referrals_primary?: number;
  referrals_secondary?: number;
  enrolled_users_primary?: number;
  enrolled_users_secondary?: number;
  earnings_daily?: number;
  earnings_weekly?: number;
  earnings_monthly?: number;
}

// Reuse the same dashboardApi
export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Dashboard"], // <- needed for invalidation
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, { userId: string }>({
      query: ({ userId }) => `get_dashboard?userId=${encodeURIComponent(userId)}`,
      providesTags: ["Dashboard"],
    }),

    // The new withdrawalViaEmail mutation
    withdrawalViaEmail: builder.mutation<
      { ok: boolean }, // response type from your edge function
      {
        userId: string;
        email?: string;
        upiId?: string;
        mobileNo?: string;
        amount: number;
      }
    >({
      query: (body) => ({
        url: "send-payment-email",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Dashboard"], // <- will refetch dashboard after success
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useWithdrawalViaEmailMutation,
} = dashboardApi;
