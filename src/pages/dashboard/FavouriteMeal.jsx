import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FavouriteMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/favourite-meals")
      .then((res) => {
        setFavourites(res.data);
      })
      .catch((err) => {
        console.error("Reviews fetch error:", err);
      });
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-4xl font-bold text-secondary mb-10">
        Favourite Meals {favourites.length}
      </h2>

      {favourites.length === 0 ? (
        <p className="text-center text-gray-500">
          No favourite meals added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((meal) => (
            <div
              key={meal._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
            >
              {/* Meal Name */}
              <h3 className="text-xl font-semibold mb-2">
                {meal.mealName}
              </h3>

              {/* Chef Info */}
              <p className="text-gray-600 mb-1">
                👩‍🍳 Chef:{" "}
                <span className="font-medium">{meal.chefName}</span>
              </p>

              {/* Price */}
              <p className="text-gray-600 mb-3">
                💰 Price:{" "}
                <span className="font-semibold text-secondary">
                  ৳{meal.price}
                </span>
              </p>

              {/* Added Date */}
              <p className="text-sm text-gray-400 mb-4">
                Added on:{" "}
                {new Date(meal.addedTime).toLocaleDateString()}
              </p>

              {/* Action Button */}
              <button className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-opacity-90 transition">
                Order Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteMeal;
