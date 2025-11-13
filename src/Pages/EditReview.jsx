import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "./LoadingSpinner";

const EditReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    fetch(
      `https://local-food-lovers-network-server-pi.vercel.app/reviews/${id}`
    )
      .then((res) => res.json())
      .then((data) => setReview(data.result))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      restaurantName: form.restaurantName.value,
      location: form.location.value,
      rating: Number(form.rating.value),
      reviewText: form.reviewText.value,
    };

    auth.currentUser?.getIdToken().then((token) => {
      fetch(
        `https://local-food-lovers-network-server-pi.vercel.app/reviews/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updated),
        }
      )
        .then((res) => res.json())
        .then(() => {
          Swal.fire("Updated!", "Your review has been updated.", "success");
          navigate("/my-reviews");
        });
    });
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (!review) return <p className="text-center mt-10">Review not found.</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        ✏️ Edit Review
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="foodName"
          defaultValue={review.foodName}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="foodImage"
          defaultValue={review.foodImage}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="restaurantName"
          defaultValue={review.restaurantName}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          defaultValue={review.location}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          defaultValue={review.rating}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="reviewText"
          defaultValue={review.reviewText}
          rows="4"
          className="w-full p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;
