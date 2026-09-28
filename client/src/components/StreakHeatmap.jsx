import { useMemo } from "react";

export default function StreakHeatmap({ history = [] }) {
  const data = useMemo(() => {
    const map = {};
    history.forEach((h) => {
      const d = new Date(h.date).toISOString().slice(0, 10);
      map[d] = (map[d] || 0) + (h.xpGained || 0);
    });
    return map;
  }, [history]);

  const days = useMemo(() => {
    const out = [];
    for (let i = 90; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      out.push({ date: iso, xp: data[iso] || 0 });
    }
    return out;
  }, [data]);

  const color = (xp) => {
    if (xp === 0) return "bg-gray-800";
    if (xp < 50) return "bg-purple-900";
    if (xp < 150) return "bg-purple-700";
    if (xp < 300) return "bg-purple-500";
    return "bg-purple-300";
  };

  return (
    <div className="bg-[#151528] border border-purple-500/20 rounded-2xl p-6">
      <p className="text-sm text-gray-400 mb-3">📅 Last 90 days of activity</p>
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {days.map((d) => (
          <div
            key={d.date}
            title={`${d.date}: ${d.xp} XP`}
            className={`w-3 h-3 rounded-sm ${color(d.xp)} transition-all hover:scale-150`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-800" />
        <div className="w-3 h-3 rounded-sm bg-purple-900" />
        <div className="w-3 h-3 rounded-sm bg-purple-700" />
        <div className="w-3 h-3 rounded-sm bg-purple-500" />
        <div className="w-3 h-3 rounded-sm bg-purple-300" />
        <span>More</span>
      </div>
    </div>
  );
}