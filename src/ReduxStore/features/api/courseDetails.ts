import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BaseURL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: string;
  level: string;
  rating: number;
  total_students: number;
  image_url: string;
  curriculum: string[];
  created_at: string;
  updated_at: string;
  category: string;
}

interface CourseResponse {
  course: Course;
  visitorType: "public" | "logged_in" | "enrolled";
  isEnrolled: boolean;
}
export interface CourseVideosResponse {
  videos: { path: string; url: string }[];
  visitorType: 'public' | 'logged_in' | 'enrolled' | string;
  isEnrolled: boolean;
}

export const courseDetails = createApi({
  reducerPath: "courseDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${anonKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCourseById: builder.query<CourseResponse, { id: string; userId?: string }>({
      query: ({ id, userId }) => {
        const params = new URLSearchParams({ id });
        if (userId) params.append("userId", userId);
        return `course-details?${params.toString()}`;
      },
    }),

    // If you later need course videos
 getCourseVideos: builder.query<CourseVideosResponse, { id: string; userId: string | undefined }>({
  query: ({ id, userId }) => {
    // keep the same query building you like; handle undefined userId gracefully
    const params = new URLSearchParams({ id });
    if (userId) params.append('userId', userId);
    return `course-details/videos?${params.toString()}`;
  },
}),
  }),
});

export const { useGetCourseByIdQuery, useGetCourseVideosQuery } = courseDetails;
