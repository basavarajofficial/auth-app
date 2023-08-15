import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connectToDB();
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // If user is already existing
        // *user data from database
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User not found"}, {status:400});
        }
        
        if(!user.isVerified){
            return NextResponse.json({error: "Your email is not verified yet!"}, {status:400});
        }

        // check password is correct
        const validatePassword = await bcryptjs.compare(password, user.password);

        if(!validatePassword){
            return NextResponse.json({error: "Invalid Password!"}, {status:400});
        }

        // create Token Data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create Token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success : true,
        })

        response.cookies.set("token", token, {httpOnly: true});

        return response;

        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}