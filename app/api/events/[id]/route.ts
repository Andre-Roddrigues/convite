import { NextResponse } from "next/server";
import { events } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const event = events.find(e => e.id === params.id);

  if (!event) {
    return NextResponse.json({ message: "Evento não encontrado" }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const index = events.findIndex(e => e.id === params.id);

  if (index === -1) {
    return NextResponse.json({ message: "Evento não encontrado" }, { status: 404 });
  }

  events[index] = {
    ...events[index],
    ...body
  };

  return NextResponse.json(events[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = events.findIndex(e => e.id === params.id);

  if (index === -1) {
    return NextResponse.json({ message: "Evento não encontrado" }, { status: 404 });
  }

  events.splice(index, 1);

  return NextResponse.json({ message: "Evento removido com sucesso" });
}