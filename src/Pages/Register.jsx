import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";


const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  // ✅ Password Validation Function
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasMinLength = password.length >= 6;

    if (!hasUppercase)
      return "Password must contain at least one uppercase letter.";
    if (!hasLowercase)
      return "Password must contain at least one lowercase letter.";
    if (!hasMinLength)
      return "Password must be at least 6 characters long.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photo, password, confirmPassword } = formData

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!")
      return;
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }

    setLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Registration successful!")
      navigate("/")
    } catch (error) {
      toast.error(error.code.replace("auth/", "").replace("-", " "))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

      
        <div className="flex flex-col justify-center items-center b text-black p-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Join Our Community 🍽️</h1>
          <p className="text-lg leading-relaxed">
            Discover amazing local food spots and share your reviews with
            <span className="font-semibold"> Local Food Lovers</span>.
          </p>
          <p className="mt-6 text-sm text-amber-100 italic">
            “Good taste, good friends, good vibes.” 
          </p>
        </div>

      
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-amber-600 text-center">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              value={formData.photo}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <button
              type="submit"
              className={`btn w-full bg-amber-500 hover:bg-amber-600 text-white ${loading ? "loading" : ""}`}
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
