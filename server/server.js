import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import progressRoutes from "./routes/progress.js";
import commentRoutes from "./routes/comments.js";
import submissionRoutes from "./routes/submissions.js";
import aiRoutes from "./routes/ai.js";
import treeRoutes from "./routes/trees.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.json({ ok: true, msg: "SkillTree API running" }));
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/trees", treeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
    )
  )
  .catch((err) => {
    console.error("❌ Mongo connection failed:", err.message);
    process.exit(1);
  });