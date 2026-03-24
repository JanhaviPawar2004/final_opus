import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaSignOutAlt, FaBolt } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  const [adminName, setAdminName] = useState("Admin");
  const location = useLocation();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await API.get("/users/me");  // ✅ no headers needed
  
        setAdminName(res.data.name); // ⚠️ adjust if field is different
      } catch (err) {
        console.error("Error fetching admin:", err);
      }
    };
  
    fetchAdmin();
  }, []);
 

  const navigate = useNavigate();

const logout = () => {
  localStorage.clear();
  navigate("/login");
};

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt />, desc: "Overview" },
    { name: "Products", path: "/admin/products", icon: <FaBox />, desc: "Inventory" },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart />, desc: "Transactions" },
    { name: "Users", path: "/admin/users", icon: <FaUsers />, desc: "Members" },
  ];

  const initials = adminName
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between py-7 px-5 shadow-2xl relative overflow-hidden border-r border-slate-800">

  {/* Glow */}
  <div className="absolute -top-12 -left-12 w-52 h-52 bg-blue-500 opacity-10 rounded-full blur-3xl" />
  <div className="absolute bottom-16 -right-10 w-40 h-40 bg-indigo-500 opacity-10 rounded-full blur-3xl" />

  <div className="relative z-10 flex flex-col gap-7">

    {/* Brand */}
    <div className="flex items-center gap-3 pb-6 border-b border-slate-700/60">
      
    <span className="block text-center font-bold text-2xl tracking-tight text-white">
        Shopping Hub
      </span>
    </div>

    {/* Profile */}
    <div className="flex items-center gap-4 bg-gradient-to-br from-blue-500/10 to-slate-800 border border-blue-400/20 rounded-2xl p-4">

      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white ring-4 ring-blue-500/20">
          {initials}
        </div>
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-widest text-slate-500">
          Signed in as
        </p>
        <p className="text-s font-semibold text-white">
          {adminName}
        </p>
        <p className="text-s text-blue-400 font-medium">
          Administrator
        </p>
      </div>
    </div>

    {/* Menu */}
    <div>
      <p className="text-[15px] font-semibold uppercase tracking-widest text-slate-500 mb-3 pl-1">
        Main Menu
      </p>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg border border-blue-400/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
            >

              {/* Icon */}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base
                ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-blue-400"
                }`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-s font-medium">
                  {item.name}
                </p>
                <p className={`text-xs mt-0.5
                  ${
                    isActive
                      ? "text-blue-100"
                      : "text-slate-600 group-hover:text-slate-400"
                  }`}
                >
                  {item.desc}
                </p>
              </div>

              {/* Arrow */}
              <span className={`text-sm transition-all
                ${
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100 text-blue-400"
                }`}
              >
                ›
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  </div>

  {/* Logout */}
  <div className="relative z-10 pt-6 border-t border-slate-700/60">
    <button
      onClick={logout}
      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl border border-red-900/40 bg-red-950/30 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition group"
    >
      <div className="w-9 h-9 rounded-lg bg-red-900/30 flex items-center justify-center">
        <FaSignOutAlt />
      </div>
      <span className="flex-1 text-left text-sm font-medium">
        Sign Out
      </span>
      <span className="text-sm">→</span>
    </button>
  </div>
</div>
  );
}

export default Sidebar;