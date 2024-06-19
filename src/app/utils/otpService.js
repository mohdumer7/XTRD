import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export const sendOtp = async (phoneNumber) => {
  console.log({accountSid,authToken,phoneNumber})
  client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
  .verifications
  .create({to: `+${phoneNumber}`, channel: 'sms'})
  .then(() => console.log("OTP SENT"));
};

export const verifyOtp = async (phoneNumber, otp) => {
  console.log({accountSid,authToken,phoneNumber,otp,},process.env.TWILIO_SERVICE_SID)
    const otpVerify =  await client.verify.v2.services(process.env.TWILIO_SERVICE_SID).verificationChecks.create({ to: `+${phoneNumber}`, code: otp })
    return otpVerify.status === "approved";
};
