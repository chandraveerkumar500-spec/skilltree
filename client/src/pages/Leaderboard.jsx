import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Leaderboard() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/progress/leaderboard").then((r) => setList(r.data));
  }, []);

  const medal = (i) => ["🥇", "🥈", "🥉"][i] || `#${i + 1}`;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🏆 Leaderboard
      </h1>

      <div className="space-y-2">
        {list.length === 0 && (
          <p className="text-gray-500">No users yet. Be the first!</p>
        )}

        {list.map((u, i) => (
          <div
            key={u._id}
            className="flex justify-between items-center bg-[#151528] border border-purple-500/20 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl w-8">{medal(i)}</span>
              <span className="font-semibold">{u.name}</span>
            </div>
            <div className="text-sm text-purple-300">
              Lv {u.level} · {u.xp} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}