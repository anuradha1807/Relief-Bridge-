export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Account Settings</h1>
        <p className="text-gray-500 mt-2 pl-4">Manage your profile and notification preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-bold text-blue-900 mb-6 border-b pb-2">Profile Information</h2>
        
        <div className="flex items-center gap-6 mb-6">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm" />
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">Change Avatar</button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" defaultValue="Anuradha K." className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" defaultValue="anuradha@reliefbridge.com" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 bg-gray-50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input type="text" defaultValue="System Administrator" disabled className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed" />
          </div>
          <button type="button" className="bg-[#1E3A8A] text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition shadow-md mt-4">Save Changes</button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-6 border-b pb-2">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive daily updates about new disasters and campaigns.</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="font-semibold text-gray-800">SMS Alerts</p>
              <p className="text-sm text-gray-500">Get urgent text messages for severe disasters in your area.</p>
            </div>
            <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}