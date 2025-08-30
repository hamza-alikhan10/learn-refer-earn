// src/ReduxStore/features/api/payoutApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FUNCTIONS_BASE = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL ?? "";
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export interface CreatePayoutPayload {
  userId: string;
  amount: number;
  vpa?: string;   // optional if you plan to send payment_method_id instead
  phone?: string;
  // You can extend with payment_method_id later if needed
}

export interface CreatePayoutResponse {
  success: boolean;
  withdrawal: {
    id: string;
    user_id: string;
    amount: number;
    payment_method: string;
    payment_details: any;
    status: string;
    requested_at: string | null;
    processed_at?: string | null;
    upi_id?: string | null;
    processing_fee?: number | null;
    net_amount?: number | null;
  };
  payout?: any; // raw gateway response
}

export const payoutApi = createApi({
  reducerPath: "payoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: FUNCTIONS_BASE,
    prepareHeaders(headers) {
      if (ANON) headers.set("Authorization", `Bearer ${ANON}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPayout: builder.mutation<CreatePayoutResponse, CreatePayoutPayload>({
      query: (payload) => ({
        url: "/create-payout",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreatePayoutMutation } = payoutApi;
export default payoutApi;
