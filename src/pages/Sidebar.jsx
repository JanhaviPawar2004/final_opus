import { Link } from "react-router-dom";

function Sidebar() {
  const adminName = localStorage.getItem("adminName") || "Admin";

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col justify-between p-6 shadow-lg">
      
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold mb-12 text-center border-b border-slate-700 pb-4">
          Welcome, {adminName}
        </h2>

        <nav className="flex flex-col gap-4 mt-6">
          <Link
            to="/admin/dashboard"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 hover:text-blue-400 transition-colors duration-200"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 hover:text-blue-400 transition-colors duration-200"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 hover:text-blue-400 transition-colors duration-200"
          >
            Orders
          </Link>

          <Link
            to="/admin/users"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 hover:text-blue-400 transition-colors duration-200"
          >
            Users
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-6 bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white font-semibold py-2 px-4 rounded shadow-md"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;