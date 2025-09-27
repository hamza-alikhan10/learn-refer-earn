import React, { useEffect, useMemo, useState } from 'react';
import { Search, Star, TrendingUp, Users, Award, Quote, CheckCircle, BookOpen, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetCoursesQuery } from '../ReduxStore/features/api/courses';
import { Button } from '../components/ui/button';
import styled from 'styled-components';
import CourseCard from '../components/CourseCard';

const PAGE_SIZE = 6;
const DEBOUNCE_MS = 400;

// Loader Animation (Adapted from provided Loader)
const StyledLoaderWrapper = styled.div`
  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    width: auto;
    margin: 2rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1.2em;
    font-weight: 600;
    user-select: none;
    color: #1f2937;
    scale: 1.5;
  }
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: transparent;
    mask: repeating-linear-gradient(90deg, transparent 0, transparent 6px, black 7px, black 8px);
  }
  .loader::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 50% 50%, #ff0 0%, transparent 50%),
      radial-gradient(circle at 45% 45%, #f00 0%, transparent 45%),
      radial-gradient(circle at 55% 55%, #0ff 0%, transparent 45%),
      radial-gradient(circle at 45% 55%, #0f0 0%, transparent 45%),
      radial-gradient(circle at 55% 45%, #00f 0%, transparent 45%);
    mask: radial-gradient(circle at 50% 50%, transparent 0%, transparent 10%, black 25%);
    animation: transform-animation 2s infinite alternate, opacity-animation 4s infinite;
    animation-timing-function: cubic-bezier(0.6, 0.8, 0.5, 1);
  }
  @keyframes transform-animation {
    0% { transform: translate(-55%); }
    100% { transform: translate(55%); }
  }
  @keyframes opacity-animation {
    0%, 100% { opacity: 0; }
    15% { opacity: 1; }
    65% { opacity: 0; }
  }
  .loader-letter {
    display: inline-block;
    opacity: 0;
    animation: loader-letter-anim 4s infinite linear;
    z-index: 2;
  }
  .loader-letter:nth-child(1) { animation-delay: 0.1s; }
  .loader-letter:nth-child(2) { animation-delay: 0.205s; }
  .loader-letter:nth-child(3) { animation-delay: 0.31s; }
  .loader-letter:nth-child(4) { animation-delay: 0.415s; }
  .loader-letter:nth-child(5) { animation-delay: 0.521s; }
  .loader-letter:nth-child(6) { animation-delay: 0.626s; }
  .loader-letter:nth-child(7) { animation-delay: 0.731s; }
  @keyframes loader-letter-anim {
    0% { opacity: 0; }
    5% { opacity: 1; text-shadow: 0 0 4px #4b5563; transform: scale(1.1) translateY(-2px); }
    20% { opacity: 0.2; }
    100% { opacity: 0; }
  }
`;

const CourseLoader = () => (
  <StyledLoaderWrapper>
    <div className="loader-wrapper">
      <span className="loader-letter">L</span>
      <span className="loader-letter">o</span>
      <span className="loader-letter">a</span>
      <span className="loader-letter">d</span>
      <span className="loader-letter">i</span>
      <span className="loader-letter">n</span>
      <span className="loader-letter">g</span>
      <div className="loader" />
    </div>
  </StyledLoaderWrapper>
);

// Gradient Border Card Style (Adapted from first Card animation)
const StyledStatCard = styled.div`
  .card {
    width: 100%;
    padding: 20px;
    color: #1f2937;
    background: linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(145deg, transparent 35%, #0a89a8, #252e31) border-box;
    border: 2px solid transparent;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .card:hover {
    rotate: -6deg;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  .card .main-content {
    flex: 1;
    text-align: center;
  }
  .card .header {
    font-weight: 600;
    color: #717171;
    margin-bottom: 1rem;
  }
  .card .heading {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    font-family: 'Poppins', sans-serif;
  }
  .card .footer {
    font-weight: 600;
    color: #717171;
    font-family: 'Noto Sans', sans-serif;
  }
`;

// Colorful Animated Card Style (Adapted from second Card animation)
const StyledTestimonialCard = styled.div`
  .card {
    width: 100%;
    height: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(0deg, #1f2937, #374151);
    border-radius: 10px;
    border: none;
    color: white;
    position: relative;
    cursor: pointer;
    font-weight: 600;
    transition-duration: 0.2s;
    font-family: 'Noto Sans', sans-serif;
  }
  .card:before, .card:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    border-radius: 10px;
    background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: steam 20s linear infinite;
  }
  @keyframes steam {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
  }
  .card:after {
    filter: blur(50px);
  }
  .card:hover {
    transform: scale(1.05);
  }
`;

