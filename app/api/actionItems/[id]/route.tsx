import connectDB from "@/app/lib/mongodb";
import ActionItem from "@/app/models/actionItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await ActionItem.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Action Item deleted" }, { status: 200 });
}

export async function PUT(request: any, { params }) {
  const { id } = params;
  const { title, deadline, description, completed, assignedTo, assignedBy } = await request.json();
  console.log(`id: ${id}, title: ${title}, description: ${description}, deadline: ${deadline}, completed: ${completed}`);
  try {
    await connectDB();
    await ActionItem.findByIdAndUpdate(id, { title, deadline, description, completed, assignedTo, assignedBy });
    return NextResponse.json({ status: 200 }, { msg: "Action Item updated" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to create Action Item."] });
    }
  }
}