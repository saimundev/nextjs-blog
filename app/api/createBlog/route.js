import prisma from "@/app/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    await prisma.blog.create({
      data: data,
    });
    return NextResponse.json(
      { message: "Blog Created Successfull" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const blog = await prisma.blog.findMany();
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
