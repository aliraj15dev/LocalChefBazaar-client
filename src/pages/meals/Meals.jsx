import { useEffect, useState } from "react";
import { Link } from "react-router";

const Meals = () => {

  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:3000/DailyMeals")
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, []);

  const sortedMeals = [...meals].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Daily Meals</h2>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="btn btn-outline"
        >
          Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMeals.map((meal) => (
          <div key={meal._id} className="card bg-white shadow-lg">
            <img
              src={meal.foodImage}
              className="h-52 w-full object-cover"
              alt=""
            />

            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{meal.foodName}</h3>

              <p className="text-sm">👨‍🍳 Chef: {meal.chefName}</p>
              <p className="text-sm">🆔 Chef ID: {meal.chefId}</p>

              <div className="flex justify-between">
                <p className="font-bold text-primary">৳ {meal.price}</p>
                <p>⭐ Rating: {meal.rating}</p>
              </div>

              <p>📍 Area: {meal.deliveryArea}</p>

              <Link to={`/MealDetails/${meal._id}`}
                className="btn btn-primary w-full mt-3"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
