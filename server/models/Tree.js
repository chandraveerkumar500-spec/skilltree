import mongoose from "mongoose";

const treeSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: String,
    icon: String,
    nodes: Array,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Tree", treeSchema);