const Homepage = () => {
  const [rawSearch, setRawSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchCategory, setSearchCategory] = useState('All Categories');
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [accumulatedCourses, setAccumulatedCourses] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref) {
      sessionStorage.setItem('referralCode', ref);
      navigate('/', { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const t = setTimeout(() => {
      const trimmed = rawSearch.trim();
      setSearchTerm(trimmed ? trimmed : null);
      setOffset(0);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [rawSearch]);

  const queryArgs = useMemo(() => ({
    offset,
    limit: PAGE_SIZE,
    search: searchTerm,
    categories: searchCategory !== 'All Categories' ? [searchCategory] : null,
  }), [offset, searchTerm, searchCategory]);

  const { data, isLoading, isFetching } = useGetCoursesQuery(queryArgs);

  useEffect(() => {
    setAccumulatedCourses([]);
    if (offset !== 0) setOffset(0);
  }, [searchTerm, searchCategory]);

  useEffect(() => {
    if (!data) return;
    const newPage = data.courses ?? [];
    if (offset === 0) {
      setAccumulatedCourses(newPage);
    } else {
      setAccumulatedCourses((prev) => {
        const prevIds = new Set(prev.map((c) => c.id));
        const toAppend = newPage.filter((c) => !prevIds.has(c.id));
        return [...prev, ...toAppend];
      });
    }
  }, [data, offset]);

  const loadMore = () => {
    if (isFetching) return;
    setOffset((prev) => prev + PAGE_SIZE);
  };

  const courses = accumulatedCourses;
  const categories = ['All Categories', ...(data?.categories ?? [])];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-poppins">
                Master Affiliate Marketing. <span className="text-yellow-300">Earn Big.</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100 font-noto-sans">
                Learn from top experts and earn up to 70% commission by sharing courses with your network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => navigate('/course-page')}
                  variant="secondary"
                  size="lg"
                  className="shadow-lg bg-white text-blue-600 hover:bg-gray-100"
                >
                  <BookOpen className="w-5 h-5 mr-2 icon-3d" />
                  Browse Courses
                </Button>
                <Button
                  onClick={() => navigate('/how-it-works')}
                  variant="default"
                  size="lg"
                  className="shadow-lg bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Learn About Referrals
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-3242-large.mp4"
                    poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm sm:text-base font-medium font-noto-sans">
                      Discover Affiliate Marketing Success
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <StyledStatCard>
              <div className="card">
                <div className="main-content">
                  <div className="header">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  </div>
                  <p className="heading">500+</p>
                  <div className="footer">Affiliate Marketers</div>
                </div>
              </div>
            </StyledStatCard>
            <StyledStatCard>
              <div className="card">
                <div className="main-content">
                  <div className="header">
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  </div>
                  <p className="heading">25+</p>
                  <div className="footer">Marketing Experts</div>
                </div>
              </div>
            </StyledStatCard>
            <StyledStatCard>
              <div className="card">
                <div className="main-content">
                  <div className="header">
                    <Star className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  </div>
                  <p className="heading">4.8/5</p>
                  <div className="footer">Average Rating</div>
                </div>
              </div>
            </StyledStatCard>
            <StyledStatCard>
              <div className="card">
                <div className="main-content">
                  <div className="header">
                    <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
                  </div>
                  <p className="heading">Up to 70%</p>
                  <div className="footer">Commission Rate</div>
                </div>
              </div>
            </StyledStatCard>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Why Choose Our Affiliate Marketing Academy?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-noto-sans">
              Unlock your potential with top-tier courses and a lucrative referral program.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CheckCircle className="w-8 h-8 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-poppins">Expert-Led Courses</h3>
              <p className="text-sm sm:text-base text-gray-600 font-noto-sans">
                Learn from industry leaders with proven affiliate marketing strategies.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-poppins">High Commissions</h3>
              <p className="text-sm sm:text-base text-gray-600 font-noto-sans">
                Earn 50%–70% on direct referrals plus 5%–10% on sub-referrals.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Clock className="w-8 h-8 text-purple-600 mb-4 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-poppins">Real-Time Tracking</h3>
              <p className="text-sm sm:text-base text-gray-600 font-noto-sans">
                Monitor your referrals and earnings with instant analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              What Our Students Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-noto-sans">
              Hear from real learners who’ve succeeded with our courses and referral program.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <StyledTestimonialCard>
              <div className="card">
                <Quote className="w-6 h-6 text-white/80 mb-4" />
                <p className="text-sm sm:text-base text-center mb-4">
                  “This platform transformed my affiliate marketing skills and helped me earn ₹15,000 in just two months!”
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white/80">— Priya S., Affiliate Marketer</p>
              </div>
            </StyledTestimonialCard>
            <StyledTestimonialCard>
              <div className="card">
                <Quote className="w-6 h-6 text-white/80 mb-4" />
                <p className="text-sm sm:text-base text-center mb-4">
                  “The courses are top-notch, and the referral program is a game-changer. I’ve earned bonuses consistently!”
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white/80">— Arjun K., Digital Entrepreneur</p>
              </div>
            </StyledTestimonialCard>
            <StyledTestimonialCard>
              <div className="card">
                <Quote className="w-6 h-6 text-white/80 mb-4" />
                <p className="text-sm sm:text-base text-center mb-4">
                  “Real-time tracking made it easy to see my progress. I highly recommend this academy!”
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white/80">— Neha R., Content Creator</p>
              </div>
            </StyledTestimonialCard>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Featured Courses
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-noto-sans">
              {searchTerm || searchCategory !== 'All Categories'
                ? `Showing ${courses.length} results`
                : 'Top-rated courses from expert instructors'}
            </p>
          </div>
          {isLoading || isFetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <CourseLoader key={i} />
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
                  <p className="text-gray-500 text-base sm:text-lg font-noto-sans">
                    No courses found matching your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setRawSearch('');
                      setSearchCategory('All Categories');
                      setOffset(0);
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium font-noto-sans"
                  >
                    Clear filters
                  </button>
                </div>
              )}
              {data && (data.courses?.length ?? 0) >= PAGE_SIZE && (
                <div className="text-center mt-8">
                  <Button
                    onClick={loadMore}
                    disabled={isFetching}
                    variant="default"
                    size="lg"
                    className="shadow-lg bg-blue-600 hover:bg-blue-700"
                  >
                    {isFetching ? 'Loading...' : 'View More'}
                  </Button>
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