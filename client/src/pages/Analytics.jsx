import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StreakHeatmap from "../components/StreakHeatmap";

export default function Analytics() {
  const { user } = useAuth();
  const [data, setData] = useState({ labels: [], data: [] });

  useEffect(() => {
    api.get("/progress/analytics").then((r) => setData(r.data));
  }, []);

  const max = Math.max(...data.data, 1);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        📊 Your Analytics
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <Card label="Level" value={user.level} />
        <Card label="Total XP" value={user.xp} />
        <Card label="🔥 Streak" value={`${user.streak || 0} days`} />
      </div>

      <div className="bg-[#151528] border border-purple-500/20 rounded-2xl p-6">
        <p className="text-sm text-gray-400 mb-4">XP gained per day</p>
        {data.data.length === 0 ? (
          <p className="text-gray-500 text-sm">Complete a node to start tracking.</p>
        ) : (
          <div className="flex items-end gap-2 h-40">
            {data.data.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md transition-all"
                  style={{ height: `${(v / max) * 100}%`, minHeight: "4px" }}
                  title={`${v} XP`}
                />
                <span className="text-[10px] text-gray-500">{data.labels[i]?.slice(5)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <StreakHeatmap history={user.history || []} />
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-[#151528] border border-purple-500/20 rounded-xl p-4 text-center">
      <p className="text-2xl font-bold text-purple-300">{value}</p>
      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}