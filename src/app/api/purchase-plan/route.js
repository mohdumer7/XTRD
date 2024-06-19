import { connectMongoDb } from "../../../../lib/mongodb";
import User from "@/app/models/User";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { email, selectedPlan, price, planOrder, action,planPrices } = await new Response(req.body).json();
  console.log({email, selectedPlan, price, planOrder, action,planPrices})
  if( !email || !planOrder || !planPrices){
    return NextResponse.json({ message: "Data Error" }, { status: 99 });
  }
  const token = await getToken({ req });
  if (!email || !token || token.email !== email) {
    return NextResponse.json({ message: "Authentication Failed" }, { status: 404 });
  }

  try {
    await connectMongoDb();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    if (action === "cancelPlan") {
      // Cancel plan logic
      if (user.userPlan === "free") {
        return NextResponse.json({ message: "You are already on the Free plan" }, { status: 99 });
      }

      const currentPlan = user.userPlan;
      const currentPlanPrice = planPrices[currentPlan]
      const refundAmount = currentPlanPrice * 0.5;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);


      user.purchases.forEach(purchase => {
        if (purchase.type === "userPlan" && purchase.data.status === "active") {
          purchase.data.status = "cancelled";
          purchase.data.cancelledDate = new Date();
        }
      });

      user.markModified('purchases');

      user.userPlan = "Free";

      await user.save();

      return NextResponse.json({ message: "Plan canceled successfully", refundAmount }, { status: 200 });

    } else if (action === "upgradePlan") {
      // Upgrade plan logic
      if (!selectedPlan) {
        return NextResponse.json({ message: "No plan selected" }, { status: 99 });
      }
      if (user.userPlan === selectedPlan) {
        return NextResponse.json({ message: "You are already on the current plan!" }, { status: 99 });
      }

      const currentPlanIndex = planOrder.indexOf(user.userPlan);
      const selectedPlanIndex = planOrder.indexOf(selectedPlan);

      if (selectedPlanIndex < currentPlanIndex) {
        return NextResponse.json({ message: "Downgrade not allowed" }, { status: 400 });
      }

      const currentPlanPrice = planPrices[user.userPlan];
      const selectedPlanPrice = planPrices[selectedPlan];
      const priceDifference = selectedPlanPrice - currentPlanPrice;

      if (user.lifetimeInvestment >= priceDifference) {
        // Cancel all current active plans
        user.purchases.forEach(purchase => {
          if (purchase.type === "userPlan" && purchase.data.status === "active") {
            purchase.data.status = "cancelled";
            purchase.data.cancelledDate = new Date();
          }
        });
        

        // Update user's plan to the selected plan
        user.userPlan = selectedPlan;
        user.lifetimeInvestment -= priceDifference;

        // Add new purchase entry for the selected plan
        user.purchases.push({
          type: "userPlan",
          price: selectedPlanPrice,
          dateBought: new Date(),
          data: { planName: selectedPlan, status: "active", pricePaid: priceDifference }
        });
        user.markModified('purchases');
        await user.save();

        const emailData = {
          subject : `Thank you for purchasing ${selectedPlan} Plan`,
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
    
        return NextResponse.json({ message: "Plan upgraded successfully" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Insufficient funds" }, { status: 302 });
      }
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

