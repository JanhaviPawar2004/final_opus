import React from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    // ✅ FIX: handle both cases
    const productId = product.product_id || product.productId;
    const name = product.name;
    const description = product.description;
    const category = product.category;
    const price = product.price;
    const rating = product.product_rating;

    const image =
        product.images && product.images.length > 0
            ? product.images[0].image_url
            : "https://picsum.photos/300";

    const addToCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first 🚫");
            navigate("/login");
            return;
        }

        try {
            const cartRes = await API.get("ecommerce/carts/my-cart");

            const cartId = cartRes.data.id;

            await API.post(`ecommerce/carts/${cartId}/items`, {
                productId: Number(productId),
                productName: String(name),
                unitPrice: Number(price),
                deltaQty: 1,
                priceCoupon: Number(price),
            });

            toast.success("Added to cart!");
        } catch (err) {
            console.error("ERROR:", err.response?.data || err.message);

            if (err.response?.status === 403) {
                toast.error("Session expired. Please login again.");
                navigate("/login");
            } else {
                toast.error("Failed to add to cart");
            }
        }
    };

    return (
        <div className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300">

            <div className="w-full h-48 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-gray-800 font-semibold text-lg">{name}</h3>
                <p className="text-gray-500 text-sm">{description}</p>
                <p className="text-xs text-green-600">{category}</p>

                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">₹{price}</span>
                </div>

                <div className="text-yellow-500 text-sm">
                    {"★".repeat(Math.floor(rating || 0))}
                </div>
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end justify-center pb-4">
                <button
                    onClick={addToCart}
                    className="px-4 py-2 bg-white rounded"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
