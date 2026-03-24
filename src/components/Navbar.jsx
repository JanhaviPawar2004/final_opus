import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Check login status (you can change "token" to your key)
    const isLoggedIn = !!localStorage.getItem("token");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm px-6 py-3 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-4">

                    {/* MENU BUTTON */}
                    <button onClick={() => setIsOpen(true)}>
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* LOGO */}
                    <div
                        onClick={() => navigate("/")}
                        className="cursor-pointer"
                    >
                        <h1 className="text-xl font-semibold text-gray-800">
                            ShoppingHub
                        </h1>
                    </div>
                </div>

                {/* CENTER LINKS */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                    <p onClick={() => navigate("/")} className="cursor-pointer hover:text-black">
                        HOME
                    </p>
                    <p onClick={() => navigate("/products")} className="cursor-pointer hover:text-black">
                        PRODUCTS
                    </p>
                    <p onClick={() => navigate("/cart")} className="cursor-pointer hover:text-black">
                        CART
                    </p>
                    <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">
                        ORDERS
                    </p>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-4">

                    {/* CART ICON */}
                    <div
                        onClick={() => navigate("/cart")}
                        className="relative cursor-pointer"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600 hover:text-black transition"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L23 6H6" />
                        </svg>

                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                            0
                        </span>
                    </div>

                    {/* AUTH BUTTON */}
                    {isLoggedIn ? (
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-gray-700 hover:text-black"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </nav>

            {/* SIDEBAR (optional) */}
            {/* <Side isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        </>
    );
};

export default Navbar;