import React from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { testGraphData } from "../../../../constants/testData";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = ({ userData }) => {
  return (
    <div className="neo-parent  h-full w-full py-[2rem] px-[3rem] flex flex-col gap-2 ">
      <div className="text-5xl w-full text-neutral-200 font-semibold antialiased  mb-2">
        Dashboard
      </div>
      {/* <div className="w-full h-full mt-2 "> */}
      <div className="grid grid-cols-12 items-center gap-4 w-full h-full">
        <div className="col-span-12 md:col-span-8 flex flex-col h-full gap-[2rem] justify-around ">
          <div className="gap-2 flex flex-col p-[2rem] rounded-xl w-full neo-card h-[50%]">
            <div className="w-full text-neutral-300 text-3xl font-bold ">
              Total Portfolio
            </div>
            <div className="w-full h-full flex-col sm:flex-row flex gap-4 items-center">
              <div className="w-2/2 md:w-1/2 h-full justify-center flex flex-col">
                <div className="font-bold text-4xl p-2 ">&#8377; 1,20,00</div>
                <div className="font-bold text-green-500 flex ml-2 gap-1 items-center text-lg p-2 w-full">
                  +4%
                  <FaArrowAltCircleUp />
                  <div className="text-neutral-500">
                    (w.r.t inital investment)
                  </div>
                </div>
              </div>
              <div className="w-full h-full ">
                <ResponsiveContainer width="100%" height="90%">
                  <AreaChart data={testGraphData}>
                    <YAxis
                      stroke="#707373"
                      axisLine={false}
                      className="text-neutral-600"
                    />
                    <XAxis axisLine={false} tick={false} />
                    <CartesianGrid
                      stroke="#707373"
                      horizontal={true}
                      vertical={false}
                    />
                    <Tooltip />
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="rgb(34,197,94)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="rgb(34,197,94)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="rgb(34,197,94)"
                      fill="url(#colorGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className=" p-8 flex  flex-col rounded-3xl neo-card w-full h-[50%] ">
            <p className="text-neutral-200 text-3xl font-bold w-full ">
              Current Investment
            </p>
            <div className="w-full flex-col sm:flex-row sm:h-full flex items-center gap-[2.5rem] sm:gap-1 justify-center sm:justify-around">
              <div className="text-neutral-500 text-4xl  font-bold w-2/2 sm:w-1/2 ">
                &#8377; 1,00,00
              </div>
              <div className="text-neutral-100 rounded-xl hover:bg-neutral-700 text-2xl flex gap-2 p-8 bg-neutral-800 items-center font-bold w-full sm:w-1/2 ">
                Add more Funds <BsArrowUpRightCircleFill />
              </div>
            </div>
          </div>
        </div>
        <div className="neo-card col-span-12 md:col-span-4 flex flex-col h-full  max-h-[calc(89vh-4rem)]  px-[1rem] py-[1rem]">
          <div className="w-full p-2 text-3xl font-bold text-neutral-300">
            Transactions
          </div>
          <div className="self-start w-full overflow-y-auto py-[1rem] px-[1rem] gap-3 flex flex-col ">
          {userData.transactions.map((transaction, index) => (
                    <div
                      key={transaction._id}
                      className="text-neutral-100 rounded-xl hover:bg-neutral-700 text-xl flex gap-2 p-4 bg-neutral-800 items-center font-bold w-full cursor-pointer"
                      
                    >
                      {transaction.type} {transaction.fromCurrency} {transaction.amount} <BsArrowUpRightCircleFill />
                    </div>
                  ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default DashboardPage;
