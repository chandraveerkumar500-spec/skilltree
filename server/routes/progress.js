import express from "express";
import User from "../models/User.js";
import Progress from "../models/Progress.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/complete", auth, async (req, res) => {
  try {
    const { nodeId, xp = 50, unlocks = [], badge = null } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.unlockedNodes.includes(nodeId) && user.completedNodes.length > 0)
      return res.status(400).json({ msg: "Node is locked" });
    if (user.completedNodes.includes(nodeId))
      return res.status(400).json({ msg: "Already completed" });

    user.xp += xp;
    user.level = Math.floor(user.xp / 200) + 1;
    user.completedNodes.push(nodeId);
    unlocks.forEach(
      (c) => !user.unlockedNodes.includes(c) && user.unlockedNodes.push(c)
    );
    if (badge && !user.badges.includes(badge)) user.badges.push(badge);

    user.history.push({ xpGained: xp, nodeId });
        // ---- Achievement checks ----
    const addAch = (id) => {
      if (!user.achievements.includes(id)) user.achievements.push(id);
    };

    if (user.completedNodes.length >= 1) addAch("first-steps");
    if (user.completedNodes.length >= 5) addAch("getting-started");
    if (user.completedNodes.length >= 10) addAch("ten-nodes");
    if (user.xp >= 500) addAch("xp-500");
    if (user.xp >= 1000) addAch("xp-1000");
    if (user.badges.length >= 1) addAch("branch-master");
    if (user.streak >= 3) addAch("streak-3");
    if (user.streak >= 7) addAch("streak-7");
    if (user.level >= 5) addAch("level-5");
    // ------------------------------------------
    await user.save();
    await Progress.create({ userId: user._id, nodeId });

    res.json(user);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.get("/leaderboard", async (_, res) => {
  const users = await User.find()
    .sort({ xp: -1 })
    .limit(10)
    .select("name xp level badges streak");
  res.json(users);
});

router.post("/switch-tree", auth, async (req, res) => {
  const { tree } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { activeTree: tree },
    { new: true }
  );
  res.json(user);
});

router.get("/analytics", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  // group history by date
  const map = {};
  user.history.forEach((h) => {
    const day = new Date(h.date).toISOString().slice(0, 10);
    map[day] = (map[day] || 0) + (h.xpGained || 0);
  });
  const labels = Object.keys(map).sort();
  const data = labels.map((l) => map[l]);
  res.json({ labels, data, streak: user.streak, level: user.level });
});

export default router;