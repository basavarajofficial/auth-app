import { connectToDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";



export const POST = async (req) => {
    try {
        await connectToDB();
        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        // If user is already existing
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: 'User Already existing'}, {status: 400});
        }

        //hash passwrod
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = await new User({
            username,
            email,
            password : hashedPassword
        }).save();

        console.log(newUser);

        await sendEmail({email, emailType: "VERIFY", userId: newUser._id});

        return NextResponse.json(
            {message : "user creted succefully", success: true, newUser},
            {status:200}
            )

        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}