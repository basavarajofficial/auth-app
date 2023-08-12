import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "User Not Found!" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update the password field in the document
    const updatedUser = await User.updateOne(
      { _id: user._id }, // Use the appropriate identifier, like _id
      { $set: { password: hashedPassword } }
    );

    console.log("updated successfully");

    return NextResponse.json(
      { message: "Password updated succefully", success: true, updatedUser },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
};
