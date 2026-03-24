import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priceFilter, setPriceFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [userMap, setUserMap] = useState({});

   // Fetch all users once to create userMap
   const fetchUsers = async () => {
    try {
      const res = await API.get("/users/customers");
      const map = {};
      res.data.forEach(user => {
        map[user.id] = user.name;
      });
      setUserMap(map);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
  
      // For each order, fetch username
      const ordersWithUsernames = res.data.map(order => ({
        ...order,
        name: userMap[order.userId] || "Unknown",
      }));
      setOrders(ordersWithUsernames);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/orders/${id}/status?status=${status}`
      );
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers(); // fetch users first
  }, []);

  // refetch orders whenever userMap is ready
  useEffect(() => {
    if (Object.keys(userMap).length > 0) {
      fetchOrders();
    }
  }, [userMap]);


  // 🔍 FILTER LOGIC
  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (statusFilter !== "ALL" && order.status !== statusFilter) {
      return false;
    }
  
    // Price filter (user input)
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    if (order.totalPrice < min || order.totalPrice > max) return false;
  
    // Search (userId for now)
     // Search by username
     if (search && !order.name.toLowerCase().includes(search.toLowerCase()))
      {return false;}
  
    return true;
  });

  const statusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-700";
      case "SHIPPED":
        return "bg-blue-100 text-blue-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">

      {/* 🔥 TOP CONTROLS */}
      <div className="flex gap-4 mb-6 flex-wrap">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by Username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="ALL">All Status</option>
          <option value="PLACED">PLACED</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        {/* Price Filter */}
       {/* Price Filter */}
<div className="flex gap-2 items-center">
  <input
    type="number"
    placeholder="Min Price"
    value={minPrice}
    min="0"
    onChange={(e) =>
      setMinPrice(e.target.value < 0 ? "0" : e.target.value)
    }
    className="border px-1 py-2 rounded-md w-24"
  />
  <span>-</span>
  <input
    type="number"
    placeholder="Max Price"
    value={maxPrice}
    min="0"
    onChange={(e) =>
      setMaxPrice(e.target.value < 0 ? "0" : e.target.value)
    }
    className="border px-1 py-2 rounded-md w-24"
  />

  {/* Reset Price Filter Button */}
  <button
    onClick={() => {
      setMinPrice("");
      setMaxPrice("");
    }}
    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
  >
    Reset Price Filter
  </button>
</div>
      </div>

      {/* 📦 TABLE */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-50 text-gray-6000 uppercase text-s">
            <tr>
              <th className="px-4 py-3 text-left">ORDER ID</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Update</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredOrders.map((order) => (
              <>
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setSelectedOrder(
                      selectedOrder?.id === order.id ? null : order
                    )
                  }
                >
                  <td className="px-4 py-3 font-medium text-left">{order.id}</td>
                  <td className="px-4 py-3 text-left">{order.name}</td>
                  <td className="px-4 py-3 font-semibold text-left">
                    ₹{order.totalPrice}
                  </td>

                  <td className="px-4 py-3 text-left">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-left">
                    {order.orderDate?.slice(0, 10)}
                  </td>

                  <td className="px-4 py-3 text-left">
                    <select
                      value={order.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="PLACED">PLACED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>

                {/* 🔥 ORDER DETAILS */}
                {selectedOrder?.id === order.id && (
                  <tr>
                    <td colSpan="6" className="bg-gray-50 p-4">
                      <div>
                        <h3 className="font-semibold mb-2">
                          Order Items
                        </h3>

                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between border-b py-2"
                          >
                            <span>{item.productName}</span>
                            <span>
                              {item.quantity} × ₹{item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;