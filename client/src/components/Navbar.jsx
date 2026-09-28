import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, toggleTheme } = useAuth();
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const search = (e) => {
    e.preventDefault();
    if (q.trim()) nav(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b border-purple-500/20 bg-[#0d0d1c]/80 backdrop-blur sticky top-0 z-40">
      <Link
        to="/"
        className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        🌳 SkillTree
      </Link>

      {user && (
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <form onSubmit={search} className="hidden md:block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="🔍 Search skills…"
              className="bg-[#0a0a1a] border border-gray-700 rounded-lg px-3 py-1 text-xs w-48 outline-none focus:border-purple-500"
            />
          </form>
          <Link to="/" className="hover:text-purple-300">Tree</Link>
          <Link to="/dashboard" className="hover:text-purple-300">Analytics</Link>
          <Link to="/daily" className="hover:text-purple-300">🎯 Daily</Link>
          <Link to="/leaderboard" className="hover:text-purple-300">Leaderboard</Link>
          <Link to="/submissions" className="hover:text-purple-300">Projects</Link>
          <Link to="/certificate" className="hover:text-purple-300">🎓</Link>
          <Link to="/profile" className="hover:text-purple-300">Profile</Link>
          <span className="text-gray-600">|</span>
          <span className="text-orange-400">🔥 {user.streak || 0}</span>
          <span className="text-purple-300 font-semibold">
            Lv {user.level} · {user.xp} XP
          </span>
          <button onClick={toggleTheme} className="text-lg" title="Toggle theme">
            {user.theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            onClick={() => { logout(); nav("/login"); }}
            className="text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}