import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/utils/mongoose";
import Tournament from "@/models/Tournaments";

export async function GET(req, { params }) {
  try {
    connectDB();
    const tournament_found = await Tournament.findById(new ObjectId(params.id));
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
}

export async function PUT(req, { params }) {
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
}

export function DELETE(req, { params }) {
  return NextResponse.json({
    message: "Delete tournament ...",
  });
}
