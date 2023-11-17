import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import { ObjectId } from "mongodb";
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
      const new_inscription = new Inscriptions(data);
      const saved_inscription = await new_inscription.save();
      return NextResponse.json(
        { success: true, saved_inscription },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(error.message, { success: false, status: 400 });
    }
  }
}
