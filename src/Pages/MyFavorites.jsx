import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const MyFavorites = () => {
  const { user } = useContext(AuthContext)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
  if (user) {
    fetch(`https://local-food-lovers-network-server-pi.vercel.app/favorites?email=${user.email}`, {
  headers: {
     authorization: `Bearer ${localStorage.getItem("token")}`, 
   },
 })
      .then((res) => res.json())
      .then((data) => {
        console.log("Favorites Response:", data)
        setFavorites(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        console.error(err);
        setFavorites([])
      })
  }
}, [user])


  const handleDelete = async (id) => {
    const res = await fetch(`https://local-food-lovers-network-server-pi.vercel.app/favorites/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const data = await res.json()
    if (data.success) {
      setFavorites(favorites.filter((fav) => fav._id !== id))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <h2 className="text-3xl text-center font-bold text-amber-600 mb-6">My Favorites ❤️ </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {Array.isArray(favorites) && favorites.length > 0 ? (
  favorites.map((fav) => (
    <div key={fav._id} className="card p-4 shadow rounded-lg">
      <img src={fav.foodImage} alt={fav.foodName} className="w-full h-40 object-cover rounded-md" />
      <h3 className="font-semibold text-lg mt-2">{fav.foodName}</h3>
      <p className="text-gray-500">{fav.restaurantName}</p>
      <p className="text-yellow-500">{"⭐".repeat(fav.rating)}</p>
      <button
        onClick={() => handleDelete(fav._id)}
        className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white w-full my-2 text-lg py-4"
      >
        Delete
      </button>
    </div>
  ))
) : (
  <p className="text-center text-gray-500 col-span-full">No favorites found!</p>
)}

      </div>
    </div>
  )
}

export default MyFavorites;
