import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Guidelines from './Guidelines';
import Dashboard from './Dashboard';
import CreateStudyGroup from './CreateStudyGroup';
import JoinStudyGroup from './JoinStudyGroup';
import GroupChat from './GroupChat';
import ShareFiles from './ShareFiles';
import ViewFiles from './ViewFiles';
import Notifications from './Notifications';
import ReportIssues from './ReportIssues';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-study-group" element={<CreateStudyGroup />} />
          <Route path="/join-study-group" element={<JoinStudyGroup />} />
          <Route path="/group-chat" element={<GroupChat />} />
          <Route path="/share-files" element={<ShareFiles />} />
          <Route path="/view-files" element={<ViewFiles />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/report-issues" element={<ReportIssues />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;