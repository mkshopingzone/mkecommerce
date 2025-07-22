"use client";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function SellerFooter() {
  return (
    <footer className="bg-white border-t border-gray-300 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Seller Vision */}
        <div>
          <img src="/images/logo.jpg" alt="Seller Panel Logo" className="h-10 mb-3" />
          <p className="text-sm text-gray-600">
            Empowering sellers with the right tools to grow their online business efficiently.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
              <FaFacebookF className="text-gray-600" />
            </a>
            <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
              <FaTwitter className="text-gray-600" />
            </a>
            <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
              <FaInstagram className="text-gray-600" />
            </a>
          </div>
        </div>

        {/* Seller Navigation */}
        <div>
          <h3 className="font-semibold mb-3">Seller Dashboard</h3>
          <ul className="space-y-2">
            <li><a href="/seller-dashboard" className="hover:text-[#EB8426]">Dashboard</a></li>
            <li><a href="/orders" className="hover:text-[#EB8426]">Manage Orders</a></li>
            <li><a href="/products" className="hover:text-[#EB8426]">Product Listings</a></li>
            <li><a href="/analytics" className="hover:text-[#EB8426]">Sales Analytics</a></li>
          </ul>
        </div>

        {/* Seller Account */}
        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <ul className="space-y-2">
            <li><a href="/seller-profile" className="hover:text-[#EB8426]">My Profile</a></li>
            <li><a href="/payouts" className="hover:text-[#EB8426]">Payouts</a></li>
            <li><a href="/support" className="hover:text-[#EB8426]">Seller Support</a></li>
          </ul>
        </div>

        {/* Contact Support */}
        <div>
          <h3 className="font-semibold mb-3">Need Help?</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <FiMapPin className="text-[#EB8426]" />
              <span>Dubai HQ</span>
            </li>
            <li className="flex items-center space-x-2">
              <FiPhone className="text-[#EB8426]" />
              <span>+97158572631</span>
            </li>
            <li className="flex items-center space-x-2">
              <FiMail className="text-[#EB8426]" />
              <span>support@getnotmuch.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 text-center py-4 text-sm flex justify-between items-center px-6 max-w-7xl mx-auto">
        <p>© 2025 Seller Panel. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#EB8426]">Privacy Policy</a>
          <a href="#" className="hover:text-[#EB8426]">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}