import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { allTrees } from "../data/tree";
import SkillNode from "../components/SkillNode";
import NodeModal from "../components/NodeModal";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const nodeTypes = { skill: SkillNode };

export default function Dashboard() {
  const { user, refresh } = useAuth();
  const [selectedTreeId, setSelectedTreeId] = useState(user.activeTree || "webdev");
  const [selected, setSelected] = useState(null);

  const tree = allTrees[selectedTreeId] || allTrees.webdev;

  const nodes = useMemo(
    () =>
      (tree.nodes || []).map((n) => {
        const completed = (user.completedNodes || []).includes(n.id);
        const unlocked =
          (user.unlockedNodes || []).includes(n.id) ||
          n.id === (tree.nodes[0]?.id ?? "");
        const status = completed
          ? "completed"
          : unlocked
          ? "unlocked"
          : "locked";
        return {
          id: n.id,
          type: "skill",
          position: { x: n.x, y: n.y },
          data: {
            label: n.label,
            status,
            boss: n.boss,
            xp: n.xp,
            onClick: () => unlocked && setSelected({ ...n, status }),
          },
        };
      }),
    [user, tree]
  );

  const edges = useMemo(
    () =>
      (tree.nodes || []).flatMap((n) =>
        (n.children || []).map((c) => {
          const active = (user.unlockedNodes || []).includes(c);
          return {
            id: `${n.id}-${c}`,
            source: n.id,
            target: c,
            animated: active,
            style: { stroke: active ? "#a855f7" : "#333", strokeWidth: 2 },
          };
        })
      ),
    [user, tree]
  );

  const completeNode = async () => {
    try {
      await api.post("/progress/complete", {
        nodeId: selected.id,
        xp: selected.xp,
        unlocks: selected.children || [],
        badge: selected.badge || null,
      });
      await refresh();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#ec4899", "#22c55e", "#facc15"],
      });
      setSelected(null);
    } catch (e) {
      console.error("Complete node error:", e.response?.data?.msg || e.message);
    }
  };

  const switchTree = async (treeId) => {
    setSelectedTreeId(treeId);
    try {
      await api.post("/progress/switch-tree", { tree: treeId });
    } catch {
      // silently fail if backend route missing
    }
  };

  const progress = Math.min(((user.xp % 200) / 200) * 100, 100);

  return (
    <div className="p-4">
      <div className="mb-3 flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
          <p className="text-sm text-gray-400">
            Level {user.level} · {user.xp} XP
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {Object.values(allTrees).map((t) => (
            <button
              key={t.id}
              onClick={() => switchTree(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                selectedTreeId === t.id
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "border-gray-700 text-gray-400 hover:border-purple-500/50"
              }`}
            >
              {t.icon} {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full h-[68vh] rounded-2xl border border-purple-500/20 overflow-hidden bg-[#0a0a1a]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          key={selectedTreeId}
        >
          <Background color="#222" gap={20} />
          <Controls />
          <MiniMap
            pannable
            zoomable
            nodeColor={(node) => {
              const status = node.data?.status;
              if (status === "completed") return "#22c55e";
              if (status === "unlocked") return "#facc15";
              return "#4b5563";
            }}
            nodeStrokeWidth={3}
            maskColor="rgba(10, 10, 26, 0.8)"
            style={{
              backgroundColor: "#0a0a1a",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: "12px",
            }}
          />
        </ReactFlow>
      </div>

      <NodeModal
        node={selected}
        treeId={selectedTreeId}
        onClose={() => setSelected(null)}
        onComplete={completeNode}
      />
    </div>
  );
}