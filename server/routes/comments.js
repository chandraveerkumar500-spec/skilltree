import express from "express";
import Comment from "../models/Comment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:treeId/:nodeId", async (req, res) => {
  const comments = await Comment.find({
    treeId: req.params.treeId,
    nodeId: req.params.nodeId,
  }).sort({ createdAt: -1 });
  res.json(comments);
});

router.post("/", auth, async (req, res) => {
  const { treeId, nodeId, text, userName } = req.body;
  const c = await Comment.create({
    userId: req.user.id,
    userName,
    treeId,
    nodeId,
    text,
  });
  res.json(c);
});

router.post("/:id/like", async (req, res) => {
  const c = await Comment.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.json(c);
});

export default router;