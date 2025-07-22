"use client";
import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import { Editor } from "@tinymce/tinymce-react";

const cookies = new Cookies();

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    priceCurrency: "USD",
    category: "",
    image: null,
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setIsSubmitting(true);
  
    const userCookie = cookies.get("user");
    if (!userCookie) {
      setMessage({ text: "No user data provided. Please log in.", type: "error" });
      setIsSubmitting(false);
      return;
    }
  
    const user = typeof userCookie === "string" ? JSON.parse(userCookie) : userCookie;
    if (!user._id) {
      setMessage({ text: "Invalid user data. Please log in again.", type: "error" });
      setIsSubmitting(false);
      return;
    }
  
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("description", formData.description);
    formDataObj.append("price", formData.price);
    formDataObj.append("priceCurrency", formData.priceCurrency);
    formDataObj.append("category", formData.category);
    formDataObj.append("userId", user._id);
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }
  
    try {
      const response = await fetch("https://api.agiigo.com/api/products", {
        method: "POST",
        body: formDataObj,
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: "Product added successfully!", type: "success" });
        setFormData({
          name: "",
          description: "",
          price: "",
          priceCurrency: "USD",
          category: "",
          image: null,
        });
        if (editorRef.current) {
          editorRef.current.setContent("");
        }
      } else {
        setMessage({ text: data.error || "Failed to add product.", type: "error" });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage({ text: "Error adding product.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
            <p className="text-sm text-gray-600 mt-1">Fill in the product details below</p>
          </div>

          {/* Form Body */}
          <div className="p-6">
            {message.text && (
              <div className={`mb-6 p-3 rounded-md text-sm ${
                message.type === "success" 
                  ? "bg-green-50 text-green-700 border border-green-100" 
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm placeholder-gray-700"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Editor
            apiKey="xw0haeefepmen4923ro5m463eb97qhseuprfkpbuan5t10u5"
            value={formData.headerContent}
            onEditorChange={handleEditorChange}
            // initialValue={defaultValue}
            init={{
                height: 700,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
          />
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-700 text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 text-gray-700 py-2 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm placeholder-gray-700"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Currency */}
                <div>
                  <label htmlFor="priceCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    required
                  >
                   <option value="USD">USD ($)</option>
                   <option value="AED">AED (د.إ.)</option>
                  </select>
                </div>

                {/* Category */}
                <div className="md:col-span-2 text-gray-700">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
  name="category"
  value={formData.category} // Controlled component
  onChange={handleChange}
  className="block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
  required
>
  <option value="" disabled className="text-gray-700">
    Select category
  </option>
  <option value="electronics">Electronics</option>
  <option value="fashion">Fashion</option>
  <option value="home">Home & Kitchen</option>
  <option value="beauty">Beauty & Personal Care</option>
  <option value="sports">Sports & Fitness</option>
  <option value="toys">Toys & Games</option>
  <option value="books">Books</option>
  <option value="automotive">Automotive</option>
  <option value="health">Health & Wellness</option>
  <option value="groceries">Groceries & Gourmet Food</option>
  <option value="baby">Baby & Maternity</option>
  <option value="pet-supplies">Pet Supplies</option>
  <option value="furniture">Furniture</option>
  <option value="appliances">Home Appliances</option>
  <option value="jewelry">Jewelry & Accessories</option>
  <option value="watches">Watches</option>
  <option value="music">Musical Instruments</option>
  <option value="stationery">Stationery & Office Supplies</option>
  <option value="art-crafts">Arts, Crafts & Sewing</option>
  <option value="video-games">Video Games & Consoles</option>
  <option value="outdoor">Outdoor & Camping</option>
  <option value="travel">Travel & Luggage</option>
  <option value="garden">Garden & Outdoor Living</option>
  <option value="lighting">Lighting & Decor</option>
  <option value="industrial">Industrial & Scientific</option>
  <option value="mobile-accessories">Mobile Accessories</option>
  <option value="computer-accessories">Computer Accessories</option>
  <option value="software">Software</option>
  <option value="diy">DIY & Tools</option>
  <option value="safety">Safety & Security</option>
  <option value="pharmacy">Pharmacy & OTC</option>
  <option value="alcohol">Alcohol & Beverages</option>
  <option value="collectibles">Collectibles & Memorabilia</option>
  <option value="antiques">Antiques</option>
  <option value="smart-home">Smart Home Devices</option>
  <option value="gift-cards">Gift Cards & Vouchers</option>
  <option value="subscription">Subscription Services</option>
  <option value="handmade">Handmade & Artisanal</option>
  <option value="ethical">Ethical & Sustainable</option>
  <option value="others">Others</option>
</select>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-700 justify-center">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-700">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                  {formData.image && (
                    <p className="mt-2 text-sm text-gray-700">
                      Selected: {formData.image.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Footer */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Product...
                    </>
                  ) : (
                    'Add Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}