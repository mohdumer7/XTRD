// src/app/api/send-verification-email/route.js
import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import crypto from 'crypto';
import { getToken } from 'next-auth/jwt';
import { sendVerificationEmail } from '@/app/utils/mailService';
import { connectMongoDb } from '../../../../lib/mongodb';


export async function POST(req) {
  const { email } = await new Response(req.body).json()
  console.log({email})
  const token = await getToken({ req });
  if (!email || !token || token.email !== email) {
    return NextResponse.json({ message: "Authentication Failed" }, { status: 404 });
  }

  try {
    await connectMongoDb();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = Date.now() + 3600000; // 1 hour

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpires = emailVerificationExpires;
    await user.save();

    await sendVerificationEmail(email, emailVerificationToken);

    return NextResponse.json({ message: 'Verification email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
