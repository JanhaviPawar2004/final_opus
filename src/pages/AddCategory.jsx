import React, { useState } from "react";

const CategoryForm = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setMessage("Category cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:8082/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_name: category,
        }),
      });

      if (response.ok) {
        setMessage("✅ Category added successfully!");
        setCategory("");
      } else {
        setMessage("❌ Failed to add category");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transform hover:scale-105 transition duration-300">
        
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Category Name
            </label>

            <input
              type="text"
              placeholder="Enter category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>

          {message && (
            <p className="text-center text-sm mt-2 text-gray-700">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;