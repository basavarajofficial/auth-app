import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server"




export const GET = async (request) => {
    try {
        const userID = await getDataFromToken(request);

        const user = await User.findOne({_id: userID}).select( "-password" );

        return NextResponse.json({
            message: "User Found",
            data: user
        })
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}