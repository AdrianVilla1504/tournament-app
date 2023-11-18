import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { next_auth_credentials_token } from "@/utils/nextAuthMiddleware";
import User from "@/models/User.js";

export async function GET(req, { params }) {
  connectDB();
  const token = await next_auth_credentials_token(req);
  const auth_role = token?._doc.role;
  if (!token || (token && auth_role !== "ADMIN")) {
    return NextResponse.json(
      { auth_error: "user not authorized !" },
      { status: 401 }
    );
  } else if (token && auth_role === "ADMIN") {
    try {
      const user_found = await User.findById(new ObjectId(params.id));
      if (!user_found) {
        return NextResponse.json(
          {
            message: "User not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        { success: true, user: user_found },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
}

export async function PUT(req, { params }) {
  const token = await next_auth_credentials_token(req);
  const auth_role = token?._doc.role;
  if (!token || (token && auth_role !== "ADMIN")) {
    return NextResponse.json(
      { auth_error: "user not authorized !" },
      { status: 401 }
    );
  } else if (token && auth_role === "ADMIN") {
    try {
      let hashed_pass;
      const data = await req.json();
      const { fullname, email, password } = data;

      if (password && password.length < 6) {
        return NextResponse.json(
          {
            message: "Password must be at least 6 characters",
          },
          {
            status: 400,
          }
        );
      } else if (password && password >= 6) {
        hashed_pass = await bcrypt.hash(password, 12);
      }
      const updated_fields = {};

      if (fullname) updated_fields.fullname = fullname;
      if (email) updated_fields.email = email;
      if (hashed_pass) updated_fields.password = hashed_pass;
      const updated_user = await User.findByIdAndUpdate(
        new ObjectId(params.id),
        updated_fields,
        {
          new: true,
        }
      );
      return NextResponse.json(
        { success: true, updated_user: updated_user },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({
        success: false,
        status: 400,
      });
    }
  }
}
