"use client";
import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import CountUp from "react-countup";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function Tradercard({ data, getTraderData, id }) {
  const [value, setValue] = useState("0000000");
  const testImg =
    "data:image/jpeg;base64,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";

  useEffect(() => {
    const finalValue = "1000687";
    const intervalId = setInterval(() => {
      const newValue = generateRandomValue(finalValue);
      setValue(newValue);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  const generateRandomValue = (finalValue) => {
    const randomValue = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, "0");
    const steps = 50;
    const stepDelay = 30;

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        const interpolatedValue = finalValue
          .split("")
          .map((digit, index) => {
            const startDigit = randomValue[index];
            const endDigit = digit;
            const progress = i / steps;
            const interpolatedDigit = Math.round(
              parseInt(startDigit, 10) +
                progress * (parseInt(endDigit, 10) - parseInt(startDigit, 10))
            );
            return interpolatedDigit.toString();
          })
          .join("");
        setValue(interpolatedValue);
      }, i * stepDelay);
    }

    return finalValue;
  };
  return (
    <>
      <div
        className="trader-card primary-color-bar w-full rounded-2xl md:p-2 lg:p-8 "
        data-cursor-text="Click to see more"
        onClick={(e) => {
          getTraderData(e, id);
        }}
        data-cursor-size="100px"
      >
        <div className="flex justify-between h-full w-full">
          <div className="flex flex-col relative w-2/3 items-center lg:justify-between md:justify-center">
            <img
              className="rounded-full sm:w-20 sm:h-20 lg:w-44 lg:h-44 object-cover border-4 border-zinc-600 "
              src={testImg}
            ></img>
            <p className=" dashboard-bg font-bold p-4 rounded-xl sm:text-[10px] md:text[20px] sm:p-2 lg:text-2xl">
              XTRD Bot
            </p>
          </div>
          <div className="w-full h-full dashboard-bg rounded-xl flex flex-col p-8 justify-between">
            <div className="flex flex-col h-1/3 justify-between ">
              <p className="font-medium pb-2 sm:text-sm md:text-[10px] lg:text-[15px]">
                Total Asset Value
              </p>
              <div className="flex w-full">
                <p className="sm:text-[5px] md:text-[10px] lg:text-lg xl:text-lg 2xl:text-4xl flex w-full font-bold items-end">
                  <CountUp
                    start={0}
                    end={1605270}
                    duration={3}
                    separator=" "
                    delay={0}
                    decimal=","
                    prefix="$ "
                  >
                    {({ countUpRef }) => (
                      <span className="w-max" ref={countUpRef} />
                    )}
                  </CountUp>
                  <CountUp
                    start={0}
                    end={39.89}
                    duration={3}
                    separator=" "
                    delay={0}
                    decimals={2}
                    decimal="."
                    prefix="+"
                    suffix="%"
                  >
                    {({ countUpRef }) => (
                      <span
                        className="text-lime-500 pl-2 w-max sm:text-[3px] md:text-[7px] lg:text-xs xl:text-base 2xl:text-base "
                        ref={countUpRef}
                      />
                    )}
                  </CountUp>
                </p>
              </div>
            </div>
            <div className="flex h-2/3 mt-2 justify-around p-4 pr-0 pl-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart width={500} height={400} data={data}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="amt"
                    stroke="#8884d8"
                    // fill="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div
              style={{
                background: "rgba(21, 128, 61, 0.5)",
                border: "1px solid rgba(0, 255, 95, 0.7)",
              }}
              className="w-full rounded-lg text-center volatility text-slate-300"
            >
              Low Volatility
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
