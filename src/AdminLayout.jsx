import Sidebar from "./pages/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="w-4/5 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;