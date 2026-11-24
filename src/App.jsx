import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';
import LoginRegister from './LoginRegister';
import NgoDashboard from './NgoDashboard';
import ManageCampaign from './ManageCampaign';
import MyActivity from './MyActivity';
import VolunteerMatching from './VolunteerMatching';
import Heatmap from './Heatmap';
import CampaignDetail from './CampaignDetail';
import Settings from './Settings';
import Reports from './Reports';
import Inventory from './Inventory';
import Beneficiaries from './Beneficiaries';

const Placeholder = ({ text }) => <div className="p-8 text-xl text-gray-500">{text}</div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginRegister />} />

          {/* Must be logged in */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* All roles */}
              <Route path="/dashboard" element={<Heatmap />} />
              <Route path="/campaign-detail" element={<CampaignDetail />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Placeholder text="No new notifications yet 🔔" />} />

              {/* Old admin link now opens the combined NGO Panel */}
              <Route path="/admin" element={<Navigate to="/ngo" replace />} />

              {/* NGO and Admin (one combined panel) */}
              <Route element={<ProtectedRoute roles={['NGO', 'ADMIN']} />}>
                <Route path="/ngo" element={<NgoDashboard />} />
                <Route path="/manage-campaign" element={<ManageCampaign />} />
                <Route path="/volunteer-matching" element={<VolunteerMatching />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/beneficiaries" element={<Beneficiaries />} />
                <Route path="/reports" element={<Reports />} />
              </Route>

              {/* Citizen only */}
              <Route element={<ProtectedRoute roles={['CITIZEN']} />}>
                <Route path="/my-activity" element={<MyActivity />} />
              </Route>

              <Route path="*" element={<Placeholder text="Page under construction 🚧" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;