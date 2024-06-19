import React, { useState } from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import ConvertNow from "./ConvertNow";

const TransactPage = ({ userData }) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  const handleOpen = (actionType) => {
    setAction(actionType);
    setOpen(true);
  };

  return (
    <div className="neo-parent h-full md:max-h-[100vh] w-full flex flex-col gap-2">
      <div className="w-full h-full px-[2rem] pt-[2rem] overflow-y-scroll md:overflow-hidden">
        <div className="text-5xl w-full text-neutral-200 font-semibold antialiased mb-2">
          Swap Fiat
        </div>
        <div className="flex items-center gap-4 h-full md:h-[85vh] w-full">
          <div className="grid md:grid-cols-6 w-full h-full gap-6">
            {/* left  section  */}
            <div className="h-full md:col-span-4 p-0 md:py-[1rem] md:px-[2rem] flex flex-col justify-around gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="neo-card flex flex-col px-[2rem] py-[1rem] gap-[.5rem]">
                  <div className="text-xl font-light">Current INR</div>
                  <div className="text-3xl font-semibold self-center">
                    &#8377; 1,00,000
                  </div>
                </div>
                <div className="neo-card flex flex-col px-[2rem] py-[1rem] gap-[.5rem]">
                  <div className="text-xl font-light">Current USD</div>
                  <div className="text-3xl font-semibold self-center">
                    $ 1,117.32
                  </div>
                </div>
              </div>
              <div className="neo-card flex flex-col max-h-[calc(68vh-4rem)] px-[2rem] py-[1rem]">
                <div className="text-xl font-light">Transaction Initiated</div>
                <div className="self-start w-full overflow-y-auto py-[2rem]">
                  <ul className="events">
                    <li>
                      <time datetime="10:03">10:03</time>
                      <span>
                        <strong>Transaction Initiated</strong> On time
                      </span>
                    </li>
                    <li>
                      <time datetime="10:03">10:03</time>
                      <span>
                        <strong>Cash Received</strong> On time
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
            <div className="h-full md:col-span-2 flex flex-col justify-center gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div
                  onClick={() => handleOpen("Deposit")}
                  className="text-neutral-800 text-[1.1rem] cursor-pointer font-semibold rounded-xl hover:bg-neutral-500 bg-neutral-100 flex justify-center items-center px-[1rem] py-[1.8rem] gap-[.2rem]"
                >
                  Deposit <BsArrowUpRightCircleFill />
                </div>
                <div
                  onClick={() => handleOpen("Withdraw")}
                  className="text-neutral-800 text-[1.1rem] cursor-pointer font-semibold rounded-xl hover:bg-neutral-500 bg-neutral-100 flex justify-center items-center px-[1rem] py-[1.8rem] gap-[.2rem]"
                >
                  Withdraw <BsArrowUpRightCircleFill />
                </div>
                <ConvertNow
                  isOpen={open}
                  onClose={() => setOpen(false)}
                  action={action}
                />
              </div>
              <div className="neo-card flex flex-col h-full max-h-[calc(75vh-4rem)] px-[1rem] py-[1rem]">
                <div className="text-xl font-light px-[1rem]">Transactions</div>
                <div className="self-start w-full overflow-y-auto py-[2rem] px-[1rem] gap-3 flex flex-col">
                  <div className="h-full md:col-span-4 py-[1rem] px-[2rem] flex flex-col justify-around gap-6"></div>
                  {[
                    "1,00,000",
                    "2,00,000",
                    "1,40,000",
                    "7,80,000",
                    "6,90,000",
                    "9,20,000",
                    "7,05,000",
                  ].map((val, index) => (
                    <div
                      key={index}
                      className="text-neutral-100 rounded-xl hover:bg-neutral-700 text-xl flex gap-2 p-4 bg-neutral-800 items-center font-bold w-full"
                    >
                      Transaction &#8377;{val} <BsArrowUpRightCircleFill />
                    </div>
                  ))}
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
