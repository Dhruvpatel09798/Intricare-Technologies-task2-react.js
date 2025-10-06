import { Menu, X } from "lucide-react";
import React, { useState } from "react";

const Navbar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "All Products", page: "all-products" },
    { name: "Add Product", page: "add-product" },
    { name: "Search Product", page: "search-product" },
  ];

  return (
    <nav className="fixed bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300/80 backdrop-blur-md fixed w-full top-0 left-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Desktop Links */}
        <div className="hidden md:flex mx-auto space-x-6">
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => setActivePage(link.page)}
              className={`font-semibold px-4 py-2 rounded-lg transition-colors ${
                activePage === link.page
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                  : "text-purple-600 hover:bg-purple-200/50"
              }`}
            >
              {link.name}
              
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8  hover:bg-pink-400/80 transition-colors"
          >{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/60 backdrop-blur-md shadow-md">
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                setActivePage(link.page);
                setIsOpen(false);
              }}
              className={`block w-full text-center px-4 py-3 font-semibold transition-colors rounded-lg mb-1 ${
                activePage === link.page
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                  : "text-purple-600 hover:bg-purple-200/50"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
