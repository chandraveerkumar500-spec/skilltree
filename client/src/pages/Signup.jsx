import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const { signup } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signup(form.name, form.email, form.password);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="bg-[#151528] p-8 rounded-2xl w-full max-w-sm space-y-4 border border-purple-500/30"
      >
        <h2 className="text-2xl font-bold text-purple-300">Join SkillTree</h2>
        {err && <p className="text-red-400 text-sm">{err}</p>}

        {["name", "email", "password"].map((k) => (
          <input
            key={k}
            className="w-full p-2 rounded bg-[#0a0a1a] border border-gray-700 outline-none focus:border-purple-500"
            placeholder={k[0].toUpperCase() + k.slice(1)}
            type={k === "password" ? "password" : "text"}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            required
          />
        ))}

        <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-semibold transition">
          Create Account
        </button>
        <p className="text-sm text-gray-400 text-center">
          Have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
