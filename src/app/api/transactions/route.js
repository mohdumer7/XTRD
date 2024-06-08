import User from "@/app/models/User";
import { connectMongoDb } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import AuthOptions from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import Transaction from "@/app/models/Transaction";

export async function POST(req, res) {
  try {
    await connectMongoDb(); // Connect to MongoDB
    // const token = await getServerSession(AuthOptions);
    const {
        email,
        fromCurrency,
        toCurrency,
        type,
        status,
        from,
        to,
        dispute,
        amount,
        disputeTime,
        disputeReason
    } = req.body;
    const token = await getToken({ req });
    if (!email || !token || token.email !== email) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    if(
        !fromCurrency ||
        !toCurrency ||
        !type ||
        !status ||
        !from ||
        !to ||
        !amount
    ){
        return NextResponse.json({ message: "Data Error" }, { status: 99 });
    }

    const user = await User.findOne({ email }); 
    if (!user) {
        const transaction = await new Transaction({
            userId: user.id,
            fromCurrency,
            toCurrency,
            type,
            status,
            from,
            email,
            to,
            dispute,
            amount,
            disputeTime,
            disputeReason
        });
        await transaction.save();
      }
    
      return NextResponse.json({ message: "Transaction complete!" }, { status: 201 });
  } catch (error) {
    console.error("Error intransaction", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
