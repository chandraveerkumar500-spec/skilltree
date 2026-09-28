import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TypingGame from "./TypingGame";
import CodePlayground from "./CodePlayground";
import MemoryGame from "./MemoryGame";
import QuizRush from "./QuizRush";


export default function NodeModal({ node, treeId, onClose, onComplete }) {
  const { user, showToast } = useAuth();
  const [step, setStep] = useState("notes"); // notes | flashcards | quiz | challenge | discuss | ai
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const [challengeResult, setChallengeResult] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (!node) return;
    setStep("notes");
    setAnswers({});
    setQuizSubmitted(false);
    setCode(node.challenge?.starterCode || "");
    setChallengeResult(null);
    setFlashIndex(0);
    setFlashFlipped(false);
  }, [node]);

  useEffect(() => {
    if (step === "discuss" && node) {
      api.get(`/comments/${treeId}/${node.id}`).then((r) => setComments(r.data));
    }
  }, [step, node, treeId]);

  const quiz = node?.quiz || [];
  const flashcards = node?.flashcards || [];
  const quizScore = useMemo(() => {
    return quiz.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  }, [answers, quiz]);
  const quizPassed = quiz.length === 0 || quizScore >= Math.ceil(quiz.length * 0.8);

  if (!node) return null;
  const done = node.status === "completed";

  const runChallenge = () => {
    const expected = (node.challenge?.expectedKeywords || []).map((k) => k.toLowerCase());
    const actual = code.toLowerCase();
    const matched = expected.filter((k) => actual.includes(k));
    const passed = expected.length === 0 || matched.length === expected.length;
    setChallengeResult({
      passed,
      matched,
      total: expected.length,
      message: passed
        ? "✅ Great job! Challenge passed."
        : `Missing: ${expected.filter((k) => !actual.includes(k)).join(", ")}`,
    });
  };  

    const canComplete =
    (quiz.length === 0 || quizPassed) &&
    (challengeResult?.passed || !node.challenge) &&
    (!node.game || gameWon);

  const askAI = async () => {
    setAiLoading(true);
    try {
      const { data } = await api.post("/ai/ask", { question, nodeLabel: node.label });
      setAiAnswer(data.answer);
    } catch {
      setAiAnswer("AI service unavailable.");
    }
    setAiLoading(false);
  };

  const postComment = async () => {
    if (!newComment.trim()) return;
    await api.post("/comments", {
      treeId, nodeId: node.id, text: newComment, userName: user.name,
    });
    setNewComment("");
    const { data } = await api.get(`/comments/${treeId}/${node.id}`);
    setComments(data);
  };

  const speak = (text) => {
  // If it's currently speaking, stop it
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    return;
  }
  
  // Otherwise, start speaking
  const u = new SpeechSynthesisUtterance(text.replace(/[#`*]/g, "").slice(0, 500));
  u.rate = 1;
  window.speechSynthesis.speak(u);
  };

    const steps = [
    "notes",
    ...(flashcards.length ? ["flashcards"] : []),
    ...(quiz.length ? ["quiz"] : []),
    "playground",
    ...(node.challenge ? ["challenge"] : []),
    ...(node.game ? ["game"] : []),
    "ai",
    "discuss",
  ];

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#151528] border border-purple-500/40 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-purple-500/20 bg-[#151528]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-purple-300">{node.label}</h3>
              <p className="text-sm text-gray-400 mt-1">
                +{node.xp} XP{" "}
                {node.badge && <span className="ml-3 text-yellow-400">🏅 {node.badge}</span>}
                {node.boss && <span className="ml-3 text-red-400">BOSS</span>}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none">×</button>
          </div>

          <div className="flex gap-2 mt-4 text-xs flex-wrap">
            {steps.map((s) => {
              const locked =
                (s === "quiz" && false) ||
                (s === "challenge" && quiz.length > 0 && !quizPassed);
              return (
                <button
                  key={s}
                  onClick={() => !locked && setStep(s)}
                  disabled={locked}
                  className={`px-3 py-1 rounded-full border capitalize transition ${
                    step === s
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "border-gray-700 text-gray-400 hover:border-purple-500/50"
                  } ${locked ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* NOTES */}
          {step === "notes" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-300 text-sm">{node.description}</p>
                <button
                  onClick={() => speak(node.notes || node.description)}
                  className="text-xs text-purple-400 hover:text-purple-300 whitespace-nowrap ml-2"
                >
                  🔊 Listen
                </button>
              </div>

              <div className="bg-[#0a0a1a] border border-purple-500/20 rounded-xl p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed">
                  {node.notes || "No notes yet."}
                </pre>
              </div>

              <div>
                <p className="font-semibold text-gray-200 mb-2">📚 Resources</p>
                <ul className="space-y-1">
                  {(node.resources || []).map((r, i) => (
                    <li key={i}>
                      <a href={r.url} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline text-sm">
                        → {r.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setStep(flashcards.length ? "flashcards" : quiz.length ? "quiz" : "challenge")}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold text-sm"
              >
                Continue →
              </button>
            </div>
          )}

          {/* FLASHCARDS */}
          {step === "flashcards" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400 text-center">
                Card {flashIndex + 1} / {flashcards.length}
              </p>
              <div
                onClick={() => setFlashFlipped(!flashFlipped)}
                className="bg-[#0a0a1a] border-2 border-purple-500/40 rounded-2xl p-8 min-h-[200px] flex items-center justify-center text-center cursor-pointer hover:border-purple-500 transition"
              >
                <p className="text-lg text-gray-100">
                  {flashFlipped ? flashcards[flashIndex]?.back : flashcards[flashIndex]?.front}
                </p>
              </div>
              <p className="text-xs text-gray-500 text-center">Click card to flip</p>

              <div className="flex gap-2">
                <button
                  onClick={() => { setFlashIndex(Math.max(0, flashIndex - 1)); setFlashFlipped(false); }}
                  disabled={flashIndex === 0}
                  className="flex-1 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 text-sm disabled:opacity-40"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => { setFlashIndex(Math.min(flashcards.length - 1, flashIndex + 1)); setFlashFlipped(false); }}
                  disabled={flashIndex === flashcards.length - 1}
                  className="flex-1 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 text-sm disabled:opacity-40"
                >
                  Next →
                </button>
              </div>

              <button
                onClick={() => setStep(quiz.length ? "quiz" : "challenge")}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold text-sm"
              >
                Continue →
              </button>
            </div>
          )}

          {/* QUIZ */}
          {step === "quiz" && (
            <div className="space-y-4">
              {quiz.map((q, i) => (
                <div key={i} className="bg-[#0f0f22] border border-purple-500/20 rounded-xl p-4">
                  <p className="text-sm font-semibold mb-2">Q{i + 1}. {q.q}</p>
                  {q.options.map((opt, j) => {
                    const chosen = answers[i] === j;
                    const isCorrect = j === q.answer;
                    const showResult = quizSubmitted;
                    return (
                      <button
                        key={j}
                        onClick={() => !quizSubmitted && setAnswers({ ...answers, [i]: j })}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition mb-1 ${
                          showResult && isCorrect
                            ? "bg-green-500/20 border-green-500 text-green-200"
                            : showResult && chosen && !isCorrect
                            ? "bg-red-500/20 border-red-500 text-red-200"
                            : chosen
                            ? "bg-purple-500/20 border-purple-500"
                            : "border-gray-700 hover:border-purple-500/50"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                  {quizSubmitted && q.explanation && (
                    <p className="text-xs text-purple-300 mt-2 italic">💡 {q.explanation}</p>
                  )}
                </div>
              ))}

              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={!quiz.every((_, i) => answers[i] !== undefined)}
                  className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold text-sm disabled:opacity-50"
                >
                  Submit Quiz
                </button>
              ) : (
                <div className="text-center space-y-2">
                  <p className={`text-lg font-bold ${quizPassed ? "text-green-400" : "text-red-400"}`}>
                    Score: {quizScore}/{quiz.length} {quizPassed ? "✅ Passed" : "❌ Try again"}
                  </p>
                  {!quizPassed && (
                    <button
                      onClick={() => { setAnswers({}); setQuizSubmitted(false); }}
                      className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold"
                    >
                      Retry Quiz
                    </button>
                  )}
                  {quizPassed && node.challenge && (
                    <button
                      onClick={() => setStep("challenge")}
                      className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-500 text-sm font-semibold"
                    >
                      Go to Challenge →
                    </button>
                  )}
                  {quizPassed && !node.challenge && node.game && (
                    <button
                      onClick={() => setStep("game")}
                      className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-500 text-sm font-semibold"
                    >
                      Go to Game →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CHALLENGE */}
          {step === "challenge" && node.challenge && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-200">{node.challenge.title}</p>
                <p className="text-sm text-gray-400 mt-1">{node.challenge.description}</p>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-48 p-3 rounded-xl bg-[#0a0a1a] border border-purple-500/30 text-sm font-mono text-gray-100 outline-none focus:border-purple-500"
              />

              {node.challenge.hint && (
                <p className="text-xs text-yellow-400">💡 Hint: {node.challenge.hint}</p>
              )}

              <button
                onClick={runChallenge}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold text-sm"
              >
                ▶️ Run Challenge
              </button>

              {challengeResult && (
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    challengeResult.passed
                      ? "bg-green-500/10 border-green-500/40 text-green-200"
                      : "bg-red-500/10 border-red-500/40 text-red-200"
                  }`}
                >
                  {challengeResult.message}
                  {!challengeResult.passed && (
                    <p className="text-xs mt-1">
                      Matched {challengeResult.matched.length}/{challengeResult.total} keywords
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PLAYGROUND */}
          {step === "playground" && (
            <CodePlayground
              initialHtml="<h1>Hello SkillTree!</h1>\n<p>Edit the code and see live preview</p>"
              initialCss="body {\n  font-family: sans-serif;\n  padding: 20px;\n  background: #f5f5fa;\n}\nh1 {\n  color: purple;\n}"
              initialJs="console.log('Try me!');"
            />
          )} 

                    {/* GAME */}
          {step === "game" && node.game && (
            <div className="space-y-4">
              {node.game.type === "typing" && (
                <TypingGame
                  game={node.game}
                  onWin={() => {
                    setGameWon(true);
                    showToast("🎮 Typing game passed! Bonus XP earned.");
                  }}
                />
              )}
              {node.game.type === "memory" && (
                <MemoryGame
                  game={node.game}
                  onWin={() => {
                    setGameWon(true);
                    showToast("🧠 Memory game passed! Bonus XP earned.");
                  }}
                />
              )}
              {node.game.type === "quizrush" && (
                <QuizRush
                  game={node.game}
                  onWin={() => {
                    setGameWon(true);
                    showToast("⚡ Quiz Rush passed! Bonus XP earned.");
                  }}
                />
              )}
            </div>
          )}

          {/* AI */}
          {step === "ai" && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-200">🤖 Ask AI Mentor</p>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask anything about ${node.label}…`}
                className="w-full p-2 rounded bg-[#0a0a1a] border border-gray-700 text-sm h-20 outline-none"
              />
              <button
                onClick={askAI}
                disabled={aiLoading || !question.trim()}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold text-sm disabled:opacity-50"
              >
                {aiLoading ? "Thinking…" : "Ask"}
              </button>
              {aiAnswer && (
                <div className="bg-[#0a0a1a] border border-purple-500/30 rounded-xl p-3 text-sm whitespace-pre-wrap text-gray-200">
                  {aiAnswer}
                </div>
              )}
            </div>
          )}

          {/* DISCUSS */}
          {step === "discuss" && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-200">💬 Discussion</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {comments.length === 0 && <p className="text-gray-500 text-sm">No comments yet. Be first!</p>}
                {comments.map((c) => (
                  <div key={c._id} className="bg-[#0a0a1a] border border-gray-700/50 rounded-xl p-3">
                    <p className="text-xs text-purple-400 font-semibold">{c.userName}</p>
                    <p className="text-sm text-gray-200 mt-1">{c.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment…"
                  className="flex-1 p-2 rounded bg-[#0a0a1a] border border-gray-700 text-sm"
                />
                <button onClick={postComment} className="px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold">
                  Post
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-purple-500/20 flex gap-2 items-center bg-[#151528]">
                    {!done && (
            <p className="text-xs text-gray-500 flex-1">
              {!canComplete
                ? quiz.length > 0 && !quizPassed
                  ? "Pass the quiz to unlock completion"
                  : node.challenge && !challengeResult?.passed
                  ? "Complete the challenge to unlock"
                  : node.game && !gameWon
                  ? "Win the game to unlock completion"
                  : "Complete requirements to unlock"
                : "All set — you can complete!"}
            </p>
          )}
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 text-sm">
            Close
          </button>
          {!done && (
            <button
              onClick={onComplete}
              disabled={!canComplete}
              className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                canComplete ? "bg-purple-600 hover:bg-purple-500" : "bg-gray-700 cursor-not-allowed text-gray-500"
              }`}
            >
              ✅ Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}