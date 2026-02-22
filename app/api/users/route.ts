import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

/**
 * POST - Criar usuário
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.create({
      data: {
        fullName: body.fullName,
        phone: body.phone,
        attendance: body.attendance ?? false,
        message: body.message,
        eventId: body.eventId
      }
    });

    return NextResponse.json(user, { status: 201 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const eventId = searchParams.get("eventId");
    const confirmed = searchParams.get("confirmed");

    const users = await prisma.user.findMany({
      where: {
        ...(eventId && { eventId }),
        ...(confirmed === "true" && { attendance: true }),
        ...(confirmed === "false" && { attendance: false })
      },
      include: {
        event: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(users);

     // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao listar usuários" },
      { status: 500 }
    );
  }
}