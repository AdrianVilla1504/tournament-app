import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(request) {
  const { fullname, email, password } = await request.json();

  if (!password || password.length < 6) {
    return NextResponse.json(
      {
        message: "Password must be at least 4 characters",
      },
      {
        status: 400,
      }
    );
  }
  try {
    await connectDB();
    const user_found = await User.findOne({ email });

    if (user_found) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    const hashed_pass = await bcrypt.hash(password, 12);

    const new_user = new User({
      email,
      fullname,
      password: hashed_pass,
    });

    const savedUser = await new_user.save();

    return NextResponse.json(savedUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
