"use client";
import TraderCalculationCard from "@/app/components/TraderCalculationCard";
import styles from "./traderInfoStyles.module.css";
import { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import TraderTable from "@/app/components/Table";
import { Tabs, Tab } from "@nextui-org/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

export default function getTraderInfo({ params }) {
  const { id } = params;
  const [traderPositions, setTraderPositions] = useState([]);
  const [positionHistoryTab, setPositionHistoryTab] = useState("data");
  const [percentChange, setPercentChange] = useState({});
  const [cumilitivePnl, setCumilitivePnL] = useState([]);
  const testImg =
    "data:image/jpeg;base64,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";

  const gradientOffset = () => {
    const dataMax = Math.max(...cumilitivePnl.map((i) => i.pnl));
    const dataMin = Math.min(...cumilitivePnl.map((i) => i.pnl));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const actualPayLoad = payload[0].payload;

      return (
        <div className="custom-tooltip bg-white text-black p-4 rounded-lg">
          <p
            className={`label ${
              Number(actualPayLoad.pnl) > 0 ? "text-green-600" : "text-red-600"
            }`}
          >{`pnl : ${actualPayLoad.pnl}`}</p>
        </div>
      );
    }

    return null;
  };

  const off = gradientOffset();

  useEffect(() => {
    if (!id) {
      return;
    }
    (async () => {
      const response = await getData(id);
      setTraderPositions(response?.data?.tradersPositionHistory ?? {});
      setPercentChange(response?.data?.traderPercentChange ?? {});
      setCumilitivePnL(response?.data?.cumilitivePnL ?? {});
    })();
  }, []);

  return (
    <>
      <div className="h-full w-full flex flex-col gap-4">
        <div className="h-screen w-full p-8 flex flex-col">
          <div className=" relative h-1/3 flex flex-col justify-center items-center w-full shadow-[rgba(0,_0,_0,_0.6)_0px_30px_40px] rounded-3xl rounded-br-none rounded-bl-none bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10  overflow-hidden">
            <div
              className=" flex flex-col absolute bottom-20 left-12 text-5xl  rounded-xl"
              style={{ backgroundColor: "#EBECF1 ", color: "#1B1C25" }}
            >
              <p className="text-xl p-2">Total PnL</p>
              <p className="p-3 text-green-600" style={{ color: "#206A5D" }}>
                3347%&#x25B2;
              </p>
            </div>
            <div className=" w-full h-1/3 pt-8 flex items-center justify-center tracking-wide sm:text-xl md:text-7xl font-extrabold text-amber-100">
              <p className=" h-full">THE XTRD BOT</p>
            </div>
            <div className="w-full h-2/3 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart height="100%" width="100%" data={cumilitivePnl}>
                  {/* <YAxis /> */}
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                  />
                  <YAxis domain={[-200, 4000]} opacity={0} />
                  <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset={off} stopColor="#D0F288" stopOpacity={1} />
                      <stop offset={off} stopColor="#DF826C" stopOpacity={1} />
                      {/* <stop offset="100%" stopColor="#888888" stopOpacity={1} /> */}
                    </linearGradient>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D0F288" stopOpacity={0.6} />
                      <stop
                        offset="25%"
                        stopColor="#D0F288"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="50%"
                        stopColor="#D0F288"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="75%"
                        stopColor="#D0F288"
                        stopOpacity={0.08}
                      />
                      <stop
                        offset="95%"
                        stopColor="#D0F288"
                        stopOpacity={0.04}
                      />
                      <stop offset="100%" stopColor="#D0F288" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="pnl"
                    stroke="url(#splitColor)"
                    fill="url(#colorUv)"
                    fillOpacity={0.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="h-2/3 w-full md:gap-0 lg:gap-4 flex pt-8 flex-wrap 2xl:flex-nowrap ">
            <TraderCalculationCard
              chartName="Percent Change"
              tradeData={percentChange}
            />
          </div>
        </div>
        {/* <ScrollShadow className="w-full h-full overflow-scroll">
        </ScrollShadow> */}
        {/* <div className="h-screen ml-[40px] w-full mt-40 lg:mt-0 p-8  flex flex-col shadow-[rgba(0,_0,_0,_0.6)_0px_30px_40px] rounded-3xl rounded-br-none rounded-bl-none bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10">
          <div className="w-full p-4 pl-1 flex justify-between ">
            <p className="w-full text-5xl tracking-wider">Previous Trades</p>
            <Tabs
              variant="solid"
              color="default"
              className="dark mr-5"
              aria-label="Tabs variants"
              selectedKey={positionHistoryTab}
              onSelectionChange={setPositionHistoryTab}
            >
              <Tab
                key="data"
                title={<img src="/icons/data.png" className="h-6 " />}
              />
              <Tab
                key="graph"
                title={<img src="/icons/graph.png" className="h-6 " />}
              />
            </Tabs>
          </div>
          <div className="w-full h-full p-4 pl-0">
            <TraderTable
              rows={traderPositions}
              isGraph={positionHistoryTab === "graph"}
            />
          </div>
        </div> */}
        <div className="h-screen w-full p-8 flex flex-col"></div>
      </div>
    </>
  );
}
async function getData(id) {
  const response = await fetch(
    `http://localhost:8080/api/trader/positionsHistory/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();

  return data;
}
