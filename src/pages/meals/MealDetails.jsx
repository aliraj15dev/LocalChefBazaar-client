import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/DailyMeals/${id}`)
      .then(res => res.json())
      .then(data => {
        setMeal(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Meal fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!meal) {
    return <div className="text-center py-20 text-red-500">Meal not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg p-6 rounded-lg">

        <div className="md:w-1/2">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="md:w-1/2 space-y-3">
          <h2 className="text-3xl font-bold text-secondary">{meal.foodName}</h2>
          <p className="text-gray-600">👨‍🍳 Chef: {meal.chefName} (ID: {meal.chefId})</p>
          <p className="text-lg font-semibold text-primary">Price: ৳{meal.price}</p>

          <div className="flex items-center gap-2 text-yellow-500">
            <FaStar />
            <span>{meal.rating}</span>
          </div>

          <p><span className="font-semibold">Ingredients:</span> {meal.ingredients.join(", ")}</p>
          <p><span className="font-semibold">Delivery Area:</span> {meal.deliveryArea}</p>
          <p><span className="font-semibold">Estimated Delivery:</span> {meal.estimatedDeliveryTime}</p>
          <p><span className="font-semibold">Chef Experience:</span> {meal.chefExperience}</p>

          <button className="btn btn-primary mt-4 w-full">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
