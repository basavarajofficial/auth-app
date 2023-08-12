import {  NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDB } from "@/dbConfig/dbConfig";

connectToDB();


export async function POST(request){

    try {
        const reqBody = await request.json()
        const {token} = reqBody // user requested token
        console.log(token);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified for reset password successfully",
            success: true
        })


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}