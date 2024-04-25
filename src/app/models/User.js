// models/User.js
import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    createdTime: { type: Date, default: Date.now },
    modifiedTime: { type: Date, default: Date.now },
    provider: { type: String },
    userPlan: {
      type: String,
      enum: ["Free", "Basic", "Premium"],
      default: "Free",
    },
  },
  { timestamps: true },
  { collection: "users" }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
