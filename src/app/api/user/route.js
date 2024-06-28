import User from "@/app/models/User";
import { connectMongoDb } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import AuthOptions from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import Transaction from "@/app/models/Transaction";
// import UserTransaction from "@/app/models/UserTransaction";

async function sanitizeUser(user) {
  user.id = user._id.toHexString();
  const transactions = await Transaction.find({ userId: user.id });
  
  const transactionData = transactions.map(transaction=>{
    transaction.id = transaction._id.toHexString()
    return transaction
  })
  user.transactions = transactionData ?? [];
  delete user.password;
  delete user._id;
  delete user.__v;
  return user;
}
export async function GET(req, res) {
  try {
    await connectMongoDb(); // Connect to MongoDB
    // const token = await getServerSession(AuthOptions);
    const email = req.nextUrl.searchParams.get("email");
    const token = await getToken({ req });
    if (!email || !token || token.email !== email) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const user = await User.findOne({ email }).lean();

    if (user) {
      const sanitizedUser = await sanitizeUser(user);
      console.log(sanitizedUser);
      return NextResponse.json(
        { message: "User Found", data: sanitizedUser },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const { firstName, lastName, email, password, phoneNumber, provider } =
    await new Response(req.body).json()
    await connectMongoDb();
    const existingUser = await User.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (existingUser && provider === "custom") {
      return NextResponse.json(
        { message: "User already Registered" },
        { status: 402 }
      );
    }
    if (!existingUser) {

      const newUser = await new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        provider,
      });
      await newUser.save();
    }

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went Wrong!" },
      { status: 500 }
    );
  }
}
