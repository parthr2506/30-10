import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }
        const actionUrl = emailType === "VERIFY" ? ` ${process.env.DOMAIN}/verifyemail?token=${hashedToken}` :
            `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`

        //using mailtrap and nodemailer
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "cf78f1d31f0d0d",
                pass: "b58b11e8fb5b79"
            }
        });
        const mailOptions = {
            from: 'abc@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p> Click <a href="${actionUrl}">here </a>
            to ${emailType === "VERIFY" ? "verify email" : "reset password"}
            or copy paste the link 
            <br> ${actionUrl}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)

    }
}