import React, { useState, useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";

const AddProduct = () => {
  const { setProducts } = useContext(ProductsContext);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // Update context so new product appears immediately
      setProducts((prev) => [data, ...prev]);

      setSuccess("Product added successfully!");
      setFormData({ title: "", price: "", description: "", image: "", category: "" });
    } catch (error) {
      console.error("Error adding product:", error);
      setSuccess("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 h-screen p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
         <label className="font-semibold text-gray-700">Product Title</label>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
         <label className="font-semibold text-gray-700">Product Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
         <label className="font-semibold text-gray-700">Image url</label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
         <label className="font-semibold text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
         <label className="font-semibold text-gray-700">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold p-3 rounded-lg transition-colors"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {success && <p className="text-center mt-4 text-green-500">{success}</p>}
    </div>
  );
};

export default AddProduct;
