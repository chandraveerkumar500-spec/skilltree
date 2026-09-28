import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="bg-[#151528] p-8 rounded-2xl w-full max-w-sm space-y-4 border border-purple-500/30"
      >
        <h2 className="text-2xl font-bold text-purple-300">Login to SkillTree</h2>
        {err && <p className="text-red-400 text-sm">{err}</p>}

        <input
          className="w-full p-2 rounded bg-[#0a0a1a] border border-gray-700 outline-none focus:border-purple-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 rounded bg-[#0a0a1a] border border-gray-700 outline-none focus:border-purple-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-semibold transition">
          Login
        </button>
        <p className="text-sm text-gray-400 text-center">
          No account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
