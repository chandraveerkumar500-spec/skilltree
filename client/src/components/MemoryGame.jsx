import { useEffect, useState } from "react";

export default function MemoryGame({ game, onWin }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | playing | done
  const [won, setWon] = useState(false);

  const pairs = game?.pairs || [];
  const maxMoves = game?.maxMoves || pairs.length * 3;

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const startGame = () => {
    const deck = [];
    pairs.forEach((p, i) => {
      deck.push({ id: `${i}-a`, pairId: i, text: p.term });
      deck.push({ id: `${i}-b`, pairId: i, text: p.definition });
    });
    setCards(shuffle(deck));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
    setStatus("playing");
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      const ca = cards.find((c) => c.id === a);
      const cb = cards.find((c) => c.id === b);
      setMoves((m) => m + 1);
      if (ca?.pairId === cb?.pairId) {
        setMatched((m) => [...m, ca.pairId]);
        setFlipped([]);
      } else {
        const t = setTimeout(() => setFlipped([]), 900);
        return () => clearTimeout(t);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (status === "playing" && matched.length === pairs.length) {
      setStatus("done");
      const pass = moves + 1 <= maxMoves;
      setWon(pass);
      if (pass) onWin?.();
    }
  }, [matched, pairs.length, moves, maxMoves, status, onWin]);

  const click = (id) => {
    if (flipped.length >= 2) return;
    if (flipped.includes(id)) return;
    if (matched.some((pid) => cards.find((c) => c.id === id)?.pairId === pid)) return;
    setFlipped((f) => [...f, id]);
  };

  return (
    <div className="space-y-4 text-center">
      <div>
        <h4 className="text-xl font-bold text-purple-300">{game.title}</h4>
        <p className="text-sm text-gray-400 mt-1">{game.description}</p>
      </div>

      {status === "idle" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">
            Match {pairs.length} pairs. Max {maxMoves} moves allowed.
          </p>
          <button onClick={startGame} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold text-lg">
            🎮 Start Game
          </button>
        </div>
      )}

      {status !== "idle" && (
        <>
          <div className="flex justify-center gap-6 text-sm">
            <span className="text-yellow-300">Moves: <strong>{moves}</strong></span>
            <span className="text-green-400">Matched: <strong>{matched.length}/{pairs.length}</strong></span>
          </div>

          <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
            {cards.map((c) => {
              const isFlipped = flipped.includes(c.id) || matched.includes(c.pairId);
              return (
                <button
                  key={c.id}
                  onClick={() => click(c.id)}
                  className={`h-20 rounded-xl border-2 p-2 text-xs font-semibold transition-all ${
                    isFlipped
                      ? "bg-purple-600/30 border-purple-400 text-purple-100"
                      : "bg-[#0a0a1a] border-gray-700 text-transparent hover:border-purple-500/50"
                  }`}
                >
                  {isFlipped ? c.text : "?"}
                </button>
              );
            })}
          </div>

          {status === "done" && (
            <div className={`p-4 rounded-xl border ${won ? "bg-green-500/10 border-green-500/40" : "bg-red-500/10 border-red-500/40"}`}>
              {won ? (
                <p className="text-green-300 font-semibold">🎉 Memory Master! You won!</p>
              ) : (
                <>
                  <p className="text-red-300 font-semibold">Too many moves — try again!</p>
                  <button onClick={startGame} className="mt-3 px-4 py-2 bg-purple-600 rounded-lg text-sm">
                    🔄 Retry
                  </button>
                </>
              )}
            </div>
          )}

          {status === "playing" && (
            <button onClick={startGame} className="text-xs text-gray-500 hover:text-purple-400">
              Restart
            </button>
          )}
        </>
      )}
    </div>
  );
}