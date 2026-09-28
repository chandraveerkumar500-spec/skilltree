import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    nodeId: String,
    repoUrl: String,
    liveUrl: String,
    notes: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
