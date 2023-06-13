import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

const webhookSecret = process.env.WEBHOOK_SECRET;

export async function handler(request) {
  const payload = await request.json();
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

  // Future feature: Depending on msg.type, handle user deletion.

  const {
    id: loginId,
    email_addresses: [
        {
          email_address: email
        },
    ],
  } = msg.data;
  console.log(loginId, email);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;