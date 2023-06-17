import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Card from '@/models/Card';

export async function POST(req) {
  const card = await req.json();

}

export async function GET(req) {

}

export async function PUT(req) {

}

export async function DELETE(req) {

}