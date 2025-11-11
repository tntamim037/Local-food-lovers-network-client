import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyLink from "./MyLink";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const handleLogout = () => { 
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((error) => toast.error(error.message));
  }
  const navLinks = (
    <>
    
      <li><MyLink to="/">Home</MyLink></li>
      <li><MyLink to="/add-review">Add Review</MyLink></li>
      <li><MyLink to="/all-reviews">All Reviews</MyLink></li>
      <li><MyLink to="/favorites">My Favorites</MyLink></li>
    </>
  )

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold text-amber-600">
          🍔 Local Food Lovers
        </Link>
      </div>

     
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      
      <div className="navbar-end">
       
        {!user ? (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm border-amber-500 text-amber-600">
              Login
            </Link>
            <Link to="/logout" className="btn btn-sm bg-amber-600 text-white hover:bg-amber-500">
              Logout
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end"> 
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.ibb.co/2cWqV6v/user.jpg"} alt="User" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/favorites">My Favorites</Link></li>
              <li><Link to="/add-review">Add Review</Link></li>
              <li><Link to="/my-reviews">My Reviews</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li> 
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;
