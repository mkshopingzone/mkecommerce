"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SellerSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
        {/* Content Section */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Elevate Your Business,  
            <span className="text-[#EB8426]"> Maximize Growth</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join a powerful platform designed for sellers. Showcase your products, 
            connect with genuine buyers, and expand your business without limits.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            className="bg-[#EB8426] hover:bg-[#D9731D] text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/login"
          >
            Start Selling Today
          </motion.a>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative w-full h-86 md:h-[500px] rounded-2xl overflow-hidden flex items-center justify-center bg-gray-100">
            <Image
              src="/images/growth.png"
              alt="Seller Growth"
              width={600} // Adjust based on your image's aspect ratio
              height={400} // Adjust based on your image's aspect ratio
              className="object-contain" // Ensures the image fits inside the container without cropping
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}