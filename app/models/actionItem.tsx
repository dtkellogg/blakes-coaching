import mongoose, { Schema } from "mongoose";

const actionItemSchema = new Schema({
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
    maxLength: [50, "Description must be less than 300 characters"],
  },
  date: {
    type: Date,
    required: [true, "Due Date is required."],
  },
});

const ActionItem =
  mongoose.models.ActionItem || mongoose.model("ActionItem", actionItemSchema);

export default ActionItem;