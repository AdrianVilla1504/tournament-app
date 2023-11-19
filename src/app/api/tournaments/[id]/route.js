import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/utils/mongoose";
import { next_auth_credentials_token } from "@/utils/nextAuthMiddleware";
import Tournament from "@/models/Tournaments";

export async function GET(req, { params }) {
  connectDB();
  const token = await next_auth_credentials_token(req);

  if (token) {
    try {
      const tournament_found = await Tournament.findById(
        new ObjectId(params.id)
      );
      if (!tournament_found) {
        return NextResponse.json(
          {
            message: "Tournament not found",
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
  } else {
    return NextResponse.json({
      auth_error: "Not authorized",
      status: 401,
    });
  }
}

export async function PUT(req, { params }) {
  connectDB();
  const token = await next_auth_credentials_token(req);
  if (token) {
    try {
      const data = await req.json();
      const updated_tournament = await Tournament.findByIdAndUpdate(
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
  } else {
    return NextResponse.json({
      auth_error: "Not authorized",
      status: 401,
    });
  }
}
