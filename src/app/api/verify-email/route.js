// src/app/api/verify-email/route.js
import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import { connectMongoDb } from '../../../../lib/mongodb';


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  try {
    await connectMongoDb();
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    user.emailVerified = true;


    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
