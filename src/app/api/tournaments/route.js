import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import { ObjectId } from "mongodb";
import { next_auth_credentials_token } from "@/utils/nextAuthMiddleware";
import Tournament from "@/models/Tournaments.js";

export async function GET(req) {
  connectDB();
  const tournaments = await Tournament.find();
  return NextResponse.json(tournaments);
}

export async function POST(req) {
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
      const data = await req.json();
      const new_tournament = new Tournament(data);
      const saved_tournament = await new_tournament.save();
      return NextResponse.json(
        { success: true, saved_tournament },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(error.message, { success: false, status: 400 });
    }
  }
}

export async function DELETE(req) {
  const token = await next_auth_credentials_token(req);
  const auth_role = token?._doc.role;
  if (token && auth_role !== "ADMIN") {
    return NextResponse.json(
      { auth_error: "user not authorized !" },
      { status: 401 }
    );
  } else {
    try {
      const data = await req.json();
      const ids_to_delete = data.ids_to_delete.map((id) => new ObjectId(id));
      const id_query = {
        _id: {
          $in: ids_to_delete,
        },
      };
      const deleted_tournaments = await Tournament.deleteMany(id_query);
      return NextResponse.json(
        { success: true, deleted_tournaments },
        { status: 410 }
      );
    } catch (error) {
      return NextResponse.json(error.message, { success: false, status: 400 });
    }
  }
}
