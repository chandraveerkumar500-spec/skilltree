import express from "express";
import Tree from "../models/Tree.js";
import auth from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const trees = await Tree.find();
  res.json(trees);
});

router.post("/", auth, adminOnly, async (req, res) => {
  const tree = await Tree.create({ ...req.body, createdBy: req.user.id });
  res.json(tree);
});

router.delete("/:id", auth, adminOnly, async (req, res) => {
  await Tree.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;