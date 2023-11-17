import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/Tournaments";

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
      const tournament_found = await User.findById(new ObjectId(params.id));
      if (!tournament_found) {
        return NextResponse.json(
          {
            message: "User not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(tournament_found);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const updated_tournament = await User.findByIdAndUpdate(
      new ObjectId(params.id),
      data,
      {
        new: true,
      }
    );
    return NextResponse.json({ success: true, updated_tournament });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 400,
    });
  }
}
