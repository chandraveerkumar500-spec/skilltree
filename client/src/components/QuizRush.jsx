import { useEffect, useState, useRef } from "react";

export default function QuizRush({ game, onWin }) {
  const [status, setStatus] = useState("idle");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(game?.timePerQuestion || 10);
  const [picked, setPicked] = useState(null);
  const [won, setWon] = useState(false);
  const timerRef = useRef(null);

  const questions = game?.questions || [];

  useEffect(() => () => clearInterval(timerRef.current), []);

  const startGame = () => {
    setStatus("playing");
    setCurrent(0);
    setScore(0);
    setPicked(null);
    setWon(false);
    setTimeLeft(game.timePerQuestion);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          goNext(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const goNext = (wasCorrect) => {
    const nextScore = wasCorrect ? score + 1 : score;
    if (wasCorrect) setScore(nextScore);

    if (current + 1 >= questions.length) {
      clearInterval(timerRef.current);
      setStatus("done");
      const pass = nextScore >= Math.ceil(questions.length * 0.6);
      setWon(pass);
      if (pass) onWin?.();
    } else {
      setCurrent((c) => c + 1);
      setPicked(null);
      setTimeLeft(game.timePerQuestion);
      startTimer();
    }
  };

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === questions[current].answer;
    setTimeout(() => goNext(correct), 700);
    clearInterval(timerRef.current);
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
            {questions.length} questions · {game.timePerQuestion}s each · Need 60% to pass
          </p>
          <button onClick={startGame} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold text-lg">
            ⚡ Start Quiz Rush
          </button>
        </div>
      )}

      {status === "playing" && (
        <>
          <div className="flex justify-between items-center text-sm">
            <span className="font-mono">Q {current + 1}/{questions.length}</span>
            <span className="font-mono text-yellow-300">⏱ {timeLeft}s</span>
            <span className="font-mono text-green-400">✅ {score}</span>
          </div>

          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-1000"
              style={{ width: `${(timeLeft / game.timePerQuestion) * 100}%` }}
            />
          </div>

          <div className="bg-[#0a0a1a] p-6 rounded-2xl border-2 border-purple-500/40">
            <p className="text-lg font-semibold text-gray-100">{questions[current].q}</p>
          </div>

          <div className="space-y-2">
            {questions[current].options.map((opt, i) => {
              const isCorrect = i === questions[current].answer;
              const showResult = picked !== null;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  disabled={picked !== null}
                  className={`w-full py-3 px-4 rounded-xl border-2 text-sm font-semibold transition ${
                    showResult && isCorrect
                      ? "bg-green-500/20 border-green-500 text-green-200"
                      : showResult && picked === i
                      ? "bg-red-500/20 border-red-500 text-red-200"
                      : "bg-[#0a0a1a] border-gray-700 text-gray-200 hover:border-purple-500/50"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </>
      )}

      {status === "done" && (
        <div className={`p-4 rounded-xl border ${won ? "bg-green-500/10 border-green-500/40" : "bg-red-500/10 border-red-500/40"}`}>
          <p className={`font-bold text-lg ${won ? "text-green-300" : "text-red-300"}`}>
            {won ? "🎉 Speed Demon! You passed!" : `Score: ${score}/${questions.length} — try again!`}
          </p>
          {!won && (
            <button onClick={startGame} className="mt-3 px-4 py-2 bg-purple-600 rounded-lg text-sm">
              🔄 Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
}