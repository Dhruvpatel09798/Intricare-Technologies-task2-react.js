import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import AllProducts from "./Components/AllProducts";
import AddProduct from "./Components/AddProduct";
import Search from "./Components/Search";
import EditProduct from "./Components/EditProduct";
import { ProductsProvider } from "./Context/ProductsContext";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("all-products");
  const [editProductId, setEditProductId] = useState(null);

  return (
    <ProductsProvider>
      <div className="bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 min-h-screen">
        <Navbar activePage={activePage} setActivePage={setActivePage} />

        <main className="pt-20 h-auto bg-gradient-to-r from-gray-900 via-cyan-900 to-gray-900">
          {activePage === "all-products" && (
            <AllProducts
              setActivePage={setActivePage}
              setEditProductId={setEditProductId}
            />
          )}

          {activePage === "add-product" && <AddProduct />}
          {activePage === "edit-product" && editProductId && (
            <EditProduct
              productId={editProductId}
              setActivePage={setActivePage}
            />
          )}
          {activePage === "search-product" && <Search />}
        </main>
      </div>
    </ProductsProvider>
  );
}

export default App;
