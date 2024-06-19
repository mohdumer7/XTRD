import mongoose, { models } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

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
    buyFees: { type: Number },
    sellFees: { type: Number },
    PnL: { type: Number, required: true, default: 0 },
    lifetimeInvestment: { type: Number, required: true },
  },
  { _id: false }
);

const purchaseSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    price: { type: Number, required: true },
    dateBought: { type: Date, required: true },
    id: { type: String, default: uuidv4 },
    data:{type:mongoose.Schema.Types.Mixed}
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
      enum: ["Free", "Premium", "Elite"],
      default: "Free",
    },
    usdtBalance: { type: Number, default: 0 },
    inrBalance: { type: Number, default: 0 },
    lifetimeInvestment: { type: Number, default: 0 },
    currentInvestment: { type: Number, default: 0 },
    phoneNumberAuthenticated: { type: Boolean, default: false },
    batches: { type: String, default: false },
    didConsent: { type: Boolean, default: false },
    trades: [tradeSchema],
    purchases: [purchaseSchema],
  },
  { timestamps: true },
  { collection: "users" }
);

// Pre-save middleware to generate UUID for new purchases
userSchema.pre('save', function (next) {
  this.purchases.forEach(purchase => {
    if (!purchase.id) {
      purchase.id = uuidv4();
    }
  });
  next();
});

const User = models.User || mongoose.model("User", userSchema);
export default User;
