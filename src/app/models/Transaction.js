import mongoose, { models } from "mongoose";

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ["Initiated", "Approved", "Processing", "Done", "Cancelled","Dispute","Dispute Resolved"],
      default: "Initiated",
    },
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    email: { type: String },
    from: { type: String, required: true },
    to: { type: String, required: true },
    dispute: { type: Boolean, required: true, default: false },
    amount: { type: Number, required: true },
    createdTime: { type: Date, default: Date.now },
    modifiedTime: { type: Date, default: Date.now },
    disputeTime: { type: Date, default: Date.now },
    disputeReason: { type: String },
    fromCurrency: { type: String, required: true },
    toCurrency: { type: String, required: true },
    filePath: { type: String},
    bankAccountNumber: { type: String},
    bankAccountIfsc: { type: String},
    otId: { type: String, default: create_UUID },
  },
  { timestamps: true },
  { collection: "transactions" }
);

const Transaction =
  models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;
