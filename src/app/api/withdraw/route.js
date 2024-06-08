import { NextResponse } from "next/server";
import { connectMongoDb } from "../../../../lib/mongodb";
import Transaction from "@/app/models/Transaction";
const nodemailer = require("nodemailer");

const accountSid = "AC2ce23fc08f967cabdcc2f56a5be850c2";
const authToken = "9b6c02fe196a7fb2041ec922cd604743";
// const client = require("twilio")(accountSid, authToken);

/////////////////////////////////////////////////////////////////////////////////
const { RestClient, OrderRequest } = require("okx-api");

// or
// import { SpotClient } from 'okx-api';

// read from environmental variables
const API_KEY = "a6278b30-c8f0-415d-8db0-6f715176b38a";
const API_SECRET = "F44006EE8DAA403DF4D1F32EDA3D7155";
const API_PASS = "Nihal@123";

/**
 * Execute this script using ts-node. The above environmental variables can be passed in one command (unix & macOS):
 *
 * API_KEY_COM="yourapikey" API_SECRET_COM="yourapisecret" API_PASSPHRASE_COM="yourapipassphrase" ts-node examples/rest-private-trade-market.ts
 *
 * If you don't have ts-node, install it using npm: https://github.com/TypeStrong/ts-node#installation
 */

if (!API_KEY || !API_SECRET || !API_PASS) {
  throw new Error(
    `Missing api credentials. Use environmental variables or hard code in the script`
  );
}

const client = new RestClient({
  apiKey: API_KEY,
  // apiKey: 'apiKeyHere',
  apiSecret: API_SECRET,
  // apiSecret: 'apiSecretHere',
  apiPass: API_PASS,
  // apiPass: 'apiPassHere',
});
////////////////////////////////////////////////////////////////////////////////

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
    user: "xtrdtech@gmail.com",
    pass: "pzqq jwzg feyr sjlz",
  },
});
export async function POST(req) {
  try {
    await connectMongoDb();
    const {
      type,
      status,
      userId,
      email,
      from,
      to,
      chain,
      dispute,
      amount,
      onchain,
      // createdTime,
      // modifiedTime,
      // disputeTime,
      // disputeReason,
      fromCurrency,
      toCurrency,
    } = await req.json();
    // const client = new RestClient({
    //   apiKey: process.env.API_KEY,
    //   apiSecret: process.env.API_SECRET,
    //   apiPass: process.env.API_PASSPHRASE,
    // });
    // const balance = await client.getBalance();
    // console.log(balance[0].details);

    // const withdrawRequest = await client.submitWithdraw({
    //   ccy: "USDT",
    //   amt: "2",
    //   dest: 4,
    //   toAddr: to,
    //   fee: 0.15,
    //   chain: "USDT-Optimism",
    // });

    // const commision = 0.01;
    // const okxFee = 0;
    // await connectMongoDb();
    // const user = await User.findOne({ email });
    // const token = await getToken({ req });

    // if (!email || !token || token.email !== email || !user || !amount) {
    //   return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    // }
    // if (dispute) {
    // }
    // const currencies = await client.getCurrencies({ ccy: "USDT" });
    // console.log(currencies);
    // if (Number(currencies.code) === 0) {
    //   return NextResponse.json(
    //     { message: "Something Went Wrong!" },
    //     { status: 99 }
    //   );
    // }

    // const totalAmount = amount - commision - currencies.maxFee;

    // if (totalAmount < 5) {
    //   return NextResponse.json(
    //     { message: "Minimumm order value must be > 5" },
    //     { status: 99 }
    //   );
    // }
    // console.log("here 1", fromCurrency);
    // if (fromCurrency === "USDT") {
    //   // if (totalAmount > user.usdtBalance) {
    //   //   return NextResponse.json(
    //   //     { message: "You cannot enter more than your balance" },
    //   //     { status: 99 }
    //   //   );
    //   // }
    //   console.log("here 2");
    //   if (toCurrency === "USDT") {
    //     // if(!to || !chain){
    //     //   return NextResponse.json({ message: "Please enter wallet Address and chain" }, { status: 99 });
    //     // }
    //     console.log("SUBMITTING THE REQUEST");
    //     const withdrawRequest = await client.submitWithdraw({
    //       ccy: "USDT",
    //       amt: 4,
    //       dest: 4,
    //       toAddr: to,
    //       chain: "USDT-Avalanche C-Chain",
    //     });
    //     console.log(withdrawRequest);
    //     if (withdrawRequest) {
    //     }
    //   } else {
    //     //request to coin
    //   }
    // } else {
    //   //coin to usdt
    // }

    const transaction = {
      type: "Withdrawl",
      status: "Processing",
      userId,
      email,
      from,
      to,
      amount,
      fromCurrency,
      toCurrency,
    };

    const newTransaction = new Transaction(transaction);
    const res = await newTransaction.save();
    console.log({ res, newTransaction, transaction });
    const mailOptions = {
      from: "xtrdtech@gmail.com",
      to: "xtrdwithdrawl@gmail.com",
      subject: `Withdrawl Request for ${email}`,
      text: `
        User of Email: ${email} wants to withdraw
        to:${to}
        a total amount of :${amount}
        from currency :${fromCurrency}
        to currency:${toCurrency}
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return NextResponse.json(
          { message: "Something Went Wrong" },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          { message: "Request Placed" },
          { status: 200 }
        );
      }
    });
    // const buyOrder = {
    //   instId: "CORE-USDT",
    //   ordType: "market",
    //   side: "buy",
    //   sz: String(1),
    //   tdMode: "cash",
    //   // posSide: "long",
    //   tgtCcy: "base_ccy",
    // };
    // console.log("submitting buy order:", buyOrder);
    // const buyResult = await client.submitOrder(buyOrder);

    // console.log("buy order result: ", buyResult, "\n\n");

    // const orderdet = await client.getOrderDetails({
    //   instId: "CORE-USDT",
    //   ordId: "1497811499656339456",
    // });
    // console.log(orderdet);
    // client.verify.v2
    //   .services("VAcbcd4d6bf0d42ea19b84007008e99403")
    //   .verifications.create({
    //     to: "+917348958950",
    //     channel: "sms",
    //     code: "565656",
    //   })
    //   .then((verification) => {
    //     console.log(verification);
    //   });
    // client.verify.v2
    //   .services("VA54d99eb9bcb770a6597b920b3782edf6")
    //   .verificationChecks.create({ to: "+917348958950", code: "146997" })
    //   .then((verification_check) => console.log(verification_check.status));

    return NextResponse.json({ message: "EMAIL SENT" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went Wrong" },
      { status: 500 }
    );
  }
}
