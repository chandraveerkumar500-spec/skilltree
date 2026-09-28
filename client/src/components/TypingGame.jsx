import { useEffect, useState, useRef } from "react";

export default function TypingGame({ game, onWin }) {
  const [status, setStatus] = useState("idle"); // idle | countdown | playing | done
  const [countdownNum, setCountdownNum] = useState(3);
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(game?.timeLimit || 20);
  const [won, setWon] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const nextWord = () => {
    const words = game?.words || [];
    if (!words.length) return;
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setInput("");
  };

  const startGame = () => {
    setStatus("countdown");
    setCountdownNum(3);
    let count = 3;
    const cd = setInterval(() => {
      count--;
      setCountdownNum(count);
      if (count <= 0) {
        clearInterval(cd);
        setStatus("playing");
        setScore(0);
        setWon(false);
        setTimeLeft(game.timeLimit);
        nextWord();
        setTimeout(() => inputRef.current?.focus(), 50);
        timerRef.current = setInterval(() => {
          setTimeLeft((t) => {
            if (t <= 1) {
              clearInterval(timerRef.current);
              setStatus("done");
              setScore((finalScore) => {
                const pass = finalScore >= Math.ceil(game.words.length * 0.5);
                if (pass) {
                  setWon(true);
                  onWin?.();
                }
                return finalScore;
              });
              return 0;
            }
            return t - 1;
          });
        }, 1000);
      }
    }, 1000);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim().toLowerCase() === currentWord.toLowerCase()) {
      setScore((s) => s + 1);
      nextWord();
    }
  };

  const progressPct = ((game?.timeLimit - timeLeft) / game?.timeLimit) * 100;

  return (
    <div className="space-y-5 text-center">
      <div>
        <h4 className="text-xl font-bold text-purple-300">{game.title}</h4>
        <p className="text-sm text-gray-400 mt-1">{game.description}</p>
      </div>

      {status === "idle" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">
            Type each word exactly as shown. You have {game.timeLimit} seconds.
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold text-lg"
          >
            ▶️ Start Game
          </button>
        </div>
      )}

      {status === "countdown" && (
        <div className="text-6xl font-bold text-purple-400 animate-pulse">
          {countdownNum > 0 ? countdownNum : "GO!"}
        </div>
      )}

      {status === "playing" && (
        <>
          <div className="flex justify-between items-center text-sm">
            <span className="font-mono text-lg text-yellow-300">⏱ {timeLeft}s</span>
            <span className="font-mono text-lg text-green-400">✅ {score}</span>
          </div>

          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: `${100 - progressPct}%` }}
            />
          </div>

          <div className="bg-[#0a0a1a] p-8 rounded-2xl border-2 border-purple-500/40">
            <p className="text-4xl font-mono font-bold text-purple-200">{currentWord}</p>
          </div>

          <input
            ref={inputRef}
            value={input}
            onChange={handleChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Type here…"
            className="w-full p-3 rounded-lg bg-[#0a0a1a] border-2 border-purple-500/30 text-center font-mono text-lg outline-none focus:border-purple-500"
          />
        </>
      )}

      {status === "done" && (
        <div className="space-y-4">
          <p className="text-3xl font-bold text-green-400">Time's up!</p>
          <p className="text-xl">
            You typed <span className="text-purple-400 font-bold">{score}</span> words
          </p>
          {won ? (
            <div className="bg-green-500/10 border border-green-500/40 rounded-xl p-4">
              <p className="text-green-300 font-semibold text-lg">
                🎉 Challenge passed! +10 bonus XP
              </p>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-4">
              <p className="text-red-300 font-semibold">
                Need at least {Math.ceil(game.words.length * 0.5)} words to pass.
              </p>
              <button
                onClick={startGame}
                className="mt-3 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold"
              >
                🔄 Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}