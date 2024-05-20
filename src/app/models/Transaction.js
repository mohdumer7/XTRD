// models/User.js
import mongoose, { models } from "mongoose";
import UserTransaction from "./UserTransaction";

const transactionSchema = new mongoose.Schema(
  {
    type:{ type: String, required: true },
    status:{ type: String,
      enum: ["Initiated", "Approved", "Processing","Done","Cancelled"],
      default: "Initiated",},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    from:{ type: String, required: true },
    to:{ type: String, required: true },
    dispute:{type:Boolean,required: true,default: false},
    amount:{ type: Number, required: true },
    createdTime: { type: Date, default: Date.now },
    modifiedTime: { type: Date, default: Date.now },
    disputeTime: { type: Date, default: Date.now },
    disputeReason: { type: String, required: true },
    fromCurrency: { type: String, required: true},
    toCurrency: { type: String, required: true},
  },
  { timestamps: true },
  { collection: "transactions" }
);

transactionSchema.post("save", async function (doc) {
  try {
    // Find or create a UserTransaction document for the user
    let userTransaction = await UserTransaction.findOne({ userId: doc.userId });

    if (!userTransaction) {
      userTransaction = new UserTransaction({ userId: doc.userId, transactions: [] });
    }

    // Push the transaction ID to the transactions array
    userTransaction.transactions.push(doc._id);

    // Save the UserTransaction document
    await userTransaction.save();
  } catch (error) {
    console.error("Error updating UserTransaction:", error);
  }
});

const Transaction = models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;
