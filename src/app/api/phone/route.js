import { connectMongoDb } from "../../../../lib/mongodb";
import User from "@/app/models/User";
import { sendOtp } from "@/app/utils/otpService"; // Assume you have a utility to send OTP
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export  async function POST(req, res) {
  const {email,phoneNumber} = await new Response(req.body).json()

  const token = await getToken({ req });
  if (!email || !token || token.email !== email) {
    return NextResponse.json({ message: "Authentication failed" }, { status: 404 });
  }
  
  if(!email || !phoneNumber){
    return NextResponse.json({ message: "Data Error" }, { status: 404 });
  }


  try {
    await connectMongoDb();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    

    await sendOtp(phoneNumber);

    return NextResponse.json({ message: "OTP Sent" }, { status: 200 });
  } catch (error) {
    console.error("Error submitting phone number:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }

}
