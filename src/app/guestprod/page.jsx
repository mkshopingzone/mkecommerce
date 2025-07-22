"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function GuestProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    priceCurrency: "USD",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadToImageKit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", `product_${Date.now()}_${file.name}`);
    formData.append("folder", "/products");
    
    try {
      const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
          // Updated authorization format
          Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY}:`)}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`ImageKit upload failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("ImageKit upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1. Validate required fields
      if (!formData.name || !formData.description || !formData.price || !formData.category || !imageFile) {
        throw new Error("All fields are required");
      }

      // 2. Upload image to ImageKit
      let uploadedImageUrl = "";
      if (imageFile) {
        uploadedImageUrl = await uploadToImageKit(imageFile);
        if (!uploadedImageUrl) {
          throw new Error("Image upload failed");
        }
      }

      // 3. Prepare product data
      const productData = {
        ...formData,
        price: Number(formData.price), // Convert to number
        image: uploadedImageUrl,
      };

      const user = cookies.get("user");

      // 4. If guest, save to localStorage and redirect to login
      if (!user) {
        localStorage.setItem("guestProduct", JSON.stringify(productData));
        document.cookie = `guestSession=guest_${Date.now()}; path=/; max-age=${7 * 24 * 60 * 60}`;
        setMessage("Product saved! Please login to continue");
        router.push("/login?redirect=/products/add");
        return;
      }

      // 5. If logged in, submit to backend
      const response = await fetch("https://api.agiigo.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      setMessage("Product uploaded successfully!");
      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        price: "",
        priceCurrency: "USD",
        category: "",
      });
      setImageFile(null);

    } catch (error) {
      setMessage(error.message);
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full bg-white text-black flex items-center justify-center p-4">
      <div className="max-w-lg w-full mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-orange-400 my-8">
        <h2 className="text-3xl font-semibold text-center text-orange-600 mb-6">
          Add a New Product
        </h2>

        {message && (
          <div className={`mb-4 p-3 rounded-md text-center ${
            message.includes("success") || message.includes("saved") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full p-2.5 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Product Description *
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full p-2.5 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              rows="4"
              required
            />
          </div>

          {/* Price and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price *
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 w-full p-2.5 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="priceCurrency" className="block text-sm font-medium text-gray-700">
                Currency *
              </label>
              <select
                name="priceCurrency"
                value={formData.priceCurrency}
                onChange={handleChange}
                className="mt-1 w-full p-2.5 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="USD">USD ($)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full p-2.5 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Garden</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="toys">Toys & Games</option>
            </select>
          </div>

          {/* Product Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Product Image *
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              required
            />
            {imageFile && (
              <div className="mt-2 text-xs text-gray-500">
                Selected: {imageFile.name}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-md shadow-md transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}