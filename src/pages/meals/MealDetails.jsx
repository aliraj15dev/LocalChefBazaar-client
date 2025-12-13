import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const [reviewData, setReviewData] = useState({
    reviewerName: "",
    reviewerImage: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {

    fetch(`http://localhost:3000/dailymeals/${id}`)
      .then(res => res.json())
      .then(data => {
        setMeal(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      foodId: id,
      reviewerName: reviewData.reviewerName,
      reviewerImage: reviewData.reviewerImage,
      rating: parseInt(reviewData.rating),
      comment: reviewData.comment,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then(res => res.json())
      .then(() => {
        setReviews([...reviews, newReview]);
        Swal.fire("Success!", "Review submitted successfully!", "success");
        setReviewData({
          reviewerName: "",
          reviewerImage: "",
          rating: 5,
          comment: "",
        });
      });
  };

  const handleFavorite = () => {
    const favoriteData = {
      userEmail: "user@example.com",
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
    };

    fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favoriteData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire("Added!", "Meal added to favorites ❤️", "success");
        } else {
          Swal.fire("Oops!", "Already in favorite!", "info");
        }
      });
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg p-6 rounded-lg">
        <div className="md:w-1/2">
          <img src={meal.foodImage} className="w-full h-64 object-cover rounded-lg" />
        </div>

        <div className="md:w-1/2 space-y-3">
          <h2 className="text-3xl font-bold">{meal.foodName}</h2>
          <p>👨‍🍳 Chef: {meal.chefName} (ID: {meal.chefId})</p>
          <p className="text-lg font-semibold">Price: ৳{meal.price}</p>

          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar /> <span>{meal.rating}</span>
          </div>

          <p><b>Ingredients:</b> {meal.ingredients.join(", ")}</p>
          <p><b>Delivery Area:</b> {meal.deliveryArea}</p>
          <p><b>Estimated Delivery:</b> {meal.estimatedDeliveryTime}</p>
          <p><b>Chef Experience:</b> {meal.chefExperience}</p>

          <button
            onClick={() => navigate(`/order/${meal._id}`, { state: meal })}
            className="btn btn-primary w-full mt-3"
          >
            Order Now
          </button>

          <button onClick={handleFavorite} className="btn btn-outline w-full mt-2">
            ❤️ Add to Favorite
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>

        {reviews.map((review, index) => (
          <div key={index} className="border p-4 rounded mb-3">
            <div className="flex items-center gap-3">
              <img src={review.reviewerImage} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold">{review.reviewerName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="mt-2 text-yellow-500">⭐ {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}

        <form onSubmit={handleReviewSubmit} className="space-y-3 mt-6">
          <input className="input input-bordered w-full" placeholder="Your Name"
            value={reviewData.reviewerName}
            onChange={(e) => setReviewData({ ...reviewData, reviewerName: e.target.value })} required />

          <input className="input input-bordered w-full" placeholder="Your Image URL"
            value={reviewData.reviewerImage}
            onChange={(e) => setReviewData({ ...reviewData, reviewerImage: e.target.value })} required />

          <select className="select select-bordered w-full"
            value={reviewData.rating}
            onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}>
            <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
          </select>

          <textarea className="textarea textarea-bordered w-full" placeholder="Write your review..."
            value={reviewData.comment}
            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} required />

          <button type="submit" className="btn btn-primary w-full">Give Review</button>
        </form>
      </div>
    </div>
  );
};

export default MealDetails;
