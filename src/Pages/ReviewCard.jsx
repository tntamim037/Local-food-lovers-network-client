import React from "react";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform">
      <img
        src={review.foodImage}
        alt={review.foodName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-amber-600 mb-1">
          {review.foodName}
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          {review.restaurantName}, {review.restaurantLocation}
        </p>
        <p className="text-sm text-gray-700 mb-1">
          Reviewed by: {review.reviewerName}
        </p>
        <p className="text-sm text-yellow-500 mb-2">
          {"⭐".repeat(review.rating)}
        </p>
        <Link
          to={`/reviews/${review._id}`}
          className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
