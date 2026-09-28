import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const CHALLENGES = [
  {
    title: "FizzBuzz",
    prompt: "Print numbers 1 to 15. For multiples of 3 print 'Fizz', of 5 'Buzz', of both 'FizzBuzz'.",
    starter: `for (let i = 1; i <= 15; i++) {\n  // your code\n}`,
    keywords: ["i % 3", "i % 5", "Fizz"],
  },
  {
    title: "Reverse a String",
    prompt: "Reverse the given string without using reverse().",
    starter: `function reverse(s) {\n  // your code\n}`,
    keywords: ["for", "return"],
  },
  {
    title: "Sum of Array",
    prompt: "Return the sum of an array of numbers.",
    starter: `function sum(arr) {\n  // your code\n}`,
    keywords: ["reduce"],
  },
  {
    title: "Count Vowels",
    prompt: "Count how many vowels are in a string.",
    starter: `function vowels(s) {\n  // your code\n}`,
    keywords: ["for", "length"],
  },
  {
    title: "Palindrome Check",
    prompt: "Return true if a string is a palindrome (same forwards and backwards).",
    starter: `function isPal(s) {\n  // your code\n}`,
    keywords: ["split", "reverse"],
  },
];

export default function DailyChallenge() {
  const { user, refresh } = useAuth();
  const today = new Date().toISOString().slice(0, 10);
  const idx = today.split("-").reduce((a, b) => a + parseInt(b), 0) % CHALLENGES.length;
  const challenge = CHALLENGES[idx];
  const [code, setCode] = useState(challenge.starter);
  const [result, setResult] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const key = `daily-${today}`;
    if (localStorage.getItem(key) === "done") setDone(true);
  }, [today]);

  const run = async () => {
    const low = code.toLowerCase();
    const matched = challenge.keywords.filter((k) => low.includes(k.toLowerCase()));
    const passed = matched.length === challenge.keywords.length;
    setResult({ passed, matched, total: challenge.keywords.length });

    if (passed && !done) {
      try {
        await api.post("/progress/complete", {
          nodeId: `daily-${today}`,
          xp: 100,
          unlocks: [],
          badge: null,
        });
        await refresh();
        localStorage.setItem(`daily-${today}`, "done");
        setDone(true);
      } catch {
        // ignore if already
      }
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-5">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🎯 Daily Challenge — {today}
      </h1>

      <div className="bg-[#151528] border border-purple-500/30 rounded-2xl p-6">
        <p className="text-xs uppercase text-purple-400 font-semibold">Today's challenge</p>
        <h2 className="text-xl font-bold mt-1">{challenge.title}</h2>
        <p className="text-sm text-gray-300 mt-2">{challenge.prompt}</p>
        <p className="text-xs text-yellow-400 mt-3">💰 Reward: +100 XP (once per day)</p>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="w-full h-56 p-4 rounded-xl bg-[#0a0a1a] border border-purple-500/30 font-mono text-sm text-gray-100 outline-none focus:border-purple-500"
      />

      <button
        onClick={run}
        disabled={done}
        className={`w-full py-3 rounded-xl font-semibold ${
          done ? "bg-gray-700 cursor-not-allowed text-gray-500" : "bg-purple-600 hover:bg-purple-500"
        }`}
      >
        {done ? "✅ Completed today" : "▶️ Run & Submit"}
      </button>

      {result && (
        <div className={`p-4 rounded-xl border ${result.passed ? "bg-green-500/10 border-green-500/40 text-green-200" : "bg-red-500/10 border-red-500/40 text-red-200"}`}>
          {result.passed
            ? "🎉 Correct! +100 XP"
            : `Missing keywords: ${result.matched.length}/${result.total}`}
        </div>
      )}
    </div>
  );
}