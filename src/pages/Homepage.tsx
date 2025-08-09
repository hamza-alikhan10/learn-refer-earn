import React, { useState } from 'react';
import { Search, Star, TrendingUp, Users, Award } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { mockCourses } from '../data/mockData';

interface HomepageProps {
  onPageChange: (page: string, courseId?: string) => void;
  onReferCourse?: (courseId: string) => void;
  user: any;
}

const Homepage: React.FC<HomepageProps> = ({ onPageChange, onReferCourse, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('All Categories');

  const featuredCourses = mockCourses.slice(0, 6);

  const filteredCourses = featuredCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = searchCategory === 'All Categories' || course.category === searchCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All Categories', 'Affiliate Marketing'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master Affiliate Marketing. Share Knowledge. <span className="text-yellow-300">Earn Big.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Learn affiliate marketing from experts and earn 50% commission by referring others
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => onPageChange('courses')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Browse Affiliate Marketing Courses</span>
                </button>
                <button
                  onClick={() => onPageChange('referral-program')}
                  className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Learn About Referrals
                </button>
              </div>
            </div>
            
            {/* MT5 Algo Trading Video */}
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
                    <p className="text-sm font-medium mb-1">Live Affiliate Dashboard</p>
                    <p className="text-xs opacity-90">See real affiliate marketing earnings</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    LIVE
                  </div>
                </div>
                <p className="text-center text-white/80 text-sm mt-3">
                  🚀 Watch real affiliate marketers generate profits in real-time
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Affiliate Marketing Course</h2>
            <p className="text-gray-600">Search through our comprehensive affiliate marketing course library</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search affiliate marketing courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-gray-600">
              {searchTerm || searchCategory !== 'All Categories' 
                ? `Showing ${filteredCourses.length} results`
                : 'Top-rated courses from expert instructors'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={(courseId) => onPageChange('course-details', courseId)}
                onReferCourse={onReferCourse}
                showReferButton={!!user}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSearchCategory('All Categories');
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

    
    </div>
  );
};

export default Homepage;