import { NextResponse } from "next/server";
import { connectMongoDb } from "../../../../lib/mongodb";
import User from "@/app/models/User";
import { getToken } from "next-auth/jwt";

export async function POST(req, res) {

    const { email, didConsent } = await new Response(req.body).json()

    const token = await getToken({ req });
    if (!email || !token || token.email !== email) {
      return NextResponse.json({ message: "Authentication failed" }, { status: 404 });
    }

    try {
      await connectMongoDb();
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({ message: "User Not Found" }, { status: 404 });
      }

      user.didConsent = didConsent;
      await user.save();

      return NextResponse.json({ message: "Consent Uploaded" }, { status: 200 });
    } catch (error) {
      console.error("Error updating consent:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  } 

