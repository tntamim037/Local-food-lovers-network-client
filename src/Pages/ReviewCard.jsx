import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { BiHeart } from "react-icons/bi";

const ReviewCard = ({ review , showFavorite = false}) => {
   const { user } = useContext(AuthContext)
  const [liked, setLiked] = useState(false)

  const handleFavorite = async () => {
  if (!user) return toast.error("Please log in to add favorites ⚠️")

  const favoriteData = {
    userEmail: user.email,
    reviewId: review._id,
    foodName: review.foodName,
    foodImage: review.foodImage,
    restaurantName: review.restaurantName,
    restaurantLocation: review.location,
    rating: review.rating,
    reviewText: review.reviewText,
  }

  const res = await fetch("http://localhost:3000/favorites", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
   body: JSON.stringify(favoriteData),
 })

  const data = await res.json();

  if (data.success) {
    setLiked(true);  
    toast.success("Added to favorites ❤️");
  } else {
    toast.error(data.message || "Something went wrong!");
  }
}

 return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform">
      <img
        src={review.foodImage}
        alt={review.foodName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-lg text-amber-600">
            {review.foodName}
          </h3>
          {showFavorite && (
            <BiHeart
              size={24}
              className={`cursor-pointer ${liked ? "text-red-500" : "text-gray-300"}`}
              onClick={handleFavorite}
            />
          )}
        </div>

        <p className="text-sm text-gray-500 mb-1">
          {review.restaurantName}, {review.restaurantLocation}
        </p>
        <p className="text-sm  text-gray-500 mb-1">
           <strong>{review.location}</strong>
        </p>
        <p className="text-sm text-gray-700 mb-1">
          Reviewed by: {review.reviewerName}
        </p>
        <p className="text-sm text-yellow-500 mb-2">
          {"⭐".repeat(review.rating)}
        </p>
        <Link
          to={`/reviews/${review._id.toString()}`}
          className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ReviewCard;
