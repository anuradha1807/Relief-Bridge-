import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Search, Bell, Home, Megaphone, Users, LayoutDashboard,
  Heart, Box, UserCircle, BarChart3, Settings, LogOut, ChevronDown
} from 'lucide-react';

import { useAuth } from './context/AuthContext';
import logo from './assets/brand-logo.png';
import mountainHeader from './assets/mountain.png';

export default function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // State for the profile dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentRole = user?.role || 'CITIZEN';

  const allNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} strokeWidth={1.8} />, roles: ['ADMIN', 'NGO', 'CITIZEN'] },
    { name: 'NGO Panel', path: '/ngo', icon: <LayoutDashboard size={20} strokeWidth={1.8} />, roles: ['ADMIN', 'NGO'] },
    { name: 'Campaigns', path: '/manage-campaign', icon: <Megaphone size={20} strokeWidth={1.8} />, roles: ['ADMIN', 'NGO'] },
    { name: 'Volunteers', path: '/volunteer-matching', icon: <Users size={20} strokeWidth={1.8} />, roles: ['ADMIN', 'NGO'] },
    { name: 'My Activity', path: '/my-activity', icon: <Heart size={20} strokeWidth={1.8} />, roles: ['CITIZEN'] },
    { name: 'Inventory', path: '/inventory', icon: <Box size={20} strokeWidth={1.8} />, roles: ['ADMIN', 'NGO'] },
    { name: 'Beneficiaries', path: '/beneficiaries', icon: <UserCircle size={20} strokeWidth={1.8} />, roles: ['ADMIN', 'NGO'] },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} strokeWidth={1.8} />, roles: ['ADMIN', 'NGO'] },
    { name: 'Notifications', path: '/notifications', icon: <Bell size={20} strokeWidth={1.8} />, badge: 3, roles: ['ADMIN', 'NGO', 'CITIZEN'] },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} strokeWidth={1.8} />, roles: ['ADMIN', 'NGO', 'CITIZEN'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(currentRole));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#081A45] text-white flex flex-col shadow-2xl z-20 relative overflow-hidden h-full">

        <div className="bg-white py-4 px-4 flex flex-col items-center justify-center z-10 relative shrink-0">
          <img src={logo} alt="ReliefBridge Logo" className="w-[150px] h-auto object-contain" />
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto z-10 relative scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-[#2563EB] text-white shadow-md' : 'text-gray-100 hover:bg-white/10'
                }`
              }
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <span className="text-[15px] font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-[#EF4444] text-white text-[11px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-[#F8FAFC]">

        {/* MOUNTAIN BACKGROUND */}
        <div
          className="absolute top-0 left-0 w-full h-72 bg-cover bg-top z-0"
          style={{ backgroundImage: `url(${mountainHeader})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FAFC]/70 to-[#F8FAFC]"></div>
        </div>

        {/* TOP NAVBAR */}
        <header className="relative z-20 h-20 flex items-center justify-between px-8 bg-transparent shrink-0 mt-2">

          <div className="flex items-center bg-white/70 backdrop-blur-md border border-white/40 rounded-full px-4 py-2.5 w-96 shadow-sm">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search campaigns, disasters, or resources... ⌘ K"
              className="bg-transparent border-none outline-none ml-3 text-sm w-full text-gray-800 placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-6">

            <div className="hidden md:flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700"><path d="M4 4h16"/><path d="M12 4v4"/><path d="M12 12v4"/><path d="M8 12h8"/><path d="M9 16h6"/><circle cx="12" cy="8" r="2"/><path d="m16 16 2 2"/><path d="m8 16-2 2"/><path d="M18 18h4"/><path d="M2 18h4"/></svg>
            </div>

            <div className="relative cursor-pointer">
              <Bell size={24} className="text-gray-700 hover:text-blue-600 transition" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">3</span>
            </div>

            {/* USER PROFILE DROPDOWN */}
            <div className="relative border-l pl-6 border-gray-300">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 focus:outline-none"
              >
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Profile" className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-gray-800 leading-tight">{user?.name || 'Guest'}</p>
                  <p className="text-xs text-gray-600 capitalize">{user?.role ? user.role.toLowerCase() : 'Not Logged In'}</p>
                </div>
                <ChevronDown size={16} className="text-gray-500 ml-2" />
              </button>

              {/* DROPDOWN MENU */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 font-semibold hover:bg-red-50 transition flex items-center gap-2"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative z-10 p-8">
           <Outlet />
        </main>
      </div>
    </div>
  );
}