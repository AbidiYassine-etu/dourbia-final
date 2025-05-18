// app/api/auth/me/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  console.log('Type of cookies():', typeof cookies());
  const cookieStore = await cookies(); // This is synchronous
  const token = cookieStore.get('access_token')?.value;
  console.log('JWT_SECRET:', process.env.JWT_SECRET);


  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json(user);
  } catch (error) {
    console.error('JWT verification error:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
