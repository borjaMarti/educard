import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';

export async function POST(req) {
  const course = await req.json();

}

export async function GET(req) {

}

export async function PUT(req) {

}

export async function DELETE(req) {

}