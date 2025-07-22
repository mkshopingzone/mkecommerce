'use client';

import { FaBox, FaChartLine, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function EmpowerSection() {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-24 bg-gray-100 flex flex-col lg:flex-row items-center gap-16">
      {/* Left Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 text-center lg:text-left"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          How Mkshopping zone Empowers Sellers Worldwide
        </h2>
        <p className="mt-6 text-gray-700 text-lg max-w-lg">
          Mkshopping zone is designed to help businesses thrive by providing seamless tools for online selling, order management, and customer engagement. Join a trusted marketplace and grow your sales effortlessly.
        </p>
      </motion.div>
      
      {/* Right Features List */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 flex flex-col gap-y-8"
      >
        {/* Feature 1 */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-start gap-x-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <FaBox className="text-orange-500 text-4xl" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900">Effortless Product Listing</h3>
            <p className="text-gray-700 text-lg max-w-md">
              Easily upload and manage your products with our intuitive platform. Sell smarter and faster.
            </p>
          </div>
        </motion.div>
        
        {/* Feature 2 */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-start gap-x-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <FaChartLine className="text-orange-500 text-4xl" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900">Advanced Analytics</h3>
            <p className="text-gray-700 text-lg max-w-md">
              Track sales, monitor trends, and optimize your strategy with real-time insights.
            </p>
          </div>
        </motion.div>
        
        {/* Feature 3 */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-start gap-x-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <FaUsers className="text-orange-500 text-4xl" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900">Seamless Customer Engagement</h3>
            <p className="text-gray-700 text-lg max-w-md">
              Connect with buyers instantly and provide top-tier service with our integrated communication tools.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
