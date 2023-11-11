import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import { ObjectId } from "mongodb";
import Tournament from "@/models/Tournaments.js";

export async function GET() {
  connectDB();
  const tournaments = await Tournament.find();
  return NextResponse.json(tournaments);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const new_tournament = new Tournament(data);
    const saved_tournament = await new_tournament.save();
    return NextResponse.json({ success: true, saved_tournament });
  } catch (error) {
    return NextResponse.json(error.message, { success: false, status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const data = await request.json();
    const ids_to_delete = data.ids_to_delete.map((id) => new ObjectId(id));
    const id_query = {
      _id: {
        $in: ids_to_delete,
      },
    };
    const deleted_tournaments = await Tournament.deleteMany(id_query);
    return NextResponse.json({ success: true, deleted_tournaments });
  } catch (error) {
    return NextResponse.json(error.message, { success: false, status: 400 });
  }
}
