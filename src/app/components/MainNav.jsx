"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function PreLoginNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
     
    <nav className="fixed top-0 left-0 w-full z-50 bg-white py-5">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-[#EB8426]">
          <img src="/images/mklogo.jpg" className="h-20" alt="Logo" />
        </a>

        {/* Start Selling Button - Desktop */}
        <div className="hidden lg:flex">
        <a 
            href="/faqs" 
            className="bg-[#EB8426] text-white px-6 py-3 mr-3 rounded-full font-semibold shadow-lg 
                       hover:bg-[#d9731a] transition duration-300"
          >
            FAQs
          </a>
          <a 
            href="/login" 
            className="bg-[#EB8426] text-white px-6 py-3 rounded-full font-semibold shadow-lg 
                       hover:bg-[#d9731a] transition duration-300"
          >
            Start Selling
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden focus:outline-none">
          {isOpen ? <X className="h-8 w-8 text-gray-700" /> : <Menu className="h-8 w-8 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md py-4 px-6">
          <a 
            href="/login" 
            className="block bg-[#EB8426] text-white text-center px-6 py-3 rounded-full font-semibold shadow-lg 
                       hover:bg-[#d9731a] transition duration-300"
          >
            Start Selling
          </a>
        </div>
      )}
    </nav>
  );
}
