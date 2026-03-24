import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";
import API from "../services/api";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fd7e14", "#fb8c00"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-orange-300">{payload[0].value} orders</p>
      </div>
    );
  }
  return null;
};

const RankBadge = ({ index }) => {
  return (
    <div
      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold
        ${index === 0 ? "bg-yellow-100 text-yellow-600" : ""}
        ${index === 1 ? "bg-gray-100 text-gray-600" : ""}
        ${index === 2 ? "bg-orange-100 text-orange-600" : ""}
        ${index > 2 ? "bg-stone-100 text-stone-500" : ""}
      `}
    >
      {index + 1}
    </div>
  );
};

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/ecommerce/dashboard");
        const data = res.data;

        setStats([
          {
            title: "Total Users",
            value: data.totalUsers,
            icon: <FaUsers />,
            iconBg: "bg-sky-100 text-sky-500",
          },
          {
            title: "Total Products",
            value: data.totalProducts,
            icon: <FaBox />,
            iconBg: "bg-violet-100 text-violet-500",
          },
          {
            title: "Total Orders",
            value: data.totalOrders,
            icon: <FaShoppingCart />,
            iconBg: "bg-emerald-100 text-emerald-500",
          },
          {
            title: "Revenue",
            value: `₹${data.revenue?.toLocaleString("en-IN")}`,
            icon: <FaRupeeSign />,
            iconBg: "bg-orange-100 text-orange-500",
          },
        ]);

        setOrderData(data.weeklyOrders || []);
        setProductData(data.categoryDistribution || []);
        setTopCustomers(data.topCustomers || []);
        setBestProducts(data.bestProducts || []);
      } catch (err) {
        console.error("Dashboard Error:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
  {stats.map((item, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition flex items-center"
    >
      {/* LEFT ICON */}
      <div
        className={`w-20 h-20 rounded-xl flex items-center justify-center text-lg mr-4 ${item.iconBg}`}
      >
        {item.icon}
      </div>

      {/* RIGHT CONTENT */}
      <div>
        <p className="text-xl text-stone-500">
          {item.title}
        </p>
        <p className="text-2xl font-semibold text-stone-800">
          {item.value}
        </p>
      </div>
    </div>
  ))}
</div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">

        {/* Line Chart */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h3 className="text-base font-semibold text-stone-800 mb-4">
            Orders Overview
          </h3>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={orderData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#f97316"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h3 className="text-base font-semibold text-stone-800 mb-4">
            Product Distribution
          </h3>

          <div className="flex items-center gap-6">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={productData} dataKey="value" innerRadius={45} outerRadius={85}>
                  {productData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col gap-3">
              {productData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="text-sm font-medium">{entry.name}</p>
                    <p className="text-xs text-stone-500">{entry.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-5">

        {/* Top Customers */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h3 className="text-base font-semibold mb-4">Top Customers</h3>

          {topCustomers.map((cust, index) => (
            <div
              key={cust.id || index}
              className="flex justify-between items-center p-3 rounded-xl hover:bg-stone-50 transition"
            >
              <div className="flex items-center gap-3">
                <RankBadge index={index} />

                <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold">
                  {cust.name?.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-medium">{cust.name}</p>
                  <p className="text-xs text-stone-500">
                    {cust.totalOrders} orders
                  </p>

                  <div className="w-full bg-stone-100 h-1.5 rounded-full mt-1">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
                      style={{
                        width: `${(cust.totalSpent / (topCustomers[0]?.totalSpent || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-sm font-semibold">
                ₹{cust.totalSpent?.toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>

        {/* Best Products */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h3 className="text-base font-semibold mb-4">Best Selling Products</h3>

          {bestProducts.map((prod, index) => (
            <div
              key={prod.id || index}
              className="flex justify-between items-center p-3 rounded-xl hover:bg-stone-50 transition"
            >
              <div className="flex items-center gap-3">
                <RankBadge index={index} />

                <div className="w-9 h-9 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center font-semibold">
                  {prod.name?.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-medium">{prod.name}</p>
                  <p className="text-xs text-stone-500">
                    {prod.totalSold} sold
                  </p>

                  <div className="w-full bg-stone-100 h-1.5 rounded-full mt-1">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-violet-500"
                      style={{
                        width: `${(prod.totalSold / (bestProducts[0]?.totalSold || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-sm font-semibold">
                ₹{prod.revenue?.toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;