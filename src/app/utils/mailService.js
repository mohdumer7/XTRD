import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    secureConnection: false,
    tls: {
      rejectUnauthorized: true,
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const sendEmail = ({to,subject,attachments,html,text})=>{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
        attachments:attachments ?? []
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email", error);
          return NextResponse.json({ message: "Transaction saved but email failed to send" },{status:404,error:"eerror sending email"});
        }
      });
}