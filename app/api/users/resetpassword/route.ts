import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, newPassword } = reqBody

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10)
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Password reset successfull",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}