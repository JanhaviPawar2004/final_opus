import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const CategoryPage = ({ setProduct }) => {
  const { id } = useParams(); // category id from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // for loading state
  const [error, setError] = useState(null); // for error message

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `http://localhost:9000/ecommerce/categories/${id}/products`
        );

        // Ensure the response is an array
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
          console.warn("Products response is not an array:", res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <div>No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setProduct={setProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;