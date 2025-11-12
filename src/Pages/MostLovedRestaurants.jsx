import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const MostLovedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/restaurant") 
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err)
        setLoading(false)
      })
  }, [])

  if (loading)
    return <LoadingSpinner></LoadingSpinner>

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-6">
        Most Loved Restaurants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((res) => (
          <div
            key={res._id || res.restaurantName}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={res.restaurantImage}
              alt={res.restaurantName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-amber-600 mb-1">
                {res.restaurantName}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                
                 {res.location}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                Reviewed by: {res.reviewerName}
              </p>
              <p className="text-sm text-yellow-500 mb-2">
                {"⭐".repeat(res.rating || 0)}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Description:</strong> {res.reviewText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostLovedRestaurants;
