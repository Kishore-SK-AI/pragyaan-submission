import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { PatientAnalysisPage } from './pages/PatientAnalysis';
import { DashboardHome } from './pages/DashboardHome';
import { PriorityQueuePage } from './pages/PriorityQueue';
import { PatientCustom } from './pages/PatientCustom';
import { Inventory } from './pages/Inventory';
import { EMRUploadPage } from './pages/EMRUpload';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="queue" element={<PriorityQueuePage />} />
            <Route path="custom" element={<PatientCustom />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="emr-upload" element={<EMRUploadPage />} />
          </Route>

          {/* Standalone Tool Routes (wrapped in Public Layout for now, or separate) */}
          <Route element={<PublicLayout />}>
            <Route path="/patient-analysis" element={<PatientAnalysisPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
