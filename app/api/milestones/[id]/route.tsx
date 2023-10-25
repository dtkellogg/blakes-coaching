import connectDB from "@/app/lib/mongodb";
import Milestone from "@/app/models/milestone";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await Milestone.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Milestone deleted" }, { status: 200 });
}

export async function PUT(request: any, { params }) {
  const { id } = params;
  const { deadline, description, completed } = await request.json();
  console.log(`id: ${id}, description: ${description}, deadline: ${deadline}, completed: ${completed}`);
  try {
    await connectDB();
    await Milestone.findByIdAndUpdate(id, { deadline, description, completed });
    return NextResponse.json({ status: 200 }, { msg: "Milestone updated" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to create Milestone."] });
    }
  }
}