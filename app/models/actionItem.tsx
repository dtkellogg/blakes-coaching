import mongoose, { Schema } from "mongoose";

const actionItemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      minLength: [2, "Title must be larger than 2 characters"],
      maxLength: [50, "Title must be less than 50 characters"],
    },
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

const ActionItem =
  mongoose.models.ActionItem || mongoose.model("ActionItem", actionItemSchema);

export default ActionItem;