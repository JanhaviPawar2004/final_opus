import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader/Loader";
import toast from "react-hot-toast";
const ProductsPage = ({ setProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const response = await axios.get("http://localhost:9000/ecommerce/products");
                setProducts(response.data);
            } catch (err) {
                setError("Failed to fetch products");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        // Loader Demo
        // const timer = setTimeout(() => {
        //       fetchProducts();
        //     }, 5000);

        // return () => clearTimeout(timer);

        fetchProducts();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">
        <Loader size={60} speed={1} />
    </div>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Products</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} setProduct={setProduct} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;