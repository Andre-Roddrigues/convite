import { NextResponse } from "next/server";
import { rsvps } from "@/lib/db";
import { RSVP } from "@/types/rsvp";

export async function GET() {
  return NextResponse.json(rsvps);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newRSVP: RSVP = {
    id: Date.now().toString(),
    eventId: body.eventId,
    fullName: body.fullName,
    phone: body.phone,
    attendance: body.attendance,
    message: body.message,
    createdAt: new Date().toISOString()
  };

  rsvps.push(newRSVP);

  return NextResponse.json(
    { message: "Presença confirmada com sucesso ❤️" },
    { status: 201 }
  );
}