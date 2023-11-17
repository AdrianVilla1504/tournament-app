import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Inscriptions from "@/models/Inscriptions";

export async function POST(req) {
  const token = await next_auth_credentials_token(req);
  const auth_role = token?._doc.role;
  if (token && auth_role !== "USER") {
    return NextResponse.json(
      { auth_error: "user not authorized !" },
      { status: 401 }
    );
  } else {
    try {
      await connectDB();
      const data = await req.json();
      const repeated_inscription = new Inscriptions.find({
        user_id: data.body.user_id,
        tournament_id: data.body.tournament_id,
      });
      return NextResponse.json({ success: true, saved_inscription });
    } catch (error) {
      return NextResponse.json(error.message, { success: false, status: 400 });
    }
  }
}
