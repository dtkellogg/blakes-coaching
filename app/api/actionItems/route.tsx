import connectDB from "@/app/lib/mongodb";
import ActionItem from "@/app/models/actionItem";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: any) {
  const { title, date, description } = await req.json();

  try {
    await connectDB();
    await ActionItem.create({ title, date, description });

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