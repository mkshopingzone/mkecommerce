'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BenefitsSection() {
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 text-center w-full bg-white color-black">
        <motion.h2 
          className="text-4xl sm:text-4xl font-bold text-gray-900 mb-10"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          How Our Platform Makes Selling Easy?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <motion.div 
            className="flex flex-col items-center feature-card"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image src="/images/login.png" alt="lgin" width={300} height={300} />
            <h3 className="text-2xl font-bold mt-4 text-black">Sign Up & List Your Products</h3>
            <p className="text-gray-600 mt-2">Register as a seller and upload your products with ease.</p>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div 
            className="flex flex-col items-center feature-card"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image src="/images/getdata.png" alt="Manage Store" width={300} height={300} />
            <h3 className="text-2xl font-bold mt-4 text-black">Connect & Manage Your Store</h3>
            <p className="text-gray-600 mt-2">Seamlessly manage orders, inventory, and payments from one dashboard.</p>
          </motion.div>
          
          {/* Feature 3 */}
          <motion.div 
            className="flex flex-col items-center feature-card"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Image src="/images/Connect.png" alt="Data Insights" width={300} height={300} />
            <h3 className="text-2xl font-bold mt-4 text-black">Boost Sales with Data Insights</h3>
            <p className="text-gray-600 mt-2">Get powerful analytics to optimize pricing, marketing, and growth.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}