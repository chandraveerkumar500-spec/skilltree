import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    treeId: String,
    nodeId: String,
    text: String,
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);