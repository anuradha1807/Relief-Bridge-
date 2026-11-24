import { useState } from 'react';
import { IndianRupee, Heart, Users, CheckCircle2, X } from 'lucide-react';

export default function CampaignDetail() {
  // States for Modals
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  // State for Pledge Form
  const [pledgeType, setPledgeType] = useState('MONEY');
  const [pledgeAmount, setPledgeAmount] = useState('');
  
  // State for Apply Form
  const [applyMessage, setApplyMessage] = useState('');

  // Mock Data for the Campaign
  const campaign = {
    title: "Kolhapur Flood Relief",
    org: "Seva Foundation",
    description: "Heavy rains have caused severe flooding in the Kolhapur district. Thousands of families are stranded without food, clean water, and shelter. We are raising funds and supplies to provide immediate relief.",
    raised: 45000,
    goal: 100000,
    spent: 15000,
    volunteersNeeded: 20,
    items: [
      { name: "Rice", needed: 500, received: 350, unit: "kg" },
      { name: "Blankets", needed: 200, received: 80, unit: "pcs" },
      { name: "Drinking Water", needed: 1000, received: 1000, unit: "liters" }
    ],
    updates: [
      { id: 1, date: "Oct 24, 2026", text: "Purchased 50 food kits from local vendor. Receipt attached.", amount: 15000 },
      { id: 2, date: "Oct 22, 2026", text: "Relief camp set up at Ward 4 school. 30 families accommodated." }
    ]
  };

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    alert(`Pledged ${pledgeType === 'MONEY' ? '₹' + pledgeAmount : 'Items'} successfully!`);
    setIsPledgeModalOpen(false);
    setPledgeAmount('');
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    alert("Application sent to the NGO! They will review your profile.");
    setIsApplyModalOpen(false);
    setApplyMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Campaign Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="h-48 bg-blue-900 relative">
           <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80" alt="Flood" className="w-full h-full object-cover opacity-60" />
           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-blue-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
             ACTIVE CAMPAIGN
           </div>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{campaign.title}</h1>
              <p className="text-blue-600 font-semibold mb-4">Organized by {campaign.org}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsApplyModalOpen(true)}
                className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition flex items-center gap-2"
              >
                <Users size={18} /> Apply to Volunteer
              </button>
              <button 
                onClick={() => setIsPledgeModalOpen(true)}
                className="bg-[#1E3A8A] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-800 transition shadow-md flex items-center gap-2"
              >
                <Heart size={18} /> Pledge Now
              </button>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mt-4">{campaign.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Needs and Updates */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Items Needed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-6">Items Needed</h2>
            <div className="space-y-5">
              {campaign.items.map((item, idx) => {
                const percent = Math.min((item.received / item.needed) * 100, 100);
                return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-bold text-gray-800 mb-1">
                      <span>{item.name}</span>
                      <span>{item.received} / {item.needed} {item.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${percent === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transparency Updates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-6">Transparency Updates</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-gray-100">
              {campaign.updates.map(update => (
                <div key={update.id} className="relative flex gap-4 items-start">
                  <div className="h-4 w-4 rounded-full bg-blue-500 border-4 border-white shadow-sm z-10 mt-1"></div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex-1">
                    <p className="text-xs text-gray-500 font-bold mb-1">{update.date}</p>
                    <p className="text-gray-800 text-sm">{update.text}</p>
                    {update.amount && (
                      <p className="text-sm font-bold text-red-500 mt-2 flex items-center gap-1">
                        <IndianRupee size={14} /> {update.amount} spent
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Ledger */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-500" /> Transparency Ledger
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Money Raised</p>
                <p className="text-2xl font-bold text-green-600">₹{campaign.raised.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Money Spent</p>
                <p className="text-2xl font-bold text-red-500">₹{campaign.spent.toLocaleString()}</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Goal</p>
                <p className="text-xl font-bold text-gray-800">₹{campaign.goal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- PLEDGE MODAL --- */}
      {isPledgeModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-[#1E3A8A]">Make a Pledge</h2>
              <button onClick={() => setIsPledgeModalOpen(false)} className="text-gray-400 hover:text-red-500"><X size={24} /></button>
            </div>
            <form onSubmit={handlePledgeSubmit} className="p-6 space-y-4">
              <div className="flex gap-4 mb-4">
                <button type="button" onClick={() => setPledgeType('MONEY')} className={`flex-1 py-2 rounded-lg border font-bold ${pledgeType === 'MONEY' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-600'}`}>Money</button>
                <button type="button" onClick={() => setPledgeType('ITEM')} className={`flex-1 py-2 rounded-lg border font-bold ${pledgeType === 'ITEM' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-600'}`}>Items</button>
              </div>
              
              {pledgeType === 'MONEY' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input type="number" required value={pledgeAmount} onChange={(e) => setPledgeAmount(e.target.value)} placeholder="e.g. 1000" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500" />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Details</label>
                  <input type="text" required placeholder="e.g. 10 kg Rice" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500" />
                </div>
              )}

              <button type="submit" className="w-full bg-[#1E3A8A] text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition mt-2 shadow-md">Confirm Pledge</button>
            </form>
          </div>
        </div>
      )}

      {/* --- APPLY MODAL --- */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-[#1E3A8A]">Apply as Volunteer</h2>
              <button onClick={() => setIsApplyModalOpen(false)} className="text-gray-400 hover:text-red-500"><X size={24} /></button>
            </div>
            <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Message</label>
                <textarea rows="4" required value={applyMessage} onChange={(e) => setApplyMessage(e.target.value)} placeholder="Why do you want to volunteer for this campaign?" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#1E3A8A] text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-md">Submit Application</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}