import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const inputClass =
  'w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500';

export default function NgoDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  // ---------- Campaigns (NGO + Admin) ----------
  const [campaigns, setCampaigns] = useState([
    { id: 1, title: 'Kerala Flood Relief', status: 'ACTIVE', funding: 45, volunteers: 10, goal: 150000 },
    { id: 2, title: 'Assam Earthquake Shelter', status: 'ACTIVE', funding: 70, volunteers: 5, goal: 100000 },
    { id: 3, title: 'Cyclone Food Drive', status: 'CLOSED', funding: 100, volunteers: 20, goal: 100000 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ title: '', goal: '', volunteers: '' });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.title) return;
    setCampaigns([
      ...campaigns,
      {
        id: Date.now(),
        title: newCampaign.title,
        status: 'ACTIVE',
        funding: 0,
        volunteers: parseInt(newCampaign.volunteers) || 0,
        goal: parseInt(newCampaign.goal) || 0,
      },
    ]);
    setIsModalOpen(false);
    setNewCampaign({ title: '', goal: '', volunteers: '' });
  };

  // ---------- Disasters (Admin only) ----------
  const [disasters, setDisasters] = useState([
    { id: 1, title: 'Kolhapur Floods 2026', type: 'Flood', place: 'Kolhapur, Maharashtra', status: 'ACTIVE' },
    { id: 2, title: 'Assam Earthquake', type: 'Earthquake', place: 'Guwahati, Assam', status: 'CLOSED' },
  ]);
  const [disasterForm, setDisasterForm] = useState({ title: '', type: '', place: '' });

  const handleCreateDisaster = (e) => {
    e.preventDefault();
    if (!disasterForm.title) return;
    setDisasters([
      {
        id: Date.now(),
        title: disasterForm.title,
        type: disasterForm.type,
        place: disasterForm.place || 'Unknown Location',
        status: 'ACTIVE',
      },
      ...disasters,
    ]);
    setDisasterForm({ title: '', type: '', place: '' });
  };

  // ---------- NGO approvals (Admin only) ----------
  const [pendingNgos, setPendingNgos] = useState([
    { id: 1, name: 'Seva Foundation', reg: 'MH-2019-4471' },
    { id: 2, name: 'Asha Trust', reg: 'MH-2021-1180' },
  ]);
  const approveNgo = (id) => setPendingNgos(pendingNgos.filter((n) => n.id !== id));

  // ---------- Stats (calculated automatically) ----------
  const activeCampaigns = campaigns.filter((c) => c.status === 'ACTIVE');
  const volunteersNeeded = activeCampaigns.reduce((sum, c) => sum + c.volunteers, 0);
  const moneyGoal = activeCampaigns.reduce((sum, c) => sum + c.goal, 0);
  const activeDisasters = disasters.filter((d) => d.status === 'ACTIVE').length;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
          Welcome back, {user?.name || 'Seva Foundation'}
        </h1>
        <p className="text-gray-500 mt-2 pl-4">
          {isAdmin
            ? 'Run campaigns, open disasters and approve NGOs from one place.'
            : 'Thank you for serving. Every campaign you run brings hope.'}
        </p>
      </div>

      {/* Stat Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${isAdmin ? 'lg:grid-cols-4' : ''}`}>
        <div className="bg-[#E0E7FF] rounded-xl p-6 border border-blue-100">
          <p className="text-blue-900 font-semibold mb-2">Active Campaigns</p>
          <p className="text-4xl font-bold text-blue-900">{activeCampaigns.length}</p>
        </div>
        <div className="bg-[#D1FAE5] rounded-xl p-6 border border-green-100">
          <p className="text-green-900 font-semibold mb-2">Volunteers Needed</p>
          <p className="text-4xl font-bold text-green-900">{volunteersNeeded}</p>
        </div>
        <div className="bg-[#FEF3C7] rounded-xl p-6 border border-yellow-100">
          <p className="text-yellow-900 font-semibold mb-2">Total Money Goal</p>
          <p className="text-4xl font-bold text-yellow-900">₹{moneyGoal.toLocaleString('en-IN')}</p>
        </div>
        {isAdmin && (
          <div className="bg-[#FEE2E2] rounded-xl p-6 border border-red-100">
            <p className="text-red-900 font-semibold mb-2">Active Disasters</p>
            <p className="text-4xl font-bold text-red-900">{activeDisasters}</p>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-1 gap-8 ${isAdmin ? 'lg:grid-cols-3' : ''}`}>
        {/* LEFT: campaigns (+ disasters for admin) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Campaigns table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-900">My Campaigns</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#1E3A8A] text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-800 transition flex items-center gap-2"
              >
                <Plus size={18} /> Create Campaign
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <tr>
                    <th className="p-5 font-semibold">Campaign</th>
                    <th className="p-5 font-semibold">Status</th>
                    <th className="p-5 font-semibold">Funding</th>
                    <th className="p-5 font-semibold">Volunteers</th>
                    <th className="p-5 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50 transition">
                      <td className="p-5 font-bold text-gray-800">{campaign.title}</td>
                      <td className="p-5">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[150px]">
                          <div
                            className={`h-2.5 rounded-full ${campaign.status === 'ACTIVE' ? 'bg-blue-600' : 'bg-green-500'}`}
                            style={{ width: `${campaign.funding}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{campaign.funding}%</span>
                      </td>
                      <td className="p-5 text-gray-700">{campaign.volunteers}</td>
                      <td className="p-5">
                        <button
                          onClick={() => navigate('/manage-campaign')}
                          className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-semibold hover:bg-blue-100 transition"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Admin only: create disaster */}
          {isAdmin && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Create a disaster</h2>
              <form onSubmit={handleCreateDisaster} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={disasterForm.title}
                    onChange={(e) => setDisasterForm({ ...disasterForm, title: e.target.value })}
                    placeholder="e.g. Mumbai Floods 2026"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <input
                      type="text"
                      value={disasterForm.type}
                      onChange={(e) => setDisasterForm({ ...disasterForm, type: e.target.value })}
                      placeholder="Flood"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Place</label>
                    <input
                      type="text"
                      value={disasterForm.place}
                      onChange={(e) => setDisasterForm({ ...disasterForm, place: e.target.value })}
                      placeholder="District, State"
                      className={inputClass}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1E3A8A] text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition"
                >
                  Create disaster
                </button>
              </form>
            </div>
          )}

          {/* Admin only: all disasters */}
          {isAdmin && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">All disasters</h2>
              <div className="space-y-4">
                {disasters.map((d, index) => (
                  <div
                    key={d.id}
                    className={`flex justify-between items-center ${
                      index !== disasters.length - 1 ? 'border-b border-gray-100 pb-4' : 'pb-2'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-gray-800">{d.title}</p>
                      <p className="text-sm text-gray-500">
                        {d.place}
                        {d.type ? ` • ${d.type}` : ''}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        d.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: NGO approvals (Admin only) */}
        {isAdmin && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
            <h2 className="text-xl font-bold text-blue-900 mb-1">NGOs awaiting approval</h2>
            <p className="text-sm text-gray-500 mb-6">Check the registration number before approving.</p>
            <div className="space-y-4">
              {pendingNgos.length === 0 && (
                <p className="text-sm text-gray-500">All NGOs are approved. Nothing waiting.</p>
              )}
              {pendingNgos.map((ngo) => (
                <div key={ngo.id} className="border border-gray-200 rounded-xl p-4">
                  <p className="font-bold text-gray-800">{ngo.name}</p>
                  <p className="text-sm text-gray-500 mb-4">Reg. no. {ngo.reg}</p>
                  <button
                    onClick={() => approveNgo(ngo.id)}
                    className="w-full bg-[#22C55E] text-white font-bold py-2.5 rounded-lg hover:bg-green-600 transition"
                  >
                    Approve NGO
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: create campaign */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-[#1E3A8A]">Create New Campaign</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  placeholder="e.g. Mumbai Flood Relief"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Money Goal (₹)</label>
                <input
                  type="number"
                  value={newCampaign.goal}
                  onChange={(e) => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                  placeholder="e.g. 50000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volunteers Needed</label>
                <input
                  type="number"
                  value={newCampaign.volunteers}
                  onChange={(e) => setNewCampaign({ ...newCampaign, volunteers: e.target.value })}
                  placeholder="e.g. 15"
                  className={inputClass}
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1E3A8A] text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-md"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}