import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { allTrees } from "../data/tree";

export default function Certificate() {
  const { user } = useAuth();
  const ref = useRef(null);
  const tree = allTrees[user.activeTree] || allTrees.webdev;
  const total = tree.nodes.length;
  const done = user.completedNodes.filter((id) => tree.nodes.some((n) => n.id === id)).length;

  const download = async () => {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(ref.current, { backgroundColor: "#0a0a1a", scale: 2 });
    const link = document.createElement("a");
    link.download = `skilltree-certificate-${tree.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-5">
      <h1 className="text-3xl font-bold text-purple-300">🎓 Certificate</h1>

      <div
        ref={ref}
        className="bg-gradient-to-br from-[#0a0a1a] via-[#151528] to-[#1a0a2a] border-4 border-purple-500/40 rounded-2xl p-10 text-center"
      >
        <p className="text-4xl mb-2">🌳</p>
        <p className="text-xs uppercase text-purple-400 tracking-widest">SkillTree Certification</p>
        <h2 className="text-3xl font-bold mt-4">Certificate of Completion</h2>
        <p className="text-gray-400 mt-6 text-sm">This certifies that</p>
        <p className="text-3xl font-bold text-purple-300 my-3">{user.name}</p>
        <p className="text-gray-400 text-sm">has successfully completed</p>
        <p className="text-xl font-semibold my-3">{tree.icon} {tree.name}</p>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <span>🏅 {user.badges.length} badges</span>
          <span>⭐ {user.xp} XP</span>
          <span>📈 Level {user.level}</span>
        </div>
        <p className="text-xs text-gray-500 mt-8">
          Issued on {new Date().toLocaleDateString()} · {done}/{total} nodes completed
        </p>
      </div>

      <button
        onClick={download}
        disabled={done < total}
        className={`w-full py-3 rounded-xl font-semibold ${
          done < total
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-500"
        }`}
      >
        {done < total ? `Complete ${total - done} more nodes to unlock` : "📥 Download Certificate"}
      </button>
    </div>
  );
}