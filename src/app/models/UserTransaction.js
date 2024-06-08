// models/UserTransaction.js
import mongoose from "mongoose";

let UserTransaction;

try {
  UserTransaction = mongoose.model("Usertransaction");
} catch {
  const userTransactionSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      email: { type: String, required: true },
      transactions: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
      ],
    },
    { timestamps: true },
    { collection: "Usertransaction" }
  );

  userTransactionSchema.pre(/^find/, function (next) {
    this.populate("transactions");
    next();
  });

  UserTransaction = mongoose.model("Usertransaction", userTransactionSchema);
}

export default UserTransaction;
