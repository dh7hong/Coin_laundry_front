import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose.mjs';
import Verification from '@/lib/models/Verification';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';

export async function POST(req: NextRequest) {
  try {
    const { code, phoneNumber } = await req.json();

    if (!code || !phoneNumber) {
      return NextResponse.json({ message: 'Verification code and phone number are required' }, { status: 400 });
    }

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    await connectToDatabase();

    const record = await Verification.findOne({ phoneNumber: formattedPhoneNumber });

    if (!record) {
      return NextResponse.json({ message: 'Verification code not found' }, { status: 400 });
    }

    const currentTime = new Date().getTime();

    if (currentTime - record.timestamp > 3 * 60 * 1000) {
      return NextResponse.json({ message: 'Verification code has expired' }, { status: 400 });
    }

    if (parseInt(code) !== record.verificationCode) {
      return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Verification code is valid' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to verify code', error: error.message }, { status: 500 });
  }
}
