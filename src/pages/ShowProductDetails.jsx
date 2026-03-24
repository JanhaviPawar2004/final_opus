import React, { useState } from "react";

const ShowProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0]?.image_url
  );

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 grid md:grid-cols-10 gap-8">

        {/* ================= LEFT SIDE (70%) ================= */}
        <div className="md:col-span-7 flex gap-4">

          {/* THUMBNAILS */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px]">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img?.image_url}
                alt="thumb"
                onClick={() => setSelectedImage(img?.image_url)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition 
                  ${
                    selectedImage === img?.image_url
                      ? "border-green-500"
                      : "border-transparent"
                  }
                  hover:scale-105`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={selectedImage}
              alt="main"
              className="w-full max-h-[500px] object-contain transition duration-300 hover:scale-110"
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE (30%) ================= */}
        <div className="md:col-span-3 flex flex-col justify-between">

          {/* DETAILS */}
          <div className="space-y-4">
            
            {/* NAME */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>

            {/* CATEGORY */}
            <p className="text-sm text-green-600 font-medium">
              {product.category}
            </p>

            {/* RATING */}
            <div className="text-yellow-500 text-sm">
              {"★".repeat(Math.floor(product.product_rating))}
              {"☆".repeat(5 - Math.floor(product.product_rating))}
              <span className="text-gray-500 ml-2">
                ({product.product_rating})
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price}
              </span>

              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 space-y-3">
            
            <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition shadow">
              Buy Now
            </button>

            <button className="w-full py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-lg transition shadow">
              Add to Cart
            </button>

            <button className="w-full py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition">
              ❤️ Add to Wishlist
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ShowProductDetails;