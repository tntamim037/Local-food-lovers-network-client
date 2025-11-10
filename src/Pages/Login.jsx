import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.config";


const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      toast.success("Login successful!")
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error.code.replace("auth/", "").replace("-", " "))
    } finally {
      setLoading(false)
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      toast.success("Login successful!")
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error.code.replace("auth/", "").replace("-", " "))
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

       
        <div className="flex flex-col justify-center items-center text-black  p-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!👋</h1>
          <p className="text-lg leading-relaxed">
            Join the <span className="font-semibold">Local Food Lovers</span> community —
            explore, review, and share your favorite local dishes & restaurants.
          </p>
          <p className="mt-6 text-sm text-amber-100 italic">
            “Good food connects hearts.” 
          </p>
        </div>

       
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-amber-600 text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <button
              type="submit"
              className={`btn w-full bg-amber-500 hover:bg-amber-600 text-white ${loading ? "loading" : ""}`}
            >
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn w-full btn-outline border-amber-500 text-amber-600 hover:bg-amber-50"
          >
            Continue with Google
          </button>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-amber-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
