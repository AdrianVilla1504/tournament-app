import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import { ObjectId } from "mongodb";
import { next_auth_credentials_token } from "@/utils/nextAuthMiddleware";
import User from "@/models/User.js";

export async function GET(request) {
  connectDB();
  const users = await User.find();
  return NextResponse.json({ users }, { status: 200 });
}

export async function DELETE(req) {
  await connectDB();
  const token = await next_auth_credentials_token(req);
  const auth_role = token?._doc.role;
  if (!token || (token && auth_role !== "ADMIN")) {
    return NextResponse.json(
      { auth_error: "user not authorized !" },
      { status: 401 }
    );
  } else if (token && auth_role === "ADMIN") {
    try {
      const data = await req.json();
      const ids_to_delete = data.ids_to_delete.map((id) => new ObjectId(id));
      const id_query = {
        _id: {
          $in: ids_to_delete,
        },
      };
      const deleted_users = await User.deleteMany(id_query);

      return NextResponse.json(
        { success: true, deleted_users },
        { status: 410 }
      );
    } catch (error) {
      return NextResponse.json(error.message, { success: false, status: 400 });
    }
  }
}
