import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Inscriptions from "@/models/Inscriptions";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const repeated_inscription = new Inscriptions.find({
      user_id: data.body.user_id,
      tournament_id: data.body.tournament_id,
    });
    return NextResponse.json({ success: true, saved_inscription });
  } catch (error) {
    return NextResponse.json(error.message, { success: false, status: 400 });
  }
}
