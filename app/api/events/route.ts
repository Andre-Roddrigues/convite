import { NextResponse } from "next/server";
import { events } from "../../../lib/db";
import { Event } from "../../../types/events";

export async function GET() {
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newEvent: Event = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description,
    date: body.date,
    time: body.time,
    location: body.location,
    createdAt: new Date().toISOString()
  };

  events.push(newEvent);

  return NextResponse.json(newEvent, { status: 201 });
}