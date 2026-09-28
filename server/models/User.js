import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    unlockedNodes: { type: [String], default: ["html"] },
    completedNodes: { type: [String], default: [] },
    badges: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    activeTree: { type: String, default: "webdev" },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
    theme: { type: String, default: "dark" },
    role: { type: String, default: "user" }, // user | admin
    history: [
      {
        date: { type: Date, default: Date.now },
        xpGained: Number,
        nodeId: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);