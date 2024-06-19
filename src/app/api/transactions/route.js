import {createRouter} from "next-connect";
import { connectMongoDb } from "../../../../lib/mongodb";
import multer from "multer";
import { getToken } from "next-auth/jwt";
import Transaction from "@/app/models/Transaction";
import path from "path";
import fs from "fs";

import applyMiddleware from "@/app/utils/applyMiddleware";
import { NextResponse } from "next/server";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import User from "@/app/models/User";
import { sendEmail } from "@/app/utils/mailService";
export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

// Configure nodemailer

// Initialize nextConnect instance
// const apiRoute = createRouter({
//   onError(error, req, res) {
//     console.error("API Route Error:", error);
//     res.status(501).json({ error: `Something went wrong! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// Middleware to handle file upload
// apiRoute.use(upload.single("file"));

// POST method handler
// apiRoute.post(
  
  //  const {
  //    email,
  //    fromCurrency,
  //    toCurrency,
  //    type,
  //    status,
  //    from,
  //    to,
  //    dispute,
  //    amount,
  //    disputeTime,
  //    disputeReason,
  //  } = req.body;
 export async function POST (req, res) {
  try {
    await connectMongoDb(); // Connect to MongoDB
    const token = await getToken({ req });
    const formData = await req.formData();
    const file = formData.get("file");
    const email = formData.get("email")
    const fromCurrency = formData.get("currency")
    const toCurrency = formData.get("currency")
    const type = formData.get("action")
    const status = formData.get("status") || "Initiated"
    const from = formData.get("email")
    const to = formData.get("withdrawWalletAddress") || "N/A"
    const bankAccountNumber = formData.get("withdrawBankAccountNumber") || "N/A"
    const bankAccountIfsc = formData.get("withdrawBankIfsc") || "N/A"
    const dispute = formData.get("dispute") || false
    const amount = formData.get("amount")
    const disputeTime = formData.get("disputeTime")
    const disputeReason = formData.get("disputeReason")

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" },{status:404,error:"User not found in mongo"});
    }

    if (!email ||!token || token.email!== email) {
      return NextResponse.json({ message: "User Not Found" },{status:404,error:"email or user not found"});
    }
    const fileDetails = {fileName:"N/A",filePath:"N/A"}
    if (file && type === "Deposit") {
      const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-y")}`;
      const uploadDir = join(process.cwd(), "public", relativeUploadDir);

      const buffer = Buffer.from(await file.arrayBuffer());
      
      try {
        await stat(uploadDir);
      } catch (e) {
        if (e.code === "ENOENT") {
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(
            "Error while trying to create directory when uploading a file\n",
            e
          );
          return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
          );
        }
      }
  
      try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        if (!email || !token || token.email !== email) {
          return NextResponse.json({ message: "User Not Found" },{status:404,error:"email or user not found"});
        }
        fileDetails.fileName = filename
        fileDetails.filePath = `${uploadDir}/${filename}`
        
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }
    

    const transaction = new Transaction({
      userId: user.id,
      fromCurrency,
      toCurrency,
      type,
      status,
      from,
      email,
      to,
      dispute,
      amount,
      disputeTime,
      disputeReason,
      bankAccountNumber,
      bankAccountIfsc,
      filePath: fileDetails.filePath, // Save file path if uploaded
    });

    await transaction.save();
    console.log(email)
    // Send email notification
    const emailData = {
      subject : `${type} Request for ${email}`,
      text : `Your transaction has been processed successfully. Transaction details:
    - From Currency: ${fromCurrency}
    - To Currency: ${toCurrency}
    - Amount: ${amount}
    - Type: ${type}
    - Status: ${status}`,
    html:`<h1>${type} Request for ${email}. Transaction details:</h1>
    <p>- From Currency: ${fromCurrency}</p>
    <p>- To Currency: ${toCurrency}</p>
    <p>- Wallet Address: ${to}<p/>
    <p>- Amount: ${amount}</p>
    <p>- Type: ${type}</p>
    <p>- Status: ${status}</p>

    <h2>-------------  Bank Account Details -------------------</h2>
  
    <p>- Account Number: ${bankAccountNumber}</p>
    <p>- Account IFSC: ${bankAccountIfsc}</p>
    <h2>--------------------------------------------------------</h2>
    
    <div>Receipt: <img src="img112"/></div>`,
    to:email,
    attachments:fileDetails.fileName === "N/A"?[]: [{
      filename: fileDetails.fileName,
      path: fileDetails.filePath,
      cid: 'img112' //same cid value as in the html img src
  }]
    }
    sendEmail(emailData)

    return NextResponse.json({ message: "Transaction complete!" });
    
  } catch (error) {
    console.error("Error in transaction", error);
    return NextResponse.json({ message: "Internal Server Error" },{status:404,error:"internal server error"});
  }
}

