import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const MyReviews = () => {
  const { user } = useContext(AuthContext)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = getAuth()

  useEffect(() => {
    const fetchReviews = async () => {
      const token = await auth.currentUser?.getIdToken()
        fetch(`http://localhost:3000/my-reviews?email=${user?.email}`, {
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .finally(() => setLoading(false))
    }
    fetchReviews()
  }, [user])

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    })

    if (confirm.isConfirmed) {
      const token = await auth.currentUser?.getIdToken();
      fetch(`http://localhost:3000/reviews/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
            setReviews(reviews.filter((rev) => rev._id !== id));
          }
        });
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        👤 My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Food Image</th>
              <th className="p-2 border">Food Name</th>
              <th className="p-2 border">Restaurant</th>
              <th className="p-2 border">Posted Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r._id} className="text-center">
                <td className="p-2 border">
                  <img src={r.foodImage} alt={r.foodName} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-2 border">{r.foodName}</td>
                <td className="p-2 border">{r.restaurantName}</td>
                <td className="p-2 border">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="p-2 border space-x-2">
                  <Link
                    to={`/edit-review/${r._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MyReviews;
