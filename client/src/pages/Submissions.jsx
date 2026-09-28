import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Submissions() {
  const [subs, setSubs] = useState([]);

  const load = () => api.get("/submissions").then((r) => setSubs(r.data));
  useEffect(() => { load(); }, []);

  const approve = async (id) => {
    await api.post(`/submissions/${id}/approve`);
    load();
  };
  const reject = async (id) => {
    await api.post(`/submissions/${id}/reject`);
    load();
  };

  const color = (s) =>
    s === "approved" ? "text-green-400" : s === "rejected" ? "text-red-400" : "text-yellow-400";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        📤 Community Projects
      </h1>

      {subs.length === 0 && <p className="text-gray-500">No submissions yet.</p>}

      <div className="space-y-3">
        {subs.map((s) => (
          <div key={s._id} className="bg-[#151528] border border-purple-500/20 rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-purple-400">{s.userName} · node: {s.nodeId}</p>
                <a href={s.repoUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm block mt-1">
                  🔗 {s.repoUrl}
                </a>
                {s.liveUrl && (
                  <a href={s.liveUrl} target="_blank" rel="noreferrer" className="text-green-400 hover:underline text-sm block">
                    🌐 {s.liveUrl}
                  </a>
                )}
              </div>
              <span className={`text-xs font-semibold ${color(s.status)}`}>{s.status.toUpperCase()}</span>
            </div>
            {s.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button onClick={() => approve(s._id)} className="px-3 py-1 text-xs bg-green-600 hover:bg-green-500 rounded-lg">
                  Approve
                </button>
                <button onClick={() => reject(s._id)} className="px-3 py-1 text-xs bg-red-600 hover:bg-red-500 rounded-lg">
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}