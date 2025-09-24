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
  is_course_available: boolean | null ;
}

interface CourseResponse {
  course: Course;
  visitorType: "public" | "logged_in" | "enrolled";
  isEnrolled: boolean;
}
// types/courseVideos.ts

export interface Episode {
  id: string;
  title: string;
  duration: number | null;        // postgres interval comes back as string, e.g. number or null
  metadata: any;                  // keep as any unless you have a stricter shape
  course_id: string;
  video_url: string;
  created_at: string;             // ISO timestamp string
  section_id: string;
  updated_at: string;             // ISO timestamp string
  description: string | null;
}

export interface SectionWithEpisodes {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  metadata: any;
  created_at: string;
  updated_at: string;
  episodes: Episode[];
}

export interface CourseWithSections {
  id: string;
  sections: SectionWithEpisodes[];
}

interface CourseVideosResponse {
  course: CourseWithSections;
  visitorType: "public" | "logged_in" | "enrolled" | string;
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
