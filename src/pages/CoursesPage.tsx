// src/pages/CoursesPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Filter, Grid, List, Search } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { useGetCoursesQuery } from "../ReduxStore/features/api/courses";

const COURSES_PER_PAGE = 6;

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [priceRange, setPriceRange] = useState<string>("all"); // 'all' | 'under1000' | '1000-3000' | '3000-5000' | 'over5000'
  const [sortBy, setSortBy] = useState<string>("popular"); // popular | rating | price-low | price-high | newest
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Build query args for RTK Query
  const queryArgs = useMemo(() => {
    const offset = (Math.max(1, currentPage) - 1) * COURSES_PER_PAGE;
    // map category -> API expects categories?: string[] | null
    const categories = selectedCategory && selectedCategory !== "All Categories" ? [selectedCategory] : null;

    // map priceRange -> priceMin/priceMax
    let priceMin: number | null = null;
    let priceMax: number | null = null;

    switch (priceRange) {
      case "under1000":
        priceMax = 1000;
        break;
      case "1000-3000":
        priceMin = 1000;
        priceMax = 3000;
        break;
      case "3000-5000":
        priceMin = 3000;
        priceMax = 5000;
        break;
      case "over5000":
        priceMin = 5000;
        break;
      default:
        // 'all' leaves priceMin/Max null
        break;
    }

    // map sortBy -> API sort param
    let sort_param: string | null = null;
    switch (sortBy) {
      case "rating":
        sort_param = "highest_rated";
        break;
      case "price-low":
        sort_param = "price_low_high";
        break;
      case "price-high":
        sort_param = "price_high_low";
        break;
      case "newest":
        sort_param = "newest";
        break;
      default:
        sort_param = null; // 'popular' -> leave null (server default)
    }

    return {
      offset,
      limit: COURSES_PER_PAGE,
      search: searchTerm ? searchTerm : null,
      categories,
      // we supply priceMin/priceMax if set; the RTK endpoint supports both range and discrete
      priceMin: priceMin ?? null,
      priceMax: priceMax ?? null,
      sort: sort_param,
    };
  }, [currentPage, searchTerm, selectedCategory, priceRange, sortBy]);

  const { data, isLoading, isFetching, isError, refetch } = useGetCoursesQuery(queryArgs);

  // Reset to first page when filters change (searchTerm, selectedCategory, priceRange, sortBy)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  // helper to determine whether there are more items after current page
  const hasMore =
    !!data && Array.isArray(data.courses) && data.courses.length >= COURSES_PER_PAGE;

  // categories from API (server-driven). Prepend "All Categories"
  const categoriesFromApi = data?.categories ?? [];
  const categoryOptions = ["All Categories", ...categoriesFromApi];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
          <p className="text-gray-600">
            Discover our complete collection of expert-led courses
          </p>
        </div>

        {/* Search and Filters */}
       
        {/* Courses Grid / List */}
        {isLoading ? (
          <div className="grid gap-8 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: COURSES_PER_PAGE }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white p-4 rounded-xl shadow-md">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (data && data.courses && data.courses.length > 0) ? (
          <div className={`grid gap-8 mb-8 ${
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          }`}>
            {data.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All Categories");
                setPriceRange("all");
                setSortBy("popular");
                setCurrentPage(1);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Simple Prev / Next pagination (server-side offset/limit) */}
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isFetching}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-gray-700">Page {currentPage}</span>

          <button
            onClick={() => {
              if (!isFetching && hasMore) setCurrentPage((p) => p + 1);
            }}
            disabled={!hasMore || isFetching}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

