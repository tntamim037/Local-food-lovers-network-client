import React from "react";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedReviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <LoadingSpinner></LoadingSpinner>
  }
  const topsix = reviews.slice(0, 6);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-600">
          Featured Reviews
        </h2>
        <Link
          to="/all-reviews"
          className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white"
        >
          Show All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topsix.map((review) => (
          <ReviewCard key={review._id} review={review} />
        
        ))}
      </div>
    </section>
  );
};

export default FeaturedReviews;
