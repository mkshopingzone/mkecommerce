'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="flex flex-col-reverse w-full bg-white text-black lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 py-10 sm:py-16 space-y-6 sm:space-y-0 overflow-hidden">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left mt-19">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900">
          Grow Your Business with Mkshopping zone
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          The fastest way to reach more customers and boost your sales with our powerful e-commerce platform.
        </p>
        <button 
          onClick={() => router.push('/login')} 
          className="mt-6 bg-orange-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Get Started
        </button>
      </div>

      {/* Right Image Section */}
      <div className="w-full mt-1.5 lg:w-1/2 sm:mt-19 flex justify-center">
        <Image
          src="/images/grp.png" 
          alt="Business Discussion"
          width={400}
          height={400}
          className="rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>
    </section>
  );
}