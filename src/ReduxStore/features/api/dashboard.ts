// ReduxStore/features/api/dashboard.ts
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
  referrals: number;
  enrolled_users: number;
  available_courses: number;
  courses: CourseItem[];
}

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`, // e.g. https://<your-functions-domain>/
    prepareHeaders: (headers) => {
      // match transactions.ts style: send anon key + content-type
      headers.set("Authorization", `Bearer ${anonKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, { userId: string }>({
      // use same URL style as your function (no extra leading slash)
      query: ({ userId }) => `get_dashboard?userId=${encodeURIComponent(userId)}`,
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
