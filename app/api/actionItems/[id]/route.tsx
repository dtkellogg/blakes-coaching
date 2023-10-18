import connectDB from "@/app/lib/mongodb";
import ActionItem from "@/app/models/actionItem";
import { NextResponse } from "next/server";

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await ActionItem.findByIdAndDelete(id);
  return NextResponse.json({ message: "Action Item deleted" }, { status: 200 });
}

export async function PUT(request: any, { params }) {
  const { id } = params;
  const { title, deadline, description } = await request.json();
  console.log(`id: ${id}, title: ${title}, description: ${description}, deadline: ${new Date(deadline)}`)
  await connectDB();
  await ActionItem.findByIdAndUpdate(id, { title, deadline, description });
  return NextResponse.json({ message: "Action Item updated" }, { status: 200 });
}