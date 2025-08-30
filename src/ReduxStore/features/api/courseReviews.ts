// ReduxStore/features/api/reviews.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface Review {
  id: string;
  course_id: string;
  user_id: string;
  userName?: string;
  rating: number;
  comment?: string;
  created_at?: string;
}

export type ReviewStatus = "no_user" | "not_reviewed" | "reviewed";

export interface ReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  reviewStatus: ReviewStatus;
  userReview?: Review | null;
}

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      return headers;
    },
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // Fetch reviews for a course
    getCourseReviews: builder.query<
    ReviewsResponse & { reviewStatus: "no_user" | "not_reviewed" | "reviewed"; userReview?: any },
    { courseId: string; userId?: string | null }
    >({
    query: ({ courseId, userId }) =>
        userId ? `reviews/${courseId}?userId=${userId}` : `reviews/${courseId}`,
    providesTags: (result, error, { courseId }) => [{ type: "Reviews", id: courseId }],
    }),

    // Add new review 
    addCourseReview: builder.mutation<
      any,
      { userId: string; courseId: string; rating: number; comment: string }
    >({
      query: ({ userId, courseId, rating, comment }) => ({
        url: `reviews/${courseId}`,
        method: "POST",
        body: { userId, courseId, rating, comment },
      }),
      invalidatesTags: (result, error, { courseId }) => [{ type: "Reviews", id: courseId }],
    }),
  }),
});

export const { useGetCourseReviewsQuery, useAddCourseReviewMutation } = reviewsApi;
