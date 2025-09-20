import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface CheckEnrollmentPayload {
  userId?: string; // may be absent
}

export interface CheckEnrollmentResponse {
  enrolled: boolean;
  // may include error in server responses, but normal response has { enrolled: boolean }
  error?: string;
}

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // We use a mutation because the function expects POST (body)
    checkEnrollment: builder.mutation<CheckEnrollmentResponse, CheckEnrollmentPayload>({
      query: (body) => ({
        url: "check-enrollment",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCheckEnrollmentMutation } = enrollmentApi;
export default enrollmentApi;
