function Products() {
    return (
  
      <div>
  
        <h1 className="text-2xl font-bold mb-6">
          Products
        </h1>
  
        <table className="w-full bg-white rounded shadow">
  
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
  
          <tbody>
  
            <tr className="border-t">
              <td className="p-3">1</td>
              <td>Laptop</td>
              <td>₹50000</td>
              <td>20</td>
            </tr>
  
          </tbody>
  
        </table>
  
      </div>
  
    );
  }
  
  export default Products;