"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://api.agiigo.com/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
        } else {
          setMessage("Product not found.");
        }
      } catch (err) {
        setMessage("Error fetching product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!product) return;
    
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("priceCurrency", product.priceCurrency);
    formData.append("category", product.category);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`https://api.agiigo.com/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      alert("Product updated successfully!");
      router.push(`/edit-product/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product: " + error.message);
    }
  };
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
  
    try {
      const response = await fetch(`https://api.agiigo.com/api/products/${id}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete product");
      }
  
      alert("Product deleted successfully!");
      router.push('/my-products');
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product: " + error.message);
    }
  };  
  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center px-6 py-8">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
      <div className="btns flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10">
  <button
    className="px-5 py-2 rounded-md shadow-md text-orange-500 border border-orange-500 
               hover:bg-orange-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-orange-500"
    onClick={() => router.back()}
  >
    ← Back
  </button>
  <button
    className="px-5 py-2 rounded-md shadow-md text-orange-500 border border-orange-500 
               hover:bg-red-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-red-500"
    onClick={handleDelete}
  >
    Delete
  </button>
</div>

        <h2 className="text-3xl font-bold text-orange-500">Edit Product</h2>
      

      </div>
    
      {message && <p className="text-red-500">{message}</p>}

      {product && (
        <form onSubmit={handleUpdate} className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-5">
          <div className="w-full flex justify-center">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : product.image}
              alt="Product Preview"
              className="w-48 h-48 object-cover rounded-lg border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Change Image</label>
            <input type="file" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Product Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Currency</label>
              <select
                value={product.priceCurrency}
                onChange={(e) => setProduct({ ...product, priceCurrency: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
              >
                <option value="USD">USD</option>
                <option value="AED">AED</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Category</label>
            <input
              type="text"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md shadow-md hover:bg-orange-600 transition text-lg font-semibold"
          >
            Update Product
          </button>
        </form>
      )}
    </div>
  );
}