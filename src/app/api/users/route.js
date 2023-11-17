import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import { next_auth_credentials_token } from "@/utils/nextAuthMiddleware";
import User from "@/models/User.js";

export async function GET(req) {
  connectDB();
  const token = await next_auth_credentials_token(req);
  const auth_role = token?._doc.role;
  if (auth_role !== "ADMIN") {
    return NextResponse.json(
      { auth_error: "user not authorized !" },
      { status: 401 }
    );
  } else {
    const users = await User.find();
    return NextResponse.json({ users: users }, { status: 200 });
  }
}
