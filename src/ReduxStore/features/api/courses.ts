// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Review {
  name: string;
  rating: number;
  comment: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  curriculum: string[];
  created_at: string;
  updated_at: string;
  reviews: Review[];
}

export interface CoursesResponse {
  courses: Course[];
  categories: string[]; // distinct categories
  prices: number[];     // distinct prices
}

function buildQueryString(params: {
  offset?: number;
  limit?: number;
  search?: string | null;
  categories?: string[] | null;
  prices?: number[] | null;     // discrete prices
  priceMin?: number | null;     // range min
  priceMax?: number | null;     // range max
  sort?: string | null;
}) {
  const qs = new URLSearchParams();
  qs.append("offset", String(params.offset ?? 0));
  qs.append("limit", String(params.limit ?? 6));

  if (params.search) qs.append("search", params.search);
  if (params.categories && params.categories.length) {
    params.categories.forEach((c) => qs.append("category", c));
  }

  // Range takes precedence: if priceMin/priceMax present, send as range
  if (params.priceMin !== undefined && params.priceMin !== null) {
    qs.append("price_min", String(params.priceMin));
  }
  if (params.priceMax !== undefined && params.priceMax !== null) {
    qs.append("price_max", String(params.priceMax));
  }

  // Only append discrete prices if no range provided
  if ((params.priceMin === null || params.priceMin === undefined) &&
      (params.priceMax === null || params.priceMax === undefined) &&
      params.prices && params.prices.length) {
    params.prices.forEach((p) => qs.append("price", String(p)));
  }

  if (params.sort) qs.append("sort", params.sort);

  const s = qs.toString();
  return s ? `?${s}` : "";
}

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCourses: builder.query<
      CoursesResponse,
      {
        offset?: number;
        limit?: number;
        search?: string | null;
        categories?: string[] | null;
        prices?: number[] | null;
        priceMin?: number | null;
        priceMax?: number | null;
        sort?: string | null;
      }
    >({
    query: (args) => `/get-all-courses${buildQueryString(args)}`,
      // keepUnusedDataFor / caching selectable as needed
    }),
  }),
});

export const { useGetCoursesQuery } = coursesApi;
