import connectDB from "@/app/lib/mongodb";
import ActionItem from "@/app/models/actionItem";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: any) {
  const { title, deadline, description, completed } = await req.json();
  console.log(title, deadline, description, completed);

  try {
    await connectDB();
    await ActionItem.create({ title, deadline, description, completed });

    return NextResponse.json({
      msg: [`Action Item '${title}' created successfully`],
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
  const actionItems = await ActionItem.find();
  return NextResponse.json({ actionItems });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await ActionItem.findByIdAndDelete(id);
  return NextResponse.json({ message: "Action Item deleted" }, { status: 200 });
}