import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Tournaments from "@/models/Tournaments.js";

export async function GET() {
  connectDB();
  const tournaments = await Tournaments.find();
  return NextResponse.json(tournaments);
}

export function POST() {
  return NextResponse.json({
    message: "Creating tournament...",
  });
}
