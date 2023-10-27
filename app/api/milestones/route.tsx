import connectDB from "@/app/lib/mongodb";
import Milestone from "@/app/models/milestone";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: any) {
  const { deadline, description, completed, assignedTo, assignedBy } = await req.json();
  console.log(deadline, description, completed, assignedTo, assignedBy);

  try {
    await connectDB();
    await Milestone.create({ deadline, description, completed, assignedTo, assignedBy });

    return NextResponse.json({
      msg: [`Milestone created successfully`],
      success: true,
    });
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

export async function GET(request: any) {
  await connectDB();
  const milestones = await Milestone.find();
  return NextResponse.json({ milestones });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await Milestone.findByIdAndDelete(id);
  return NextResponse.json({ message: "Milestone deleted" }, { status: 200 });
}