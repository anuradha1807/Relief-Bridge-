import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight, IndianRupee, CheckCircle2, Activity, Megaphone, Heart, Wheat, Bed } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- ADDED LINK
import bannerImage from './assets/banner-image.png';
import riceImg from './assets/rice.png';
import blanketImg from './assets/blanket.png';

export default function Heatmap() {
  const center = [17.0500, 74.2800]; 

  return (
    <div className="pb-10 max-w-[1400px] mx-auto">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1E3A8A] border-l-4 border-blue-600 pl-4">Good Morning, Anuradha 👋</h1>
        <p className="text-gray-600 mt-1 pl-4 font-medium">Together, we can rebuild lives and bring hope.</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#FFF1F2] rounded-xl border border-red-100 p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
          <div>
            <p className="text-gray-800 font-semibold text-sm">Active Disasters</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-3xl font-bold text-red-600 leading-none">3</p>
              <span className="text-xs text-red-500 font-bold">↑ 1</span>
            </div>
          </div>
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm text-2xl">⚠️</div>
        </div>
        
        <div className="bg-[#EFF6FF] rounded-xl border border-blue-100 p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
          <div>
            <p className="text-gray-800 font-semibold text-sm">Volunteers Active</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-3xl font-bold text-blue-600 leading-none">1,250+</p>
              <span className="text-xs text-green-600 font-bold">↑ 12%</span>
            </div>
          </div>
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm text-2xl">👥</div>
        </div>
        
        <div className="bg-[#ECFDF5] rounded-xl border border-green-100 p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
          <div>
            <p className="text-gray-800 font-semibold text-sm">Donations Today</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-3xl font-bold text-green-600 leading-none">₹8.5L</p>
              <span className="text-xs text-green-600 font-bold">↑ 18%</span>
            </div>
          </div>
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm text-2xl">💚</div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Satellite Map */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-4 pl-2 pr-2">
            <h2 className="text-lg font-bold text-[#1E3A8A] flex items-center gap-2">
              📍 Disaster Overview
            </h2>
            <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span> Live
            </span>
          </div>
          
          <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200 relative">
            <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%', background: '#0a192f' }}>
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              
              {/* Kolhapur */}
              <CircleMarker center={[16.7032, 74.2434]} radius={45} pathOptions={{ stroke: false, fillColor: '#EF4444', fillOpacity: 0.2 }} />
              <CircleMarker center={[16.7032, 74.2434]} radius={12} pathOptions={{ color: '#fff', weight: 2, fillColor: '#EF4444', fillOpacity: 1 }}><Popup>Severe Disaster: Kolhapur Floods</Popup></CircleMarker>

              {/* Sangli */}
              <CircleMarker center={[16.8524, 74.5815]} radius={35} pathOptions={{ stroke: false, fillColor: '#F59E0B', fillOpacity: 0.2 }} />
              <CircleMarker center={[16.8524, 74.5815]} radius={10} pathOptions={{ color: '#fff', weight: 2, fillColor: '#F59E0B', fillOpacity: 1 }}><Popup>Moderate Impact: Sangli Camp</Popup></CircleMarker>

              {/* Satara */}
              <CircleMarker center={[17.6805, 74.0183]} radius={30} pathOptions={{ stroke: false, fillColor: '#22C55E', fillOpacity: 0.2 }} />
              <CircleMarker center={[17.6805, 74.0183]} radius={8} pathOptions={{ color: '#fff', weight: 2, fillColor: '#22C55E', fillOpacity: 1 }}><Popup>Under Control: Satara Shelter</Popup></CircleMarker>
            </MapContainer>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md p-3 rounded-lg text-white text-xs space-y-2 z-[1000] border border-white/20">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></span> Severe Disaster</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_#f59e0b]"></span> Moderate Impact</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span> Under Control</div>
            </div>
            
            <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-blue-900 font-bold px-4 py-2 rounded-lg text-sm shadow-md z-[1000] hover:bg-white">View Details →</button>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full lg:w-[380px] flex flex-col gap-6">
          
          {/* Items Needed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#1E3A8A] flex items-center gap-2">
                <span className="text-xl">📦</span> Items Needed
              </h2>
              <button className="text-sm font-semibold text-blue-600 hover:underline">View All →</button>
            </div>
            
            <div className="space-y-6">
              {/* Rice */}
              <div className="flex items-center gap-4">
                <img src={riceImg} alt="Rice Bag" className="w-14 h-14 object-contain mix-blend-multiply" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1 font-bold text-gray-800">
                    <span>Rice</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">12,500 kg needed</p>
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#2563EB] h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">75%</span>
                  </div>
                </div>
              </div>

              {/* Blankets */}
              <div className="flex items-center gap-4">
                <img src={blanketImg} alt="Blankets" className="w-14 h-14 object-contain mix-blend-multiply" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1 font-bold text-gray-800">
                    <span>Blankets</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">8,000 pcs needed</p>
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#22C55E] h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transparency Ledger */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1E3A8A] flex items-center gap-2">
                 <div className="bg-green-100 p-1.5 rounded-md text-green-600"><CheckCircle2 size={16} /></div> Transparency Ledger
              </h2>
              <button className="text-sm font-semibold text-blue-600 hover:underline">View Full Report →</button>
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <div className="flex-1 border-r border-gray-100 pr-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-[#ECFDF5] text-green-600 rounded-full flex items-center justify-center font-bold text-lg"><IndianRupee size={18} /></div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">₹34.2L</p>
                    <p className="text-xs text-gray-500 font-medium">Money Raised</p>
                  </div>
                </div>
                <p className="text-xs text-green-600 font-semibold">↑ 12% from last week</p>
              </div>
              <div className="flex-1 pl-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-[#FFF1F2] text-red-500 rounded-full flex items-center justify-center font-bold text-lg"><Heart size={18} /></div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">₹28.7L</p>
                    <p className="text-xs text-gray-500 font-medium">Money Spent</p>
                  </div>
                </div>
                <p className="text-xs text-red-500 font-semibold">↑ 8% from last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Relief Campaigns (NOW CLICKABLE) */}
        <Link to="/campaign-detail" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition block">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-bold text-[#1E3A8A] flex items-center gap-2"><Megaphone size={18} /> Active Relief Campaigns</h2>
            <span className="text-sm font-semibold text-blue-600 hover:underline">View All →</span>
          </div>
          <div className="flex gap-4 items-center">
             <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&q=80" alt="Flood Rescue" className="w-24 h-24 rounded-lg object-cover shadow-sm bg-gray-100" />
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-1">
                 <h3 className="font-bold text-gray-800 text-sm hover:text-blue-600 transition">Flood Relief Operation - Assam</h3>
                 <span className="bg-[#ECFDF5] text-green-600 border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
               </div>
               <p className="text-xs text-gray-500 mb-3">Providing food, water and medical aid.</p>
               <div className="flex items-center gap-3">
                 <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-[#22C55E] h-2 rounded-full" style={{ width: '72%' }}></div>
                 </div>
                 <span className="text-sm font-bold text-gray-700">72%</span>
               </div>
             </div>
          </div>
        </Link>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-bold text-[#1E3A8A] flex items-center gap-2"><Activity size={18} /> Recent Activities</h2>
            <button className="text-sm font-semibold text-blue-600 hover:underline">View All →</button>
          </div>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[10px] before:h-full before:w-[2px] before:bg-gray-100">
            <div className="relative flex items-center gap-4">
              <div className="h-5 w-5 rounded-full bg-[#ECFDF5] border border-green-500 text-green-600 flex items-center justify-center z-10 text-[10px]"><IndianRupee size={10} /></div>
              <div className="flex-1 flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-700">New donation of ₹50,000 received</p>
                <p className="text-xs text-gray-400">2 min ago</p>
              </div>
            </div>
             <div className="relative flex items-center gap-4">
              <div className="h-5 w-5 rounded-full bg-[#ECFDF5] border border-green-500 text-green-600 flex items-center justify-center z-10 text-[10px]"><CheckCircle2 size={10} /></div>
              <div className="flex-1 flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-700">Volunteer application approved</p>
                <p className="text-xs text-gray-400">5 min ago</p>
              </div>
            </div>
             <div className="relative flex items-center gap-4">
              <div className="h-5 w-5 rounded-full bg-blue-50 border border-blue-500 text-blue-600 flex items-center justify-center z-10 text-[10px]"><Activity size={10} /></div>
              <div className="flex-1 flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-700">Relief task updated: "Medical Aid Delivery"</p>
                <p className="text-xs text-gray-400">10 min ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative rounded-xl overflow-hidden shadow-sm h-full min-h-[180px]">
          <img 
            src={bannerImage} 
            alt="Stronger Together" 
            className="absolute inset-0 w-full h-full object-cover rounded-xl" 
          />
        </div>

      </div>
    </div>
  );
}