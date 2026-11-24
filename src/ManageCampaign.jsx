import { useState } from 'react';

export default function ManageCampaign() {
  // 1. State for the pledges list
  const [pledges, setPledges] = useState([
    { id: 1, donor: "Rahul Sharma", type: "MONEY", details: "₹5,000", status: "PLEDGED" },
    { id: 2, donor: "Priya Patel", type: "ITEM", details: "50 × Rice", status: "PLEDGED" },
    { id: 3, donor: "Amit Kumar", type: "MONEY", details: "₹1,500", status: "RECEIVED" }
  ]);

  // 2. Function to update the status
  const handleMarkReceived = (id) => {
    setPledges(pledges.map(pledge => 
      pledge.id === id ? { ...pledge, status: "RECEIVED" } : pledge
    ));
  };

  // Calculate pending pledges dynamically
  const pendingCount = pledges.filter(p => p.status === 'PLEDGED').length;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Manage Campaign</h1>
        <p className="text-gray-500 mt-2 pl-4">Kolhapur Flood Relief · Campaign 1</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button className="px-6 py-3 font-bold text-blue-900 border-b-2 border-blue-600 bg-blue-50/50 rounded-t-lg">
          Pledges ({pendingCount} pending)
        </button>
        <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-800">Volunteers (2 new)</button>
        <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-800">Transparency Updates</button>
      </div>

      {/* Pledges Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-blue-900">Pledges to confirm</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold">Donor</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Details</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Map through the pledges state */}
            {pledges.map((pledge) => (
              <tr key={pledge.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-bold text-gray-800">{pledge.donor}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    pledge.type === 'MONEY' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {pledge.type}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{pledge.details}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    pledge.status === 'RECEIVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {pledge.status}
                  </span>
                </td>
                <td className="p-4">
                  {/* Only show the button if the status is PLEDGED */}
                  {pledge.status === 'PLEDGED' ? (
                    <button 
                      onClick={() => handleMarkReceived(pledge.id)}
                      className="bg-green-100 text-green-700 px-4 py-1.5 rounded-lg font-semibold hover:bg-green-200 transition"
                    >
                      Mark Received
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}