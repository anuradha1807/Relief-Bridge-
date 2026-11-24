import { useState } from 'react';

export default function VolunteerMatching() {
  // 1. State for volunteers list
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "Sneha Reddy", initial: "S", status: "APPLIED", skills: ["First Aid", "Driving"], quote: "Available this weekend to help distribute supplies.", task: null },
    { id: 2, name: "Anjali Desai", initial: "A", status: "APPLIED", skills: ["First Aid", "Medical"], quote: "I am a nurse, let me know where to report.", task: null },
    { id: 3, name: "Vikram Singh", initial: "V", status: "APPLIED", skills: ["Cooking", "Logistics"], quote: "I can manage the community kitchen.", task: null },
    { id: 4, name: "Ravi Patil", initial: "R", status: "ASSIGNED", skills: ["First Aid", "Driving"], quote: "Can join at short notice.", task: "Medical camp, Ward 4" }
  ]);

  // 2. State for filtering
  const [activeSkill, setActiveSkill] = useState("All");
  const skillsList = ["All", "First Aid", "Driving", "Cooking", "Medical", "Logistics"];

  // 3. State for the Assign Task Form
  const [selectedVolunteer, setSelectedVolunteer] = useState(null); // Which volunteer is currently selected
  const [taskForm, setTaskForm] = useState({ title: '', details: '' });

  // 4. Handlers
  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!selectedVolunteer || !taskForm.title) return;

    // Update the volunteer's status and task
    setVolunteers(volunteers.map(v => 
      v.id === selectedVolunteer.id 
        ? { ...v, status: "ASSIGNED", task: taskForm.title } 
        : v
    ));

    // Reset form
    setSelectedVolunteer(null);
    setTaskForm({ title: '', details: '' });
  };

  const handleReject = (id) => {
    setVolunteers(volunteers.filter(v => v.id !== id));
    if (selectedVolunteer?.id === id) setSelectedVolunteer(null);
  };

  // Filter the list based on the selected skill pill
  const filteredVolunteers = activeSkill === "All" 
    ? volunteers 
    : volunteers.filter(v => v.skills.includes(activeSkill));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Volunteer Matching</h1>
        <p className="text-gray-500 mt-2 pl-4">Kolhapur Flood Relief · match volunteers to tasks by skill</p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-800">Pledges (2 pending)</button>
        <button className="px-6 py-3 font-bold text-blue-900 border-b-2 border-blue-600 bg-blue-50/50 rounded-t-lg">
          Volunteers ({volunteers.filter(v => v.status === 'APPLIED').length} new)
        </button>
        <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-800">Transparency Updates</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Volunteer Cards */}
        <div className="flex-1">
          
          {/* Skill Filter */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-sm font-semibold text-gray-600">Skills:</span>
            {skillsList.map(skill => (
              <button
                key={skill}
                onClick={() => setActiveSkill(skill)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeSkill === skill 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVolunteers.length === 0 ? (
              <p className="text-gray-500 col-span-2">No volunteers found for this skill.</p>
            ) : (
              filteredVolunteers.map(volunteer => (
                <div 
                  key={volunteer.id} 
                  className={`bg-white border rounded-xl p-5 shadow-sm transition-all ${
                    selectedVolunteer?.id === volunteer.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                        {volunteer.initial}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{volunteer.name}</h3>
                        <p className="text-xs text-green-600 font-medium">Matches: {volunteer.skills.join(', ')}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      volunteer.status === 'APPLIED' ? 'bg-yellow-100 text-yellow-700' : 
                      volunteer.status === 'ASSIGNED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {volunteer.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mb-3 mt-4">
                    {volunteer.skills.map(skill => (
                      <span key={skill} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600 italic mb-4">"{volunteer.quote}"</p>

                  {/* If task is assigned, show it */}
                  {volunteer.task && (
                    <div className="bg-blue-50 text-blue-800 text-sm font-semibold p-2 rounded mb-4">
                      Task: {volunteer.task}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedVolunteer(volunteer)}
                      className="flex-1 bg-[#1E3A8A] text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition text-sm"
                    >
                      Assign Task
                    </button>
                    <button 
                      onClick={() => handleReject(volunteer.id)}
                      className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg font-bold hover:bg-red-50 transition text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Assign Form */}
        <div className="w-full lg:w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit sticky top-8">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Assign a task</h2>
          <p className="text-xs text-gray-500 mb-4">
            {selectedVolunteer 
              ? `For ${selectedVolunteer.name}. They will get a notification.` 
              : "Select a volunteer from the left first."}
          </p>
          
          <form onSubmit={handleAssignTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task title</label>
              <input 
                type="text" 
                required
                disabled={!selectedVolunteer}
                value={taskForm.title}
                onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                placeholder="e.g. Medical camp, Ward 4" 
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
              <textarea 
                rows="4" 
                disabled={!selectedVolunteer}
                value={taskForm.details}
                onChange={(e) => setTaskForm({...taskForm, details: e.target.value})}
                placeholder="Where to report, when, what to bring..." 
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={!selectedVolunteer}
              className="w-full bg-[#1E3A8A] text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Assign and Notify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}