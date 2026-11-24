import { BarChart3, Download, TrendingUp, IndianRupee, Users } from 'lucide-react';

export default function Reports() {
  const monthlyData = [
    { month: 'Jul', height: '40%' },
    { month: 'Aug', height: '70%' },
    { month: 'Sep', height: '55%' },
    { month: 'Oct', height: '90%' },
    { month: 'Nov', height: '65%' },
    { month: 'Dec', height: '100%' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Impact Reports</h1>
          <p className="text-gray-500 mt-2 pl-4">Track your platform's growth, donations, and relief efforts.</p>
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition flex items-center gap-2 shadow-sm">
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="h-14 w-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><IndianRupee size={28} /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Funds Raised</p>
            <p className="text-2xl font-bold text-gray-800">₹1,24,50,000</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Users size={28} /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Volunteers</p>
            <p className="text-2xl font-bold text-gray-800">4,850</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="h-14 w-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center"><TrendingUp size={28} /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Lives Impacted</p>
            <p className="text-2xl font-bold text-gray-800">12,000+</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2"><BarChart3 size={20} /> Monthly Donation Trend</h2>
          
          <div className="h-64 flex items-end justify-between gap-4 pt-4 border-b border-gray-100 pb-2">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group">
                <div className="w-full max-w-[40px] bg-blue-100 rounded-t-md relative group-hover:bg-blue-200 transition-all" style={{ height: data.height }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{Math.floor(Math.random() * 20 + 10)}L
                  </div>
                </div>
                <span className="text-sm text-gray-500 mt-2 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-6">Recent Transfers</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">To: Seva Foundation</p>
                  <p className="text-xs text-gray-400">Oct {20 + i}, 2026</p>
                </div>
                <p className="font-bold text-green-600">₹{(i * 25000).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}