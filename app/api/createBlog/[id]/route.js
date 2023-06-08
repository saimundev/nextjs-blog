import prisma from "@/app/lib/prismaDb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log(params);
  try {
    const email = params.id;
    const blog = await prisma.blog.findMany({
      where: {
        email: email,
      },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const id = params.id;
    await prisma.blog.update({
      where: {
        id: id,
      },
      data: data,
    });

    return NextResponse.json(
      { message: "update successfull" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    await prisma.blog.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Delete successfull" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
