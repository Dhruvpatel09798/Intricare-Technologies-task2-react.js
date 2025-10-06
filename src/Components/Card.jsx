// import React from "react";

// const Card = ({ product }) => {
//   return (
//     <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col h-full">
//       {/* Image Container */}
//       <div className="flex items-center justify-center h-48 bg-gray-700 p-2 flex items-center justify-center h-48 bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 p-2">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="max-h-full max-w-full object-contain "
//         />
//       </div>

//       {/* Content */}
//       <div className="p-4 flex-1 flex flex-col justify-between">
//         <div>
//           <h2 className="font-bold text-lg mb-2 truncate">{product.title}</h2>
//           <p className="text-gray-300 text-sm line-clamp-3">{product.description}</p>
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <span className="font-semibold text-cyan-400">${product.price}</span>
//           <span className="text-yellow-400">⭐ {product.rating?.rate || "N/A"}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React from "react";

const Card = ({ product, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col justify-between bg-white/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden h-full transition duration-700 ease-in-out 
             hover:scale-110 ">
      {/* Product image */}
      <div className="flex items-center justify-center h-48 p-2 flex items-center justify-center h-48 bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 p-2">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain p-4"
      />
      </div>
      {/* Product info */}
      <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>

        {/* Scrollable description */}
        <p className="text-gray-600 mt-2 flex-1 overflow-y-auto scrollbar-hide max-h-24">
          {product.description}
        </p>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-purple-500 font-semibold">${product.price}</span>
          <span className="text-gray-500 text-sm">{product.category}</span>
        </div>
      </div>

      {/* Buttons at the bottom inside card */}
      <div className="flex justify-around p-3 bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
        <button
          onClick={onEdit}
          className="bg-purple-400 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-400 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
