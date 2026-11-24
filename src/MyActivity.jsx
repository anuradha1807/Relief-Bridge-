import { useState } from 'react';
import { IndianRupee, CheckCircle2, Heart } from 'lucide-react';

export default function MyActivity() {
  // 1. State for Pledges
  const [pledges] = useState([
    { id: 1, campaign: "Kolhapur Flood Relief", detail: "₹1,000 donation", status: "RECEIVED" },
    { id: 2, campaign: "Kolhapur Flood Relief", detail: "25 kg Rice", status: "PLEDGED" },
    { id: 3, campaign: "Panhala Shelter Camp", detail: "₹500 donation", status: "PLEDGED" }
  ]);

  // 2. State for Tasks
  const [tasks, setTasks] = useState([
    { id: 1, campaign: "Kolhapur Flood Relief", title: "Distribute food packets", details: "Report to Ward 4 school at 8 AM. Bring ID card.", status: "ASSIGNED" },
    { id: 2, campaign: "Panhala Shelter Camp", title: "Shelter Setup", details: "", status: "APPLIED" },
    { id: 3, campaign: "Ravaneshwar Medical Camp", title: "Medical Assistance", details: "", status: "DONE" }
  ]);

  // 3. Handler for Mark as Done
  const handleMarkDone = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: "DONE" } : task
    ));
  };

  // Calculate stats dynamically
  const tasksDone = tasks.filter(t => t.status === 'DONE').length;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">My Activity</h1>
        <p className="text-gray-500 mt-2 pl-4">Your kindness, tracked from pledge to proof.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#E0E7FF] rounded-xl p-6 border border-blue-100">
          <p className="text-blue-900 font-semibold mb-2">Pledges</p>
          <p className="text-4xl font-bold text-blue-900">{pledges.length}</p>
        </div>
        <div className="bg-[#D1FAE5] rounded-xl p-6 border border-green-100">
          <p className="text-green-900 font-semibold mb-2">Money received by NGOs</p>
          <p className="text-4xl font-bold text-green-900">₹1,000</p>
        </div>
        <div className="bg-[#FEF3C7] rounded-xl p-6 border border-yellow-100">
          <p className="text-yellow-900 font-semibold mb-2">Tasks done</p>
          {/* This dynamically updates when you click Mark as Done! */}
          <p className="text-4xl font-bold text-yellow-900">{tasksDone}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Pledges List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-6">My Pledges</h2>
          <div className="space-y-4">
            {pledges.map((pledge) => (
              <div key={pledge.id} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-gray-800">{pledge.campaign}</p>
                  <p className="text-sm text-gray-500">{pledge.detail}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  pledge.status === 'RECEIVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {pledge.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* My Tasks List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-6">My Tasks</h2>
          <div className="space-y-4">
            
            {tasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 last:border-0 last:pb-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-gray-800">{task.campaign}</p>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    task.status === 'DONE' ? 'bg-green-100 text-green-700' : 
                    task.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
                
                {/* Task Details Box */}
                {task.status === 'ASSIGNED' && (
                  <div className="bg-white p-3 rounded-lg border border-gray-100 mb-3 shadow-sm">
                    <p className="font-semibold text-gray-800">{task.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{task.details}</p>
                  </div>
                )}

                {task.status === 'APPLIED' && (
                  <p className="text-sm text-gray-500 mb-3 italic">Waiting for NGO approval...</p>
                )}

                {task.status === 'DONE' && (
                  <p className="text-sm text-green-600 mb-1 font-medium flex items-center gap-1">
                    <CheckCircle2 size={14} /> Task completed successfully.
                  </p>
                )}

                {/* Mark as Done Button */}
                {task.status === 'ASSIGNED' && (
                  <button 
                    onClick={() => handleMarkDone(task.id)}
                    className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition shadow-sm"
                  >
                    Mark as done
                  </button>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}