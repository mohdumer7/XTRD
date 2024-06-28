// src/app/api/check-email-verification/route.js
import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import { connectMongoDb } from '../../../../lib/mongodb';
import { getToken } from 'next-auth/jwt';


export async function POST(req) {
  const { email } = await new Response(req.body).json()
  console.log(email)
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

    if (user.emailVerified) {
      return NextResponse.json({ message: 'Email verified' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Email not verified' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error checking email verification:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
