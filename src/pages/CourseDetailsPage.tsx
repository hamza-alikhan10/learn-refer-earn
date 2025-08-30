import React, { useEffect, useRef, useState } from "react";
import { useCoursePayment } from "@/lib/handleTransection";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  Users,
  Clock,
  CheckCircle,
  User,
  Award,
  Play,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAppSelector, useAppDispatch } from "@/ReduxStore/hooks";
import { useLazyGetReferralDataQuery } from "@/ReduxStore/features/api/referralModelData";
import {
  setIsOpen,
  setCourseData,
  setReferralData,
} from "@/ReduxStore/features/slices/referralModelData";

import { useGetCourseByIdQuery, useGetCourseVideosQuery } from "@/ReduxStore/features/api/courseDetails";
import CourseReviewsSection from "@/components/CourseReviewsSection";
import { setIsAuthModelOpen } from "@/ReduxStore/features/slices/auth";

type CourseType = {
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
};

type CourseResponse = {
  course: CourseType;
  visitorType: string;
  isEnrolled: boolean;
};

type CourseVideosResponse = {
  videos: { path: string; url: string }[];
  visitorType: string;
  isEnrolled: boolean;
};

const fetchReferralData = async (
  courseId: string,
  userId: string,
  trigger: any,
  dispatch: any
) => {
  try {
    const result = await trigger({ courseId, userId }).unwrap();

    dispatch(setCourseData(result.course));
    dispatch(setReferralData(result.referral));
    dispatch(setIsOpen(true));
  } catch (err) {
    console.error("Failed to fetch referral data", err);
  }
};

const CourseDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // redux user id (rename locally to avoid collision)
  const { userId: reduxUserId } = useAppSelector((s) => s.auth);
  const queryParams = new URLSearchParams(location.search);
  const queryUserId = queryParams.get("userId") ?? undefined;
  const effectiveUserId = (queryUserId || reduxUserId) ?? undefined;

  const { id } = useParams<{ id: string }>();

  const { startCoursePayment, orderCreating, paymentVerifying } = useCoursePayment();

  // referral lazy trigger
  const [triggerReferral, { isLoading: referralModelLoading }] = useLazyGetReferralDataQuery();

  // local state for video urls & flow control
  const [videoUrls, setVideoUrls] = useState<string[] | null>(null);
  const [isProcessHappening, setIsProcessHappening] = useState<boolean>(false);
  const [shouldFetchVideos, setShouldFetchVideos] = useState<boolean>(false);
  const [latestVideosResponse, setLatestVideosResponse] = useState<CourseVideosResponse | null>(null);

  // 1) lightweight course data (drives CTA)
  const {
    data,
    isLoading: isCourseLoading,
    isError: isCourseError,
    refetch: refetchCourse,
  } = useGetCourseByIdQuery(
    { id: id!, userId: effectiveUserId },
    { skip: !id } // skip if no id
  );

  // 2) videos query (hook called at top-level, toggled by skip)
  const {
    data: videosData,
    isLoading: vedioloading,
    isError: videosError,
  } = useGetCourseVideosQuery(
    { id: id!, userId: effectiveUserId ?? "" }, // pass empty string when undefined to match your API's signature
    { skip: !shouldFetchVideos || !effectiveUserId } // skip on initial render or when no user
  );

  // compute enrolled state from either course endpoint or videos response
  const isUserEnrolled =
    videosData?.visitorType === "enrolled" ||
    videosData?.isEnrolled ||
    data?.visitorType === "enrolled" ||
    data?.isEnrolled;

  // Handler to start learning — toggles shouldFetchVideos to let the hook actually run
  const handleStartLearningClick = async () => {
    if (!effectiveUserId) {
      // not logged in — open auth modal or navigate
      dispatch(setIsAuthModelOpen(true));
      navigate("/");
      return;
    }

    // set flag so useGetCourseVideosQuery runs (hook will perform the request because skip becomes false)
    setShouldFetchVideos(true);
    // side-effects to update videoUrls handled by effect watching `videosData`
  };

  // When videosData arrives, store urls and stop process indicator
  useEffect(() => {
    if (videosData?.videos) {
      setVideoUrls(videosData.videos.map((v) => v.url));
    }
    // if the hook finished (either success or error), we stop the process indicator
    if (videosError) {
      console.error("Failed to load videos", videosError);
    }
  }, [videosData, vedioloading, videosError]);

  // When payment verification finishes -> wait 5s then fetch videos & refetch course
  const prevVerifyingRef = useRef(false);
  useEffect(() => {
    const currentlyVerifying = paymentVerifying;

    if (prevVerifyingRef.current && !currentlyVerifying) {
      // verification finished
      setIsProcessHappening(true);

      const timer = setTimeout(async () => {
        try {
          if (effectiveUserId) {
            // set flag so videos hook runs
            setShouldFetchVideos(true);
            // refetch lightweight course data
            refetchCourse();
            setIsProcessHappening(false);
          }
        } catch (err) {
          console.error("post-verify fetch failed", err);
        } finally {
          // leave small grace time for the UI; videos effect will reset this as soon as request completes
          // keep isProcessHappening true until videos request clears it in the videos effect above
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }

    prevVerifyingRef.current = currentlyVerifying;
  }, [paymentVerifying, id, effectiveUserId, refetchCourse]);

  // Referral modal opener
  const handleOpenReferralModal = () => {
    if (!reduxUserId) {
      console.warn("User not logged in!");
      dispatch(setIsAuthModelOpen(true));
      return;
    }
    // triggerReferral is the lazy query trigger returned from useLazyGetReferralDataQuery
    fetchReferralData(id!, reduxUserId, triggerReferral, dispatch);
  };

  if (isCourseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  if (isCourseError || !data?.course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Course not found.</p>
      </div>
    );
  }

  console.log("New vedio fethch data", videoUrls);

  const { course, visitorType } = data;

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
                  <span className="text-gray-500">
                    ({course.total_students.toLocaleString()} students)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6">{course.description}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>
                    Created by{" "}
                    <span className="font-semibold">{course.instructor}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{course.total_students.toLocaleString()} students</span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {videoUrls && videoUrls.length > 0 ? (
                  <video
                    src={videoUrls[0]}
                    controls
                    autoPlay
                    className="w-full h-64 md:h-96 object-cover"
                  />
                ) : (
                  <img
                    src={`https://csfrwmlgvlznrbcqcveo.supabase.co/storage/v1/object/public/learn-refer-earn/images/${course.image_url}`}
                    alt={course.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                )}
              </div>
            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.curriculum.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <CourseReviewsSection courseId={data.course.id} userId={effectiveUserId} />

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ₹{course.price}
                </div>
                <p className="text-gray-600">Full lifetime access</p>
              </div>

              <div className="space-y-4 mb-6">
         <div className="space-y-4 mb-6">
        {/* CTA logic:
            - when process happening -> show finalizing message
            - else if user is enrolled -> show Start Learning button (clicking triggers videos fetch)
            - else -> show Enroll Now button
        */}
        {isProcessHappening ? (
          <div className="w-full py-3 px-6 rounded-lg bg-yellow-100 text-yellow-800 text-center">
            Finalizing enrollment — please wait...
          </div>
        ) : isUserEnrolled ? (
          <button
            onClick={handleStartLearningClick}
            disabled={vedioloading || isProcessHappening}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>{vedioloading ? "Loading..." : "Start Learning"}</span>
          </button>
        ) : (
          <button
            onClick={() =>
              effectiveUserId
                ? startCoursePayment(effectiveUserId, course.id, course.price)
                : (navigate("/"), dispatch(setIsAuthModelOpen(true)))
            }
            disabled={orderCreating}
            className={`w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              orderCreating || paymentVerifying ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {orderCreating || paymentVerifying ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            <span>{orderCreating || paymentVerifying ? "Processing..." : "Enroll Now"}</span>
          </button>
        )}

        {/* Referral button & info */}
        {effectiveUserId && (
          <div className="space-y-3">
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
              Earn ₹{Math.floor(course.price * 0.5)} on referral
            </p>
          </div>
        )}
      </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  This course includes:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">
                      {course.duration} on-demand video
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">
                      Certificate of completion
                    </span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
