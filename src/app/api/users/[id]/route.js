import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import { ObjectId } from "mongodb";
import { next_auth_credentials_token } from "@/utils/nextAuthMiddleware";
import User from "@/models/User.js";

export async function GET(req, { params }) {
  const token = await next_auth_credentials_token(req);
  const auth_role = token?._doc.role;
  if (auth_role !== "ADMIN") {
    return NextResponse.json(
      { auth_error: "user not authorized !" },
      { status: 401 }
    );
  } else {
    try {
      connectDB();
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
  if (auth_role !== "ADMIN") {
    return NextResponse.json(
      { auth_error: "user not authorized !" },
      { status: 401 }
    );
  } else {
    try {
      const data = await req.json();
      const updated_user = await User.findByIdAndUpdate(
        new ObjectId(params.id),
        data,
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
