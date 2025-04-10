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
import CreateStudyGroup from './pages/CreateStudyGroup/CreateStudyGroup'; // ✅ Import added here
import JoinStudyGroup from './pages/JoinStudyGroup/JoinStudyGroup'; // ✅ Import added here
import GroupChat from './pages/GroupChat/GroupChat';

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
        <Route
          path="/create-study-group" // ✅ This is the missing route
          element={
            <ProtectedRoute role="user">
              <CreateStudyGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join-study-group" // ✅ Add the route for joining a study group
          element={
            <ProtectedRoute role="user">
              <JoinStudyGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join-study-group" // ✅ Add the route for joining a study group
          element={
            <ProtectedRoute role="user">
              <JoinStudyGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group-chat"
          element={
            <ProtectedRoute role="user">
              <GroupChat/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
