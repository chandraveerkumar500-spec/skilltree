import { useSearchParams } from "react-router-dom";
import { allTrees } from "../data/tree";

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();

  const results = [];
  Object.values(allTrees).forEach((tree) => {
    tree.nodes.forEach((n) => {
      if (
        n.label.toLowerCase().includes(q) ||
        (n.description || "").toLowerCase().includes(q)
      ) {
        results.push({ tree: tree.name, icon: tree.icon, node: n });
      }
    });
  });

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Search results for "{q}"</h1>
      {results.length === 0 ? (
        <p className="text-gray-500">No matching skills.</p>
      ) : (
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={i} className="bg-[#151528] border border-purple-500/20 rounded-xl p-4">
              <p className="text-xs text-purple-400">{r.icon} {r.tree}</p>
              <p className="text-lg font-semibold">{r.node.label}</p>
              <p className="text-sm text-gray-400">{r.node.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}