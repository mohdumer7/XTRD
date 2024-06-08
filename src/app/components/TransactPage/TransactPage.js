"use client";

import React, { useState } from "react";
import "./styles.css";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import Modal from "./Modal";
import { VscArrowSwap } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ConvertNow = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("usdtToCoin");
  const [inputValue, setInputValue] = useState("");
  const user = useSelector((state) => state.user);
  const [outputValue, setOutputValue] = useState("");
  const apiUrl =
    process.env.currentEnv === "LOCAL" ? process.env.LOCAL : process.env.PROD;
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (selectedOption === "usdtToCoin") {
      // Convert USDT to Coin
      setOutputValue(parseFloat(e.target.value) * 2); // For example, conversion rate is 2
    } else if (selectedOption === "coinToUsdt") {
      // Convert Coin to USDT
      setOutputValue(parseFloat(e.target.value) / 2); // For example, conversion rate is 2
    }
  };
  console.log({ user });
  const convertCoin = async (e) => {
    e.target.disabled = true;
    console.log({ user });
    const response = await fetch(`${apiUrl}/api/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: user.email,
        to: "0xbcae4e61f719833517ba389f5751e90cb07ad7c2",
        amount: 2,
        fromCurrency: "USDT",
        toCurrency: "USDT",
        userId: user.id,
        from: user.email,
      }),
    });
    if (response.status === 200) {
      toast.success("Withdrawl Request has been placed");
      onClose();
    } else {
      toast.error("Something Went Wrong!");
    }
    e.target.disabled = false;
    console.log("response for the withdrawl trade", response);
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="text-center w-[40vw] h-fit flex flex-col items-center justify-center">
        {/* <FaTrash size={56} className="mx-auto text-red-500" /> */}
        <div className="mx-auto  my-4 w-full flex flex-col items-center justify-center gap-6">
          <h3 className="text-2xl font-extrabold text-gray-800">
            Convert Your Currency
          </h3>
          <div className="w-[80%]">
            <select
              className="w-full p-2 rounded-lg px-[1rem] bg-slate-300 font-[600] text-black"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="usdtToCoin" className="font-[600] text-black py-4">
                USDT to Coin
              </option>
              <option value="coinToUsdt" className="font-[600] text-black py-4">
                Coin to USDT
              </option>
            </select>

            {selectedOption && (
              <div
                className={`flex gap-4 items-center justify-center mt-4 ${
                  selectedOption === "usdtToCoin"
                    ? "flex-row"
                    : "flex-row-reverse"
                }`}
              >
                <div className="flex flex-col justify-start items-start w-[95%]">
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value="88.9"
                    onChange={handleInputChange}
                    placeholder="USDT"
                    disabled
                    readOnly
                  />
                  <p className="text-lg text-black font-[600]">
                    {" "}
                    Current USDT Value
                  </p>
                </div>
                <VscArrowSwap className="text-black w-[10%] text-2xl" />
                <div className="flex flex-col justify-start items-start w-[95%]">
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value="98.9"
                    onChange={handleInputChange}
                    placeholder="USDT"
                    disabled
                    readOnly
                  />
                  <p className="text-lg text-black font-[600]"> Current Coin</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex md:px-[3rem] w-full gap-4">
          <button
            className="bg-[#492d7eb5] py-[0.7rem] rounded-2xl px-[2rem] w-full text-[1rem] font-semibold"
            onClick={(e) => convertCoin(e)}
          >
            CONVERT
          </button>
          <button
            className="bg-red-500 py-[0.7rem] px-[2rem] rounded-2xl w-full text-[1rem] font-semibold"
            onClick={onClose}
          >
            CANCEL
          </button>
        </div>
      </div>
    </Modal>
  );
};

const TransactPage = ({ userData }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="neo-parent h-full md:max-h-[100vh]  w-full  flex flex-col gap-2 ">
      {/* <div className="text-[1.4rem] w-full bg-[#342157] px-[1rem] py-[.7rem] text-neutral-200 font-semibold   ">
        Hello, Nihal Lalu
      </div> */}
      <div className="w-full h-full px-[2rem] pt-[2rem] overflow-y-scroll md:overflow-hidden">
        <div className="text-[2rem] w-full text-neutral-200 font-semibold antialiased  ">
          Hello, Nihal Lalu
        </div>
        <div className="text-[1.2rem] w-full text-neutral-200 font-semibold antialiased  ">
          Swap Fiat
        </div>
        <div className="flex items-center gap-4 h-full md:h-[85vh] w-full">
          <div className="grid md:grid-cols-6 w-full h-full gap-6">
            {/* left  section  */}
            <div className=" h-full md:col-span-4 p-0 md:py-[1rem] md:px-[2rem] flex flex-col justify-around gap-6">
              <div className="grid md:grid-cols-2 gap-6 ">
                <div className="neo-card flex flex-col px-[2rem] py-[1rem] gap-[.5rem] ">
                  <div className="text-xl font-light"> Current INR</div>
                  <div className="text-3xl font-semibold self-center">
                    &#8377; 1,00,000
                  </div>
                </div>
                <div className="neo-card flex flex-col px-[2rem] py-[1rem] gap-[.5rem] ">
                  <div className="text-xl font-light"> Current USD</div>
                  <div className="text-3xl font-semibold self-center">
                    $ 1,117.32
                  </div>
                </div>
              </div>
              <div className="neo-card flex flex-col  max-h-[calc(68vh-4rem)]  px-[2rem] py-[1rem]">
                <div className="text-xl font-light">Transaction Initiated</div>
                <div className="self-start w-full overflow-y-auto py-[2rem] ">
                  <ul class="events">
                    <li>
                      <time datetime="10:03">10:03</time>
                      <span>
                        <strong>Transiaction Initiated</strong> On time
                      </span>
                    </li>

                    <li>
                      <time datetime="10:03">10:03</time>
                      <span>
                        <strong>Cash Recieved</strong> On time
                      </span>
                    </li>

                    <li>
                      <time datetime="10:03">10:03</time>
                      <span>
                        <strong>VSDT Pooled</strong> On time and other text that
                        may span over 2 lines
                      </span>
                    </li>
                    <li>
                      <time datetime="10:03">10:03</time>
                      <span>
                        <strong>VSDT Pooled</strong> On time and other text that
                        may span over 2 lines
                      </span>
                    </li>
                    <li>
                      <time datetime="10:03">10:03</time>
                      <span>
                        <strong>VSDT Pooled</strong> On time and other text that
                        may span over 2 lines
                      </span>
                    </li>

                    <li>
                      <time datetime="10:03">10:03</time>
                      <span>
                        <strong className="text-green-500">Done</strong> On time
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* right  section  */}
            <div className=" h-full md:col-span-2 flex flex-col justify-center gap-3">
              <div className="grid md:grid-cols-2 gap-3 ">
                <div
                  onClick={() => setOpen(true)}
                  className="text-neutral-800 text-[1.1rem] cursor-pointer font-semibold rounded-xl hover:bg-neutral-500 bg-neutral-100 flex justify-center items-center px-[1rem] py-[1.8rem] gap-[.2rem]"
                >
                  Convert now <BsArrowUpRightCircleFill />
                </div>
                <ConvertNow isOpen={open} onClose={() => setOpen(false)} />
                <div className="text-neutral-800 text-[1.1rem] font-semibold rounded-xl hover:bg-neutral-500 bg-neutral-100 flex justify-center items-center px-[1rem] py-[1.8rem] gap-[.2rem] ">
                  Add more Funds <BsArrowUpRightCircleFill />
                </div>
              </div>
              <div className="neo-card flex flex-col h-full  max-h-[calc(75vh-4rem)]  px-[1rem] py-[1rem]">
                <div className="text-xl font-light px-[1rem]">Transactions</div>
                <div className="self-start w-full overflow-y-auto py-[2rem] px-[1rem] gap-3 flex flex-col ">
                  <div className=" h-full md:col-span-4 py-[1rem] px-[2rem] flex flex-col justify-around gap-6"></div>
                  {[
                    "1,00,000",
                    "2,00,000",
                    "1,40,000",
                    "7,80,000",
                    "6,90,000",
                    "9,20,000",
                    "7,05,000",
                  ].map((val, index) => {
                    return (
                      <div
                        key={index}
                        className="text-neutral-100 rounded-xl hover:bg-neutral-700 text-xl flex gap-2 p-4 bg-neutral-800 items-center font-bold w-full "
                      >
                        Transaction &#8377;{val} <BsArrowUpRightCircleFill />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactPage;
