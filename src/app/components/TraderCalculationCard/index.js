"use client";
import React, { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Zoom,
} from "recharts";
import { Tabs, Tab } from "@nextui-org/react";

const TraderCalculationCard = ({ tradeData, chartName }) => {
  const [dataInterval, setdataInterval] = useState("day");
  const [data, setData] = useState(tradeData["day"] ?? {});

  const selectData = (interval) => {
    setdataInterval(interval);
    setData(tradeData[interval]);
  };

  useEffect(() => {
    setData(tradeData[dataInterval]);
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const actualPayLoad = payload[0].payload;

      return (
        <div className="custom-tooltip bg-white text-black p-4 rounded-lg">
          <p className="label">{`Interval : ${actualPayLoad.label}`}</p>
          <p
            className={`label ${
              Number(actualPayLoad.change) > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >{`Change : ${actualPayLoad.change}`}</p>
          <p className="label">{`Current Investemnt Value : ${actualPayLoad.value}`}</p>
          <p
            className={`label ${
              Number(actualPayLoad.WrtInitialInvestment > 0)
                ? "text-green-600"
                : "text-red-600"
            }`}
          >{`WRT inital Investment : ${actualPayLoad.WrtInitialInvestment}`}</p>
        </div>
      );
    }

    return null;
  };

  function zoom() {
    setXAxisBoundaries([rectangle[0], rectangle[1]]);
    setYAxisBoundaries([rectangle[2], rectangle[3]]);
  }

  // const COLORS = rows.map((data) => (data.pnl >= 0 ? "#D0F288" : "#DF826C"));
  const COLORS = ["#D0F288", "#DF826C"];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
            L${x + width},${y + height}
            L${x + width},${y}
            L${x},${y}
            Z`;
  };
  const TriangleBar = (props) => {
    const { change, x, y, width, height } = props;
    const color = change >= 0 ? "#D0F288" : "#DF826C";
    return <path d={getPath(x, y, width, height)} stroke="none" fill={color} />;
  };

  return (
    <>
      <div className="bg-gray-500 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 w-full h-full flex flex-col rounded-2xl">
        <div className="p-4 text-lg  font-bold tracking-widest flex justify-between h-1/6 items-center">
          <p>{chartName}</p>
          <div className="tools flex gap-2">
            <div className="flex flex-wrap gap-2">
              <Tabs
                variant="solid"
                color="default"
                className="dark h-4"
                aria-label="Tabs variants"
              >
                <Tab title={<img src="/icons/data.png" className="h-4" />} />
                <Tab
                  className="w-full"
                  title={<img src="/icons/graph.png" className="h-4" />}
                />
              </Tabs>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tabs
                variant="solid"
                color="default"
                className="dark"
                aria-label="Tabs variants"
                selectedKey={dataInterval}
                onSelectionChange={selectData}
              >
                <Tab title="day" key="day" />
                <Tab title="week" key="week" />
                <Tab title="month" key="month" />
              </Tabs>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="label" />
              <YAxis domain={[-150, 150]} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Legend />
              <Zoom />
              <Brush />
              <Bar dataKey="change" shape={TriangleBar} />
              {/* {rows.map((data, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={data.pnl >= 0 ? "#D0F288" : "#DF826C"}
                />
              ))}
            </Bar> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default TraderCalculationCard;
