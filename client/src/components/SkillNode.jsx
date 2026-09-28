import { Handle, Position } from "reactflow";

export default function SkillNode({ data }) {
  const { label, status, onClick, boss } = data;

  const styles = {
    locked: "bg-gray-800/60 border-gray-600 text-gray-500",
    unlocked:
      "bg-yellow-500/15 border-yellow-400 text-yellow-100 shadow-[0_0_22px_rgba(250,204,21,0.55)]",
    completed:
      "bg-green-500/15 border-green-400 text-green-100 shadow-[0_0_22px_rgba(34,197,94,0.6)]",
  };

  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border-2 cursor-pointer transition-all select-none
        ${styles[status]} ${boss ? "text-base font-bold" : "text-sm font-medium"}`}
    >
      <Handle type="target" position={Position.Left} style={{ background: "#666" }} />
      {label}
      <Handle type="source" position={Position.Right} style={{ background: "#666" }} />
    </div>
  );
}
