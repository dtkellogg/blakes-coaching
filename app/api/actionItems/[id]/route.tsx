import connectDB from "@/app/lib/mongodb";
import ActionItem from "@/app/models/actionItem";
import { NextResponse } from "next/server";

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await ActionItem.findByIdAndDelete(id);
  return NextResponse.json({ message: "Action Item deleted" }, { status: 200 });
}