import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer';


export const sendEmail = async ({ email, emailType, userId }) =>{
        try {
            const hashedToken = await bcryptjs.hash(userId.toString(), 10);

            if(emailType === "VERIFY"){
                // *find by id and add verifyToken & verifyTokenExpiry in the database
                await User.findByIdAndUpdate(userId, {
                    verifyToken: hashedToken ,
                    verifyTokenExpiry : Date.now() + 3600000 });
            }else if(emailType === "RESET"){
                await User.findByIdAndUpdate(userId, {
                    forgotPasswordToken: hashedToken , 
                    forgotPasswordTokenExpiry : Date.now() + 3600000
            });
            }

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS
                }
            });


            const mailOptions = {
                from : 'bmannangi@gmail.com',
                to : email,
                subject : emailType === "VERIFY" ?  "Verify your email address" : "Reset your password",
                html: `${emailType === "VERIFY" ? (
                    `<p>
                    Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"/>here</a>
                    to Verify your email address <br />
                    or copy and paste the link in your browser <br /> 
                    "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"
                    </p>`
                ) : (
                    `<p>
                    Click <a href="${process.env.DOMAIN}/verifyemailreset?token=${hashedToken}"/>here</a>
                    to Reset your password <br />
                    or copy and paste the link in your browser <br /> 
                    "${process.env.DOMAIN}/verifyemailreset?token=${hashedToken}"
                    </p>`
                )}`
                 
            }

            const mailResponse = await transport.sendMail(mailOptions);

            return mailResponse;

            
        } catch (error) {
            throw new Error(error.message);
        }
}