"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SellerFooter from "../components/SellerFooter";
import PreLoginNav from "../components/MainNav";

const faqs = [
  {
    question: "Who can sell on Mkshopping zone?",
    answer:
      "Anyone with valid business details and quality products can apply to become a seller on Mkshopping zone. Whether you're an individual entrepreneur, a small business, or a brand, you're welcome to join!",
  },
  {
    question: "How do I register as a seller?",
    answer:
      "To register:\n• Visit sellerhub.agiigo.com\n• Click on “Sign Up” or “Register”\n• Fill in your details, upload the required documents, and submit\n• Our team will verify your information and notify you upon approval",
  },
  {
    question: "What documents are required for registration?",
    answer: "Just Sign up and sell without any hassle.",
  },
  {
    question: "Are there any fees to sell on Mkshopping zone?",
    answer: "Currently, there is no registration fee.",
  },
  {
    question: "How do I list my products?",
    answer:
      "• Log in to the Seller Dashboard\n• Go to 'Product Management'\n• Upload product details (title, description, images, price, stock, etc.)\n• Submit for review (if moderation is enabled)",
  },
  {
    question: "How do I manage orders?",
    answer:
      "You can view and manage all incoming orders through your Seller Dashboard. You’ll get notifications for new orders, and can update order status (packed, shipped, delivered) from the same panel.",
  },
  {
    question: "Who handles shipping?",
    answer: "As of now, sellers have to manage all shipping.",
  },
  {
    question: "When do I get paid?",
    answer: "Payments are typically settled 7–10 business days after the order is successfully delivered.",
  },
  {
    question: "How do I contact Seller Support?",
    answer: "You can reach out to our support team via:\n• Email: support@agiigo.com",
  },
  {
    question: "What types of products can I sell?",
    answer:
      "You can sell fashion, accessories, home goods, electronics, beauty products, and more—provided they meet our quality and compliance standards. Prohibited items include counterfeit goods, guns, any drugs, exotic animals or their skins, sex objects, or anything against our policies.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PreLoginNav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mt-14 text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
            >
              <button
                className="w-full flex justify-between items-center p-6 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-800 text-left">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600">
                      {faq.answer.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <SellerFooter />
    </div>
  );
}