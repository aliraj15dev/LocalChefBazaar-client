import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/reviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("Reviews fetch error:", err);
      });
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-4xl font-bold text-secondary mb-10">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.user_photoURL}
                alt={review.userName}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="font-semibold text-lg">
                  {review.userName}
                </h4>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl">
                  {i < review.rating ? "⭐" : "☆"}
                </span>
              ))}
            </div>

            <p className="text-gray-700 italic">
              “{review.review}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
