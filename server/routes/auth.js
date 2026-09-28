import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Missing fields" });

    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "Email already taken" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "No user found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: "Wrong password" });

    // streak logic
    const now = new Date();
    const last = new Date(user.lastActive);
    const hours = (now - last) / 36e5;
    if (hours > 24 && hours < 48) user.streak += 1;
    else if (hours >= 48) user.streak = 1;
    user.lastActive = now;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
});

router.post("/theme", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const { theme } = req.body;
    const user = await User.findByIdAndUpdate(id, { theme }, { new: true });
    res.json(user);
  } catch (e) {
    res.status(401).json({ msg: e.message });
  }
});

export default router;