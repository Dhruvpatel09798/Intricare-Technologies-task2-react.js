
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Context/ProductsContext";

const EditProduct = ({ productId, setActivePage }) => {
  const { products, setProducts } = useContext(ProductsContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // Load product data for editing
  useEffect(() => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
      });
    }
  }, [productId, products]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const updatedProduct = await response.json();

      // Update product in context
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? updatedProduct : p))
      );

      alert("Product updated successfully!");
      setActivePage("all-products");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Title */}
        <label className="font-semibold text-gray-700">Product Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter product title"
          className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Description */}
        <label className="font-semibold text-gray-700">Product Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none h-32 scrollbar-hide"
        />

        {/* Price */}
        <label className="font-semibold text-gray-700">Product Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter product price"
          className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Category */}
        <label className="font-semibold text-gray-700">Product Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter product category"
          className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Image */}
        <label className="font-semibold text-gray-700">Product Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter product image URL"
          className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-2"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
