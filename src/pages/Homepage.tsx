
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

  const categories = ['All Categories', 'Trading'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master Trading. Share Knowledge. <span className="text-yellow-300">Earn Big.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Learn trading from experts and earn 50% direct + 10% second-level commission by referring others
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onPageChange('courses')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Browse Trading Courses</span>
              </button>
              <button
                onClick={() => onPageChange('referral-program')}
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Learn About Referrals
              </button>
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
              <h3 className="text-3xl font-bold text-gray-900">25,000+</h3>
              <p className="text-gray-600">Trading Students</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Trading Experts</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Trading Course</h2>
            <p className="text-gray-600">Search through our comprehensive trading course library</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
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

      {/* Referral Program Highlight */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Earn While You Learn
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Share trading courses and earn 50% direct + 10% second-level commission + ₹500 bonus every 5 referrals
          </p>
          <div className="bg-white text-gray-900 p-6 rounded-lg max-w-2xl mx-auto mb-8">
            <div className="text-3xl font-bold text-green-600 mb-2">Commission Examples:</div>
            <div className="space-y-2 text-lg">
              <p>₹999 course → <span className="font-bold text-green-600">₹499</span> direct + <span className="font-bold text-blue-600">₹99</span> from sub-referrals</p>
              <p>₹5000 course → <span className="font-bold text-green-600">₹2500</span> direct + <span className="font-bold text-blue-600">₹500</span> from sub-referrals</p>
              <p>₹10000 course → <span className="font-bold text-green-600">₹5000</span> direct + <span className="font-bold text-blue-600">₹1000</span> from sub-referrals</p>
            </div>
          </div>
          <button
            onClick={() => onPageChange('referral-program')}
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Learn More About Referrals
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
