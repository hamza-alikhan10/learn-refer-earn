
import React from 'react';
import { Star, Users, Clock, CheckCircle, User, Award, Play, Share2 } from 'lucide-react';
import { mockCourses } from '../data/mockData';

interface CourseDetailsPageProps {
  courseId: string;
  user: any;
  onReferCourse?: (courseId: string) => void;
  onPurchase: (courseId: string) => void;
}

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ 
  courseId, 
  user, 
  onReferCourse, 
  onPurchase 
}) => {
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium mb-4">
                <span>{course.category}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                  <span className="text-gray-500">({course.students.toLocaleString()} students)</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Created by <span className="font-semibold">{course.instructor}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://images.unsplash.com/${course.image}`}
                alt={course.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.curriculum.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
              <div className="space-y-6">
                {course.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${course.price}
                </div>
                <p className="text-gray-600">Full lifetime access</p>
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => onPurchase(course.id)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Enroll Now</span>
                </button>

                {user && onReferCourse && (
                  <button
                    onClick={() => onReferCourse(course.id)}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Refer & Earn ${Math.round(course.price * 0.6)}</span>
                  </button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">This course includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{course.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Full lifetime access</span>
                  </div>
                </div>
              </div>

              {user && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Referral Earnings</h4>
                    <p className="text-sm text-green-700 mb-2">
                      Earn <span className="font-bold">${Math.round(course.price * 0.6)}</span> for each successful referral!
                    </p>
                    <p className="text-xs text-green-600">
                      That's 60% of the course price per referral
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
