import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews?email=${user.email}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to fetch user reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user?.email, axiosSecure]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return <p className="text-center text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">📝 My Reviews</h2>

      {reviews.map((review) => (
        <div key={review._id} className="bg-white shadow-lg p-5 rounded-lg">
          <div className="flex items-center gap-3">
            <img
              src={review.reviewerImage}
              alt={review.reviewerName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{review.reviewerName}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <p className="mt-2 flex items-center text-yellow-500">
            <FaStar className="mr-1" /> {review.rating}
          </p>

          <p className="mt-2">{review.comment}</p>

          <p className="mt-2 text-sm text-gray-400">Food ID: {review.foodId}</p>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
