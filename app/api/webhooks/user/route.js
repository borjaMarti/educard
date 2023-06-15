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
    msg = await wh.verify(
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
      id: clerkId,
      email_addresses: [
          {
            email_address: email
          },
      ],
      first_name: firstName,
      last_name: lastName
    } = msg.data;

    const fullName = lastName ? `${firstName} ${lastName}` : firstName;

    try {
      const user = await User.create({ email: email, name: fullName, clerkId: clerkId });
      console.log('User has been created!');
      return NextResponse.json(user);
    } catch(err) {
      console.log(err);
    }
  }
}