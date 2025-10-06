import React, { useContext } from "react";
import Card from "./Card";
import { ProductsContext } from "../Context/ProductsContext";

const AllProducts = ({ setActivePage, setEditProductId }) => {
  const { products, setProducts, loading } = useContext(ProductsContext);

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

  if (loading) return <p className="text-gray-800 text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center text-white">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
      </div>
    </div>
  );
};

export default AllProducts;
