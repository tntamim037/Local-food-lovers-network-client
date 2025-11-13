import React from "react";
import { BiX } from "react-icons/bi";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t">
      
      <div className="max-w-screen mx-auto p-10 flex flex-col lg:flex-row justify-between gap-8">
        
        <aside className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-rose-400 via-yellow-300 to-amber-400 flex items-center justify-center text-white font-extrabold text-lg">
              LF
            </div>
            <span className="font-semibold text-lg text-amber-600">Local Food Lovers</span>
          </Link>
          <p className="text-sm mt-2 text-gray-500 leading-relaxed">
            Discover, share, and celebrate the best local food spots 🍔🍕🍛
          </p>
        </aside>

        
        <nav className="flex-1">
          <h6 className="footer-title">Quick Links</h6>
          <ul className="space-y-1">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/all-reviews" className="link link-hover">All Reviews</Link></li>
            <li><Link to="/favorites" className="link link-hover">My Favorites</Link></li>
            <li><Link to="/about" className="link link-hover">About</Link></li>
          </ul>
        </nav>

       
        <nav className="flex-1">
          <h6 className="footer-title">Support</h6>
          <ul className="space-y-1">
            <li><a className="link link-hover">Contact Us</a></li>
            <li><a className="link link-hover">Privacy Policy</a></li>
            <li><a className="link link-hover">Terms & Conditions</a></li>
          </ul>
        </nav>

        <nav className="flex-1">
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-4 mt-3">
            <a href="#" aria-label="X" className="hover:text-amber-600 font-semibold text-sm"><BsTwitterX></BsTwitterX></a>
            <a href="#" aria-label="Instagram" className="hover:text-amber-600 font-semibold text-sm"><BsInstagram></BsInstagram></a>
            <a href="#" aria-label="Facebook" className="hover:text-amber-600 font-semibold text-sm"><FaFacebook></FaFacebook></a>
          </div>
        </nav>
      </div>

   
      <div className="border-t border-base-300 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Local Food Lovers Network — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
