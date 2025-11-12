import React, { useContext, useState } from "react";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";
import { getAuth } from "firebase/auth";

const AddReview = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

   const [loading, setLoading] = useState(false)

  const handleAddReview = (e) => {
    e.preventDefault()
    const form = e.target

    const newReview = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      restaurantName: form.restaurantName.value,
      location: form.location.value,
      rating: Number(form.rating.value),
      reviewText: form.reviewText.value,
      reviewerName: user?.displayName || "Anonymous",
      userEmail: user?.email, 
      createdAt: new Date().toISOString(), 
    }

  setLoading(true)

  const auth = getAuth();
    auth.currentUser?.getIdToken().then((token) => {
      fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(newReview),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.success) {
          Swal.fire({
            title: " Success!",
            text: "Review added successfully!",
            icon: "success",
          })
          form.reset()
          navigate("/")
        } else {
          Swal.fire({
            title: "Failed!",
            text: data.message || "Something went wrong!",
            icon: "error",
          })
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
    })
  }

 if (loading) return <LoadingSpinner></LoadingSpinner>


  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        🍽️ Add Your Food Review
      </h2>

      <form onSubmit={handleAddReview} className="space-y-4">
       
        <div>
          <label className="font-medium">Food Name</label>
          <input
            type="text"
            name="foodName"
            required
            className="w-full p-2 border rounded"
          />
        </div>

       
        <div>
          <label className="font-medium">Food Image (URL)</label>
          <input
            type="text"
            name="foodImage"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        
        <div>
          <label className="font-medium">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            required
            className="w-full p-2 border rounded"
          />
        </div>

    
        <div>
          <label className="font-medium">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        
        <div>
          <label className="font-medium">Star Rating (1–5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            required
            className="w-full p-2 border rounded"
          />
        </div>

       
        <div>
          <label className="font-medium">Review Text</label>
          <textarea
            name="reviewText"
            rows="4"
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

       
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
