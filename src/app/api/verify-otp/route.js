import { connectMongoDb } from "../../../../lib/mongodb";
import User from "@/app/models/User";
import { verifyOtp } from "@/app/utils/otpService"; // Assume you have a utility to verify OTP
import { NextResponse } from "next/server";

export async function POST(req, res) {

  const {email,otp,phoneNumber} = await new Response(req.body).json()
    console.log(email,phoneNumber)
    try {
      await connectMongoDb();
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({ message: "User Not Found" }, { status: 404 });
      }

      const isOtpValid = await verifyOtp(phoneNumber, otp);

      if (!isOtpValid) {
        return NextResponse.json({ message: "Invalid Otp" }, { status: 400 });
      }
      user.phoneNumber = phoneNumber;
      user.phoneNumberAuthenticated = true
      await user.save();
      return NextResponse.json({ message: "Valid OTP" }, { status: 200 });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

}
