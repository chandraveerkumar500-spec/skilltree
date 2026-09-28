import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nodeId: String,
  completedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Progress", progressSchema);