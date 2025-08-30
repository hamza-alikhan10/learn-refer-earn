
import React from 'react';
import { Star, Users, Clock, Share2, Eye, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '@/ReduxStore/hooks';
import { useLazyGetReferralDataQuery } from '@/ReduxStore/features/api/referralModelData';
import {
  setIsOpen,
  setCourseData,
  setReferralData,
} from '@/ReduxStore/features/slices/referralModelData';

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
}

// Helper function to fetch referral + course data
const fetchReferralData = async (
  courseId: string,
  userId: string,
  trigger: any,
  dispatch: any
) => {
  try {
    // Call RTK Query endpoint
    const result = await trigger({ courseId, userId }).unwrap();

    // Save course + referral in Redux
    dispatch(setCourseData(result.course));
    dispatch(setReferralData(result.referral));

    // Open modal
    dispatch(setIsOpen(true));
  } catch (err) {
    console.error("Failed to fetch referral data", err);
  }
};

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
}) => {

    const navigate = useNavigate();  
    const dispatch = useAppDispatch();
    const { userId } = useAppSelector((state) => state.auth); 
    
    const handleView = () => {
    const url = userId 
      ? `/courses/${course.id}?userId=${userId}` 
      : `/courses/${course.id}`;
    navigate(url);
  }; 
  
  const [trigger, { isLoading:referralModelLoading }] = useLazyGetReferralDataQuery();

  const handleOpenReferralModal = () => {
    if (!userId) {
      console.warn("User not logged in!");
      return;
    }
    fetchReferralData(course.id, userId, trigger, dispatch);
  };


  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden card-hover border border-border">
      <div className="relative group">
        <img
          src={`https://csfrwmlgvlznrbcqcveo.supabase.co/storage/v1/object/public/learn-refer-earn/images/${course.image}`}
          alt={course.title}
          className="w-full h-48 sm:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            ₹{course.price}
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <div className="bg-card/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
            <BookOpen className="w-5 h-5 text-primary icon-3d" />
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium px-3 py-1 bg-accent/20 text-accent rounded-full">
            {course.category}
          </span>
          <div className="flex items-center space-x-1 bg-warning/10 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-warning fill-current icon-3d" />
            <span className="text-sm font-medium text-warning">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2 line-clamp-2 leading-tight">
          {course.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
          {course.description}
        </p>
        
        <p className="text-sm text-muted-foreground mb-4">
          by <span className="font-semibold text-card-foreground">{course.instructor}</span>
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-muted-foreground mb-6">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 icon-3d" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 icon-3d" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleView}
            className="flex-1 group"
            size="touch"
          >
            <Eye className="w-4 h-4 mr-2 icon-3d" />
            View Details
          </Button>
          
          {userId && (
            <div className="space-y-2">
            <Button
              onClick={handleOpenReferralModal}
              disabled={referralModelLoading}
              variant="accent"
              size="touch"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
              title={`Refer Course & Earn ₹${Math.floor(course.price * 0.5)}`}
            >
              {referralModelLoading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              ) : (
                <>
                  <Share2 className="w-4 h-4 mr-2 icon-3d" />
                  <span>Refer & Earn</span>
                </>
              )}
            </Button>
              <p className="text-center text-sm font-semibold text-green-600">
                Earn ₹{Math.floor(course.price * 0.5)} per referral
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
