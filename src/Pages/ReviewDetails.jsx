import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ReviewDetails = () => {
  const { id } = useParams()
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`http://localhost:3000/reviews/${id}`);
        const data = await res.json()
        if (data.success) setReview(data.result)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    };
    fetchReview()
  }, [id])

  if (loading)
    return <div className="text-center py-10">Loading...</div>

  if (!review)
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Review not found!</h2>
        <Link to="/" className="btn mt-4">
          Back to Home
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="w-full md:w-1/2">
          <img
            src={review.foodImage}
            alt={review.foodName}
            className="w-full h-96 object-cover rounded-2xl shadow-md"
          />
        </div>

        
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-600">
            {review.foodName}
          </h2>
          <p className="text-gray-700">
            <strong>Restaurant:</strong> {review.restaurantName}, {review.location || review.restaurantLocation}
          </p>
          <p className="text-gray-700">
            <strong>Reviewed by:</strong> {review.reviewerName || "Anonymous"}
          </p>
          <p className="text-yellow-500 mb-4 text-xl">
            <strong className="text-gray-700 text-lg">Rating :</strong>  {"⭐".repeat(review.rating)}
          </p>
          <p className="text-gray-800"><strong>Description:</strong> {review.reviewText}</p>

          <Link
            to="/all-reviews"
            className="btn mt-6 w-1/2 rounded-full bg-amber-500 hover:bg-amber-600 text text-white text-center"
          >
            Back to All Reviews
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
