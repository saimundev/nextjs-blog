import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismaDb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isUserExist)
      return NextResponse.json(
        { message: "User Alrady Exist" },
        { status: 400 }
      );
    const hasePassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hasePassword,
      },
    });

    return NextResponse.json(
      { message: "Reguster successfull" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
