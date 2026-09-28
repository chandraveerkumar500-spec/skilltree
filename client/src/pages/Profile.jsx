import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { allTrees } from "../data/tree";
import { ACHIEVEMENTS, RARITY_COLORS } from "../data/achievements";

export default function Profile() {
  const { user } = useAuth();
  const tree = allTrees[user.activeTree] || allTrees.webdev;
  const total = tree.nodes.length;
  const done = user.completedNodes.filter((id) => tree.nodes.some((n) => n.id === id)).length;
  const pct = Math.round((done / total) * 100);
  const shareRef = useRef(null);

  const downloadCard = async () => {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(shareRef.current, { backgroundColor: "#0a0a1a" });
    const link = document.createElement("a");
    link.download = "skilltree-profile.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div ref={shareRef} className="bg-[#151528] border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <Stat label="Level" value={user.level} />
          <Stat label="XP" value={user.xp} />
          <Stat label="🔥 Streak" value={user.streak || 0} />
          <Stat label="Nodes" value={`${done}/${total}`} />
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-2">Tree Progress — {pct}%</p>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-2">Skill Badges</p>
          {user.badges.length === 0 ? (
            <p className="text-gray-500 text-sm">No badges yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.badges.map((b) => (
                <span key={b} className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-yellow-200 text-sm">
                  🏅 {b}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-2">Achievements ({user.achievements?.length || 0})</p>
          {(user.achievements || []).length === 0 ? (
            <p className="text-gray-500 text-sm">Complete nodes, level up, keep streaks to unlock achievements.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.achievements.map((id) => {
                const a = ACHIEVEMENTS[id];
                if (!a) return null;
                return (
                  <div
                    key={id}
                    title={a.desc}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold ${RARITY_COLORS[a.rarity]}`}
                  >
                    {a.icon} {a.name}
                    <span className="block text-[10px] uppercase opacity-70">{a.rarity}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={downloadCard} className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-sm">
          📥 Download Shareable Card
        </button>
        {pct === 100 && (
          <button onClick={() => window.print()} className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 font-semibold text-sm">
            🎓 Download Certificate
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-[#0a0a1a] border border-purple-500/20 rounded-xl p-3 text-center">
      <p className="text-xl font-bold text-purple-300">{value}</p>
      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}