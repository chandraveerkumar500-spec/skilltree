import DailyChallenge from "./pages/DailyChallenge";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Search from "./pages/Search";
import Submissions from "./pages/Submissions";
import Certificate from "./pages/Certificate";

function Private({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center">Loading…</div>;
  return user ? children : <Navigate to="/login" />;
}

function Shell({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {[
            { path: "/", el: <Dashboard /> },
            { path: "/dashboard", el: <Analytics /> },
            { path: "/leaderboard", el: <Leaderboard /> },
            { path: "/profile", el: <Profile /> },
            { path: "/search", el: <Search /> },
            { path: "/submissions", el: <Submissions /> },
            { path: "/daily", el: <DailyChallenge /> },
            { path: "/certificate", el: <Certificate /> },
          ].map((r) => (
            <Route
              key={r.path}
              path={r.path}
              element={<Private><Shell>{r.el}</Shell></Private>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}