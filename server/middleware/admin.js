import User from "../models/User.js";

export default async function adminOnly(req, res, next) {
  const user = await User.findById(req.user.id);
  if (user?.role !== "admin")
    return res.status(403).json({ msg: "Admin access only" });
  next();
}