import { useEffect, useState } from "react";
import API from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/customers"); // only users
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Toggle Status
  const toggleStatus = async () => {
    if (!selectedUser) return;
  
    try {
      const newStatus =
        selectedUser.status === "Active" ? "Inactive" : "Active";
  
      await API.put(
        `/users/${selectedUser.id}/status?status=${newStatus}`
      );
  
      setShowModal(false);
      setSelectedUser(null);
      fetchUsers();
  
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Filter Logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || u.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* 🔹 Search + Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4">

        <input
          type="text"
          placeholder="Search by name or email..."
          className="border px-4 py-2 rounded-md text-sm w-72 outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded-md text-sm outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      {/* 🔹 Table */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">

        {loading ? (
          <p className="text-gray-500 text-sm">Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-sm">No users found</p>
        ) : (
          <table className="w-full text-s">

            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b last:border-none">

                  <td className="py-4">{user.id}</td>

                  <td className="font-medium">{user.name}</td>

                  <td className="text-gray-500">{user.email}</td>

                  {/* Status */}
                  <td>
                    <span className={`px-2 py-1 rounded text-s font-medium
                      ${user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"}
                    `}>
                      {user.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                      className={`px-3 py-1 rounded text-s font-medium
                        ${user.status === "Active"
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"}
                      `}
                    >
                      {user.status === "Active" ? "Disable" : "Enable"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl p-6 w-80 shadow-lg">

      <h2 className="text-lg font-semibold mb-2">
        Confirm Action
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Are you sure you want to{" "}
        <span className="font-medium">
          {selectedUser?.status === "Active" ? "disable" : "enable"}
        </span>{" "}
        this user?
      </p>

      <div className="flex justify-end gap-3">

        {/* Cancel */}
        <button
          onClick={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          className="px-4 py-2 text-sm rounded-md border"
        >
          Cancel
        </button>

        {/* Confirm */}
        <button
          onClick={toggleStatus}
          className={`px-4 py-2 text-sm rounded-md text-white
            ${selectedUser?.status === "Active"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"}
          `}
        >
          {selectedUser?.status === "Active" ? "Disable" : "Enable"}
        </button>

      </div>
    </div>
  </div>
)}
    </div>
  );
  
}

export default Users;