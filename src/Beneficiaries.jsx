import { UserCircle, MapPin, CheckCircle } from 'lucide-react';

export default function Beneficiaries() {
  const beneficiaries = [
    { id: 1, name: "Ramesh Patil", location: "Ward 4, Kolhapur", need: "Medical Aid", status: "Helped" },
    { id: 2, name: "Sunita Devi", location: "Sangli Camp", need: "Food & Water", status: "Pending" },
    { id: 3, name: "Abdul Khan", location: "Satara Shelter", need: "Blankets", status: "Helped" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Beneficiaries</h1>
        <p className="text-gray-500 mt-2 pl-4">Track individuals and families receiving relief.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beneficiaries.map((person) => (
          <div key={person.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <UserCircle size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{person.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {person.location}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
              <p className="text-sm text-gray-500 font-medium">Primary Need:</p>
              <p className="font-semibold text-gray-800">{person.need}</p>
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                person.status === 'Helped' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {person.status}
              </span>
              <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                <CheckCircle size={14} /> Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}