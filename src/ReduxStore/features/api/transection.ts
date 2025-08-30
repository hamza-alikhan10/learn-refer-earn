// src/ReduxStore/features/api/transactions.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL; 
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const transactions = createApi({
  reducerPath: "transactions",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      {
        id: string;            // razorpay_order_id
        amount: number;        // paise
        currency: string;      // 'INR'
        key_id: string;        // public key to use on frontend
        receipt: string;       // tx.id
      },
      { userId: string; courseId: string; amount: number } // rupees
    >({
      query: (body) => ({
        url: "create-order",
        method: "POST",
        body,
      }),
    }),

    verifyPayment: builder.mutation<
      { status: "success" | "failed"; tx?: any; reason?: string },
      {
        userId: string;
        courseId: string;
        amount: number; // rupees (for cross-checks / logs)
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }
    >({
      query: (body) => ({
        url: "verify-payment",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useVerifyPaymentMutation } = transactions;
