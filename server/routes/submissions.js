import express from "express";
import Submission from "../models/Submission.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { nodeId, repoUrl, liveUrl, notes, userName } = req.body;
  const sub = await Submission.create({
    userId: req.user.id,
    userName,
    nodeId,
    repoUrl,
    liveUrl,
    notes,
  });
  res.json(sub);
});

router.get("/", async (_, res) => {
  const subs = await Submission.find().sort({ createdAt: -1 }).limit(50);
  res.json(subs);
});

router.post("/:id/approve", async (req, res) => {
  const sub = await Submission.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(sub);
});

router.post("/:id/reject", async (req, res) => {
  const sub = await Submission.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );
  res.json(sub);
});

export default router;