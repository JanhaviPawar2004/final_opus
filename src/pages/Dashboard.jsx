function Dashboard() {
    return (
  
      <div>
  
        <h1 className="text-2xl font-bold mb-6">
          Dashboard
        </h1>
  
        <div className="grid grid-cols-4 gap-6">
  
          <div className="bg-white p-6 rounded shadow">
            <h3>Total Users</h3>
            <p className="text-2xl font-bold">120</p>
          </div>
  
          <div className="bg-white p-6 rounded shadow">
            <h3>Total Products</h3>
            <p className="text-2xl font-bold">80</p>
          </div>
  
          <div className="bg-white p-6 rounded shadow">
            <h3>Total Orders</h3>
            <p className="text-2xl font-bold">45</p>
          </div>
  
          <div className="bg-white p-6 rounded shadow">
            <h3>Revenue</h3>
            <p className="text-2xl font-bold">₹25,000</p>
          </div>
  
        </div>
  
      </div>
  
    );
  }
  
  export default Dashboard;