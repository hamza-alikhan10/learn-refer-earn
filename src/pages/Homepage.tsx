
import { Search, Star, TrendingUp, Users, Award } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import { useNavigate , useLocation} from "react-router-dom";
import { useGetCoursesQuery } from "../ReduxStore/features/api/courses";

const PAGE_SIZE = 6;
const DEBOUNCE_MS = 400;

const CourseSkeleton = () => (
  <div className="animate-pulse bg-white p-4 rounded-xl shadow-md">
    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const Homepage: React.FC = () => {
  const [rawSearch, setRawSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState<string | null>(null); // debounced
  const [searchCategory, setSearchCategory] = useState<string>("All Categories");

  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // accumulatedCourses stores all fetched pages so we can append
  const [accumulatedCourses, setAccumulatedCourses] = useState<any[]>([]);

    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      // save referralCode in sessionStorage
      sessionStorage.setItem("referralCode", ref);
      // navigate to "/" without query params
      navigate("/", { replace: true });
    } 
  }, [location.search, navigate]);

  // debounce rawSearch -> searchTerm
  useEffect(() => {
    const t = setTimeout(() => {
      const trimmed = rawSearch.trim();
      setSearchTerm(trimmed ? trimmed : null);
      // reset offset when search changes (debounced)
      setOffset(0);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [rawSearch]);

  // Build RTK Query args
  const queryArgs = useMemo(() => {
    return {
      offset,
      limit: PAGE_SIZE,
      search: searchTerm,
      categories: searchCategory !== "All Categories" ? [searchCategory] : null,
    };
  }, [offset, searchTerm, searchCategory]);

  const { data, isLoading, isFetching, isError, refetch } = useGetCoursesQuery(queryArgs);

  // Reset accumulatedCourses when search or category changes
  useEffect(() => {
    setAccumulatedCourses([]); // clear previous pages
    // If offset is not 0, ensure we request first page
    if (offset !== 0) setOffset(0);
    // If the current query already returned first page (offset 0), we'll append in next effect
  }, [searchTerm, searchCategory]);

  // When new data arrives, either replace (offset 0) or append (offset > 0)
  useEffect(() => {
    if (!data) return;

    const newPage = data.courses ?? [];

    if (offset === 0) {
      setAccumulatedCourses(newPage);
    } else {
      // If the user clicked load more but server returned fewer than PAGE_SIZE items,
      // we still append them (and the "View More" button will hide below).
      setAccumulatedCourses((prev) => {
        // avoid duplicates in case backend returns overlapping results
        const prevIds = new Set(prev.map((c) => c.id));
        const toAppend = newPage.filter((c) => !prevIds.has(c.id));
        return [...prev, ...toAppend];
      });
    }
  }, [data, offset]);

  const loadMore = () => {
    // prevent multiple clicks while fetching
    if (isFetching) return;
    setOffset((prev) => prev + PAGE_SIZE);
  };

  const courses = accumulatedCourses;
  const categories = ["All Categories", ...(data?.categories ?? [])];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master Affiliate Marketing. Share Knowledge.{" "}
                <span className="text-yellow-300">Earn Big.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Learn affiliate marketing from experts and earn 50% commission
                by referring others
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate("/course-page")}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Browse Affiliate Marketing Courses</span>
                </button>
                <button
                  onClick={() => navigate("/referral-program")}
                  className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Learn About Referrals
                </button>
              </div>
            </div>

            {/* Video / Image */}
            <div className="relative">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                    alt="Affiliate Marketing Success Dashboard - See real earnings"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-medium mb-1">
                      Live Affiliate Dashboard
                    </p>
                    <p className="text-xs opacity-90">
                      See real affiliate marketing earnings
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    LIVE
                  </div>
                </div>
                <p className="text-center text-white/80 text-sm mt-3">
                  🚀 Watch real affiliate marketers generate profits in
                  real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">15,000+</h3>
              <p className="text-gray-600">Affiliate Marketers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">25+</h3>
              <p className="text-gray-600">Marketing Experts</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">4.8/5</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50%+10%</h3>
              <p className="text-gray-600">Multi-Level Commission</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Your Perfect Affiliate Marketing Course
            </h2>
            <p className="text-gray-600">
              Search through our comprehensive affiliate marketing course
              library
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search affiliate marketing courses, instructors, or topics..."
                  value={searchTerm ?? ""}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setOffset(0);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={searchCategory}
                onChange={(e) => {
                  setSearchCategory(e.target.value);
                  setOffset(0);
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-600">
              {searchTerm || searchCategory !== "All Categories"
                ? `Showing ${courses.length} results`
                : "Top-rated courses from expert instructors"}
            </p>
          </div>

          {isLoading || isFetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              {courses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No courses found matching your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSearchCategory("All Categories");
                      setOffset(0);
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}

          {data && (data.courses?.length ?? 0) >= PAGE_SIZE && (
            <div className= "text-center mt-5"> 
                <button
                  type="button" // IMPORTANT: prevents form submit / reload
                  onClick={loadMore}
                  disabled={isFetching}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isFetching ? "Loading..." : "View More"}
              </button>
            </div>
          )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
