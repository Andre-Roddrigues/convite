// import { NextResponse } from "next/server";
// import { events } from "@/lib/db";

// import { prisma } from "@/src/lib/prisma";
// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const event = events.find(e => e.id === params.id);

//   if (!event) {
//     return NextResponse.json({ message: "Evento não encontrado" }, { status: 404 });
//   }

//   return NextResponse.json(event);
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const body = await request.json();

//   const index = events.findIndex(e => e.id === params.id);

//   if (index === -1) {
//     return NextResponse.json({ message: "Evento não encontrado" }, { status: 404 });
//   }

//   events[index] = {
//     ...events[index],
//     ...body
//   };

//   await prisma.event.update({
//     where: {
//       id: params.id
//     },
//     data: {
//       title: body.title,
//       description: body.description,
//       date: body.date,
//       time: body.time,
//       location: body.location
//     }
//   });


//   return NextResponse.json(events[index]);
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const index = events.findIndex(e => e.id === params.id);

//   if (index === -1) {
//     return NextResponse.json({ message: "Evento não encontrado" }, { status: 404 });
//   }

//   events.splice(index, 1);

//   await prisma.event.delete({
//     where: {
//       id: params.id
//     }
//   });

//   return NextResponse.json({ message: "Evento removido com sucesso" });
// }

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id }
    });

    if (!event) {
      return NextResponse.json(
        { message: "Evento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao buscar evento" },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        date: body.date,
        time: body.time,
        location: body.location
      }
    });

    return NextResponse.json(updatedEvent);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {

    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Evento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Erro ao atualizar evento" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      message: "Evento removido com sucesso"
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {

    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Evento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Erro ao remover evento" },
      { status: 500 }
    );
  }
}