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
    <div className="neo-parent  h-full  w-full p-8 pt-20 flex flex-col gap-2 ">
      <div className="text-5xl w-full mb-4 text-neutral-200 font-semibold antialiased  ">
        Dashboard
      </div>
      <div className="w-full h-full mt-4 ">
        <div className="grid grid-cols-3 items-center gap-4 h-full w-full">
          <div className="gap-2 flex flex-col p-12 col-span-2 rounded-xl h-full w-full neo-card">
            <div className="w-full text-neutral-300 text-4xl font-bold ">
              Total Portfolio
            </div>
            <div className="w-full h-full flex gap-4 items-center">
              <div className="w-1/2 h-full justify-center flex flex-col">
                <div className="font-bold text-6xl p-2 ">&#8377; 1,20,00</div>
                <div className="font-bold text-green-500 flex ml-2 gap-1 items-center text-lg p-2 w-full">
                  +4%
                  <FaArrowAltCircleUp />
                  <div className="text-neutral-500">
                    (w.r.t inital investment)
                  </div>
                </div>
              </div>
              <div className="w-full h-full p-4">
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

          <div className="col-span-1 flex flex-col p-8 rounded-md row-span-2  h-full w-full neo-card">
            <div className="w-full p-2 text-6xl font-bold text-neutral-300">
              Transactions
            </div>
            <div className="flex w-full text-2xl font-bold text-neutral-600 h-full justify-center items-center">
              No Transactions Yet
            </div>
          </div>
          <div className=" p-8 flex flex-col col-span-2 rounded-3xl neo-card h-full w-full ">
            <p className="text-neutral-200 text-3xl font-bold w-full h-max">
              Current Investment
            </p>
            <div className="w-full p-4 pb-0 h-full flex items-center">
              <div className="text-neutral-500 text-6xl  font-bold w-1/2 max-h-10">
                &#8377; 1,00,00
              </div>
              <div className="text-neutral-100 rounded-xl hover:bg-neutral-700 text-2xl flex gap-2 p-8 bg-neutral-800 items-center font-bold w-1/2 ">
                Add more Funds <BsArrowUpRightCircleFill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
