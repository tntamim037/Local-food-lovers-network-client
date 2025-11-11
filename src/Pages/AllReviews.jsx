import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import LoadingSpinner from "./LoadingSpinner";

const AllReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const fetchReviews = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/reviews${query ? `?foodName=${query}` : ""}`
      );
      const data = await res.json()
      setReviews(data)
    } catch (err) {
      console.error("Error fetching reviews:", err)
    } finally {
      setLoading(false)
    }
  }


    useEffect(() => {
    fetchReviews()
  }, [])

 
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReviews(search.trim())
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
      <h2 className="text-3xl font-bold text-amber-600 mb-6">All Reviews</h2>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by food name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered flex-1"
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No reviews found!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
