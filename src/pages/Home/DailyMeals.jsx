import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DailyMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure.get("dailymeals")
      .then(res => {
        setMeals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Daily meals fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-14 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-secondary">
            🍽️ Today’s Popular Meals
          </h2>
          <p className="text-gray-600 mt-2">
            Freshly cooked homemade meals by our talented local chefs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.slice(0, 6).map((meal) => (
            <div key={meal._id} className="card bg-white shadow-lg hover:shadow-2xl transition">

              <figure className="h-52 overflow-hidden">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-lg font-bold">
                  {meal.foodName}
                </h2>

                <div className="flex justify-between text-sm text-gray-600">
                  <p>👨‍🍳 {meal.chefName}</p>
                  <p>🆔 {meal.chefId}</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-semibold text-primary">
                    ৳{meal.price}
                  </p>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar />
                    <span className="text-sm text-gray-700">
                      {meal.rating}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/MealDetails/${meal._id}`}
                    className="btn btn-primary btn-sm w-full"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyMeals;
