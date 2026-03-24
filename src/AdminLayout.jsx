import Sidebar from "./pages/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function AdminLayout() {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("products")) return "Products";
    if (location.pathname.includes("orders")) return "Orders";
    if (location.pathname.includes("users")) return "Users";
    return "Admin Panel";
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">

        {/* Top Header Box */}
        <div className="bg-white border border-gray-200 px-6 py-4 shadow-sm mt-8 mx-6 rounded-xl">
                    <h1 className="text-xl font-semibold text-gray-800">
            {getPageTitle()}
          </h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;