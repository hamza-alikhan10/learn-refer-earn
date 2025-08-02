
import React from 'react';
import { Star, Users, Clock, Share2 } from 'lucide-react';

interface Course {
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
}

interface CourseCardProps {
  course: Course;
  onViewDetails: (courseId: string) => void;
  onReferCourse?: (courseId: string) => void;
  showReferButton?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onViewDetails, 
  onReferCourse, 
  showReferButton = false 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={`https://images.unsplash.com/${course.image}`}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
          ${course.price}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{course.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <p className="text-sm text-gray-700 mb-4">
          by <span className="font-semibold">{course.instructor}</span>
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(course.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            View Details
          </button>
          
          {showReferButton && onReferCourse && (
            <button
              onClick={() => onReferCourse(course.id)}
              className="flex items-center justify-center bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
              title="Refer Course"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
