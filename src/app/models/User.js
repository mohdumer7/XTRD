import mongoose, { models } from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    tradeId: { type: String, required: true },
    instId: { type: String, required: true },
    tdMode: { type: String, required: true },
    percentContribution: { type: Number, required: true },
    currentInvestment: { type: Number, required: true },
    quantity: { type: Number, required: true },
    avgPx: { type: Number, required: true },
    side: { type: Number, required: true },
    traderId: { type: String, required: true },
    buyFee: { type: Number },
    sellFee: { type: Number },
    lifetimeInvestment: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: ["user", "XTRD_admin"], default: "user" },
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
    usdtBalance: { type: Number, default: 0 },
    inrBalance: { type: Number, default: 0 },
    lifetimeInvestment: { type: Number, default: 0 },
    currentInvestment: { type: Number, default: 0 },
    phoneNumberAuthenticated: { type: Boolean, default: false },
    batches: { type: String, default: false },
    trades: [tradeSchema],
  },
  { timestamps: true },
  { collection: "users" }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
