import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface PaymentMethod {
  id: string;
  method_type: "upi" | "bank_transfer" | "paypal" | "crypto" | string;
  account_details: any;
  is_verified: boolean;
  is_primary: boolean;
  created_at: string;
}

export interface GetPaymentMethodsResponse {
  payment_methods: PaymentMethod[];
  default_primary_id: string | null;
  available_balance: number; // rupees
}

export const paymentMethodsApi = createApi({
  reducerPath: "paymentMethodsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // NOTE: this calls an endpoint that expects POST body { userId }
    getPaymentMethods: builder.mutation<GetPaymentMethodsResponse, { userId: string }>({
      query: (body) => ({
        url: `get-payment-methods`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPaymentMethodsMutation } = paymentMethodsApi;
