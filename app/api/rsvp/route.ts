import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const rsvps = await prisma.rsvp.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(rsvps);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar confirmações" },
      { status: 500 }
    );
  }
}