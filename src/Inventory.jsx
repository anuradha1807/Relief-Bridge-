import { Box, Plus, Search } from 'lucide-react';

export default function Inventory() {
  const items = [
    { id: 1, name: "Rice Bags (25kg)", category: "Food", stock: 120, status: "In Stock" },
    { id: 2, name: "Blankets", category: "Shelter", stock: 45, status: "Low Stock" },
    { id: 3, name: "First Aid Kits", category: "Medical", stock: 200, status: "In Stock" },
    { id: 4, name: "Drinking Water (1L)", category: "Food", stock: 0, status: "Out of Stock" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Inventory Management</h1>
          <p className="text-gray-500 mt-2 pl-4">Track relief supplies and stock levels.</p>
        </div>
        <button className="bg-[#1E3A8A] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-800 transition flex items-center gap-2 shadow-md">
          <Plus size={18} /> Add Item
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Search inventory..." className="bg-transparent border-none outline-none ml-2 text-sm w-full" />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold">Item Name</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-bold text-gray-800 flex items-center gap-2">
                  <Box size={16} className="text-gray-400" /> {item.name}
                </td>
                <td className="p-4 text-gray-600">{item.category}</td>
                <td className="p-4 text-gray-800 font-semibold">{item.stock}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}