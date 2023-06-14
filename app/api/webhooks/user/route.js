import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

const webhookSecret = process.env.WEBHOOK_SECRET;

export async function POST(req) {
  const payload = await req.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get('svix-id'),
    "svix-timestamp": headersList.get('svix-timestamp'),
    "svix-signature": headersList.get('svix-signature'),
  };

  const wh = new Webhook(webhookSecret);
  let msg;

  try {
    msg = wh.verify(
        JSON.stringify(payload),
        heads);
  } catch (err) {
    console.log('error here');
    console.error(err.message);
    return NextResponse.json({}, { status: 400 });
  }

  // Future feature: Handle user deletion.

  await dbConnect();
  const eventType = msg.type;
  if (eventType === 'user.created') {
    const {
      id: loginId,
      email_addresses: [
          {
            email_address: email
          },
      ],
    } = msg.data;

    try {
      const user = await User.create({loginId: loginId, email: email});
      console.log('User has been created!');
      return NextResponse.json(user);
    } catch(err) {
      console.log(err);
    }
  }
}