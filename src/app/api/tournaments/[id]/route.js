import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Tournament from "@/models/Tournaments";

export async function GET(request, { params }) {
  try {
    connectDB();
    const tournament_found = await Tournament.findById(params.id);
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

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updated_tournament = await Tournament.findByIdAndUpdate(
      params.id,
      data,
      {
        new: true,
      }
    );
    return NextResponse.json({ success: true, updated_tournament });
  } catch (error) {
    return NextResponse.json({
      status: 400,
    });
  }
}

export function DELETE(request, { params }) {
  return NextResponse.json({
    message: "Delete tournament ...",
  });
}
