import {
  useGetCourseReviewsQuery,
  useAddCourseReviewMutation,
} from "../ReduxStore/features/api/courseReviews";
import { Star } from "lucide-react";
import { useState } from "react";
import type { ReviewsResponse, Review } from "../ReduxStore/features/api/courseReviews";
import { toast } from "@/components/ui/use-toast"; 

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  userName,
  initial,
  rating,
  comment,
}: {
  userName: string;
  initial: string;
  rating: number;
  comment?: string;
}) {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <div className="flex items-center space-x-4 mb-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
          {initial}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{userName}</p>
          <StarRating rating={rating} />
        </div>
      </div>
      {comment && <p className="text-gray-700">{comment}</p>}
    </div>
  );
}

export default function CourseReviewsSection({
  courseId,
  userId,
}: {
  courseId: string;
  userId?: string | null;
}) {
  const { data, isLoading } = useGetCourseReviewsQuery(
    { courseId, userId },
  );

const [addReview, { isLoading: reviewAdding, isSuccess }] = useAddCourseReviewMutation();

const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const handleSubmit = async () => {
    if (!userId) return alert("Login required");
    if (!rating) return alert("Please select a rating");

    try {
      await addReview({ userId, courseId, rating, comment }).unwrap();

      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback 🎉",
      });

      setRating(0);
      setComment("");
    } catch (err) {
      toast({
        title: "Failed",
        description: "Something went wrong ❌",
      });
    }
  };

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  const reviewStatus = data?.reviewStatus ?? "no_user";
  const userReview = data?.userReview ?? null;

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Student Reviews
      </h2>

{/* Rating Summary */}
{typeof data?.averageRating === "number" && (
  <div className="flex items-center mb-6">
    <StarRating rating={Math.round(data.averageRating)} />
    <span className="ml-2 text-gray-700">
      {data.averageRating.toFixed(1)} / 5 · {data.totalReviews} reviews
    </span>
  </div>
)}


      {/* Reviews list */}
      <div className="space-y-6">
        {data?.reviews?.length > 0 ? (
          data.reviews.map((r: Review) => (
            <ReviewCard
              key={r.id}
              userName={r.userName || "Anonymous"}
              initial={r.userName?.[0] || "U"}
              rating={r.rating}
              comment={r.comment}
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        )}
      </div>

      {/* Input / Own Review Section */}
      {reviewStatus === "no_user" ? null : reviewStatus === "not_reviewed" ? (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Leave a Review
          </h3>
          <div className="flex items-center mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                onClick={() => setRating(i)}
                className={`w-6 h-6 cursor-pointer ${
                  i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border border-gray-300 rounded-md p-2 mb-3"
          />
            <button
                onClick={handleSubmit}
                disabled={reviewAdding}
                className={`px-4 py-2 rounded-md text-white ${
                reviewAdding
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {reviewAdding ? "Sending..." : "Submit Review"}
            </button>
        </div>
      ) : (
        userReview && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your Review
            </h3>
            <ReviewCard
              userName={userReview.userName || "You"}
              initial={userReview.userName?.[0] || "U"}
              rating={userReview.rating}
              comment={userReview.comment}
            />
          </div>
        )
      )}
    </div>
  );
}
