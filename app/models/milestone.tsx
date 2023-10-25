import mongoose, { Schema } from "mongoose";

const milestoneSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      minLength: [2, "Description must be larger than 2 characters"],
      maxLength: [1000, "Description must be less than 1000 characters"],
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required."],
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Milestone =
  mongoose.models.Milestone || mongoose.model("Milestone", milestoneSchema);

export default Milestone;