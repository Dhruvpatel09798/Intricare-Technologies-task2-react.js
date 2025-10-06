import React, { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import Card from "./Card";

const Search = ({ setActivePage, setEditProductId }) => {
  const { products, setProducts } = useContext(ProductsContext);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(products);

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    let filteredProducts = products;

    // Filter by query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by category
    if (category !== "All") {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    setFiltered(filteredProducts);
  }, [query, category, products]);

  // Delete handler
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      {/* Search Input and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-100"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400  bg-gray-100"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Filtered results using Card component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Card
            key={product.id}
            product={product}
            onEdit={() => {
              setEditProductId(product.id);
              setActivePage("edit-product");
            }}
            onDelete={() => handleDelete(product.id)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center mt-4 text-gray-600">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
