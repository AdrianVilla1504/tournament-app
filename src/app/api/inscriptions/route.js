import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import { ObjectId } from "mongodb";
import Inscriptions from "@/models/Inscriptions";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const new_inscription = new Inscriptions(data);
    const saved_inscription = await new_inscription.save();
    return NextResponse.json({ success: true, saved_inscription });
  } catch (error) {
    return NextResponse.json(error.message, { success: false, status: 400 });
  }
}
