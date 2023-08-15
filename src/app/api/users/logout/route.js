import { NextResponse } from "next/server"

export const GET = () => {
    try {
        const response = NextResponse.json({
            message: "Logged out Successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        });
        return response;
        
    } catch (error) {
        return NextResponse.json({error: error.message},{ status: 500 });
        
    }
}