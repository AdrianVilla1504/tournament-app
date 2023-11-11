import { NextResponse } from "next/server";

export function GET(request, { params }) {
  console.log(params);
  return NextResponse.json({
    message: "Getting single tournament .. ",
  });
}

export function PUT(request, { params }) {
  return NextResponse.json({
    message: "Updating tournament ...",
  });
}

export function DELETE(request, { params }) {
  return NextResponse.json({
    message: "Delete tournament ...",
  });
}
