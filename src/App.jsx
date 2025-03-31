import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import CheckReports from './pages/CheckReports/CheckReports';
import ReportIssues from './pages/ReportIssues/ReportIssues';
import Notifications from './pages/Notifications/Notifications';
import ShareFiles from './pages/ShareFiles/ShareFiles';
import StudyGroup from './pages/StudyGroup/StudyGroup';
import Guidelines from './pages/Guidelines/Guidelines';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/guidelines" element={<Guidelines />} />

        {/* Admin-only Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-reports"
          element={
            <ProtectedRoute role="admin">
              <CheckReports />
            </ProtectedRoute>
          }
        />

        {/* User-only Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-issues"
          element={
            <ProtectedRoute role="user">
              <ReportIssues />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute role="user">
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/share-files"
          element={
            <ProtectedRoute role="user">
              <ShareFiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-group"
          element={
            <ProtectedRoute role="user">
              <StudyGroup />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;