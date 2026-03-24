import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const products = [
  {
    id: 1,
    name: "Organic Apples",
    description: "Fresh and juicy apples directly from farms",
    category: "Fruits",
    price: 199,
    originalPrice: 249,
    rating: 4,
    // image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  
  {
    id: 4,
    name: "Broccoli",
    description: "Green and nutritious broccoli florets",
    category: "Vegetables",
    price: 89,
    originalPrice: 120,
    rating: 3,
    // image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
  },
  
  {
    id: 7,
    name: "Potato Chips",
    description: "Crispy salted potato chips",
    category: "Snacks",
    price: 40,
    originalPrice: 50,
    rating: 4,
    // image: "https://images.unsplash.com/photo-1585238342028-4c4d3a3b8f72",
  },
  {
    id: 8,
    name: "Almonds",
    description: "Premium quality dry fruits",
    category: "Dry Fruits",
    price: 499,
    originalPrice: 599,
    rating: 5,
    // image: "https://images.unsplash.com/photo-1508747703725-719777637510",
  },
  {
    id: 9,
    name: "Orange Juice",
    description: "Freshly squeezed orange juice",
    category: "Beverages",
    price: 120,
    originalPrice: 150,
    rating: 4,
    // image: "https://images.unsplash.com/photo-1571689936034-7a8e26c3b1b1",
  },
  {
    id: 10,
    name: "Strawberries",
    description: "Sweet and fresh strawberries",
    category: "Fruits",
    price: 180,
    originalPrice: 220,
    rating: 5,
    // image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6",
  },
];

const HomePage = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
   useEffect(() => {
    fetch("http://localhost:9000/ecommerce/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const [products, setProducts] = useState([]);


  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full">
        
        {/* Background Image */}
        <img
          src="../../public/Images/Background_image.jpg"
          alt="hero"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Left Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="ml-10 md:ml-20 max-w-xl text-white space-y-6">
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Fresh & Organic Products
            </h1>

            <p className="text-lg text-gray-200">
              Discover the best quality groceries delivered fresh to your doorstep.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 transition rounded-lg text-white font-medium shadow-md"
            >
              Start Shopping
            </button>

          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Shop by Category
        </h2>

        <div className="flex flex-row overflow-x-scroll p-2 gap-6">
          
          {categories.map((cat) => (
            <div
              key={cat.category_id}
              onClick={() => navigate(`/categories/${cat.category_id}/products`)}  // ✅ ADD THIS
              className="bg-white rounded-xl min-w-[25%] shadow-sm p-6 flex items-center justify-center cursor-pointer hover:shadow-md hover:scale-105 hover:bg-green-50 transition"
            >
              <p className="text-gray-700 font-medium">
                {cat.category_name}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= BEST SELLING PRODUCTS =================
      <section className="py-16 px-6 md:px-16 bg-white">
        
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Best Selling Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          image={p.image}
          name={p.name}
          description={p.description}
          category={p.category}
          price={p.price}
          originalPrice={p.originalPrice}
          rating={p.rating}
        />
      ))}

        </div>
      </section> */}

      
    </div>
  );
};

export default HomePage;