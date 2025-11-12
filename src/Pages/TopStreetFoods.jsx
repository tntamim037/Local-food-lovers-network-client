import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const TopStreetFoods = () => {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    fetch("http://localhost:3000/street-food")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching street foods:", err)
        setLoading(false)
      })
  }, [])

  if (loading)
    return <LoadingSpinner></LoadingSpinner>

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-6">
        Top Street Foods
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food.foodName} 
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-2xl text-amber-600 mb-1">
                {food.foodName} 
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                <strong>{food.location}</strong>
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Reviewed by:</strong> {food.reviewerName}
              </p>
              <p className="text-sm text-yellow-500 mb-2">
                {"⭐".repeat(food.rating)}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Description:</strong> {food.reviewText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopStreetFoods;
