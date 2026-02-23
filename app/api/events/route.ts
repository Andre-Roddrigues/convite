import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newEvent = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        date: body.date,
        time: body.time,
        location: body.location,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar evento" },
      { status: 500 }
    );
  }
}