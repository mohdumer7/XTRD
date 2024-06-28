import React, { useState } from "react";
import { BsArrowUpRightCircleFill, BsCheckCircleFill, BsClockFill, BsExclamationCircleFill } from "react-icons/bs";
import ConvertNow from "./ConvertNow";

const TransactPage = ({ userData }) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleOpen = (actionType) => {
    setAction(actionType);
    setOpen(true);
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusSteps = (status) => {
    const statusSteps = {
      Initiated:          ["Initiated", "Waiting for Approval"],
      Approved:           ["Initiated", "Approved", "Processing"],
      Processing:         ["Initiated", "Approved", "Processed", "Transferring to Bank"],
      Done:               ["Initiated", "Waiting for Approval", "Approved", "Processed", "Transferring to Bank", "Done"],
      Cancelled:          ["Initiated", "Cancelled"],
      Dispute:            ["Initiated", "Dispute"],
      "Dispute Resolved": ["Initiated", "Dispute", "Dispute Resolved"],
    };
    return statusSteps[status] || [];
  };

  const statusIcons = {
    Initiated: <BsCheckCircleFill className="text-purple-500" size={24} />,
    Approved: <BsCheckCircleFill className="text-blue-500" size={24} />,
    Processing: <BsCheckCircleFill className="text-yellow-500" size={24} />,
    Processed: <BsCheckCircleFill className="text-blue-500" size={24} />,
    Done: <BsCheckCircleFill className="text-green-500" size={24} />,
    Cancelled: <BsExclamationCircleFill className="text-red-500" size={24} />,
    Dispute: <BsExclamationCircleFill className="text-red-500" size={24} />,
    "Dispute Resolved": <BsCheckCircleFill className="text-green-500" size={24} />,
    "Waiting for Approval": <BsClockFill className="text-yellow-500" size={24} />,
    "Waiting for Processing": <BsClockFill className="text-yellow-500" size={24} />,
    "Transferring to Bank": <BsClockFill className="text-white-500" size={24} />,
  };

  const statusDescriptions = {
    Initiated: "Your transaction has been initiated and will soon be sent for approval.",
    Approved: "Your transaction has been approved.",
    Processing: "Your transaction is being processed.",
    Processed: "Your transaction has been processed.",
    Done: "Your transaction is complete.",
    Cancelled: "Your transaction has been cancelled.",
    Dispute: "Your transaction is in dispute.",
    "Dispute Resolved": "The dispute for your transaction has been resolved.",
    "Waiting for Approval": "Your transaction is waiting for approval, this usually takes 24 hrs",
    "Waiting for Processing": "Your transaction is waiting to be processed, this usually takes 24 hrs",
    "Transferring to Bank": "Your transaction is transferring the amount to the bank, this usually takes 24 hrs",
  };

  return (
    <div className="neo-parent h-full md:max-h-[100vh] w-full flex flex-col gap-2">
      <div className="w-full h-full px-[2rem] pt-[2rem] overflow-y-scroll md:overflow-hidden">
        <div className="text-5xl w-full text-neutral-200 font-semibold antialiased mb-2">
          Swap Fiat
        </div>
        <div className="flex items-center gap-4 h-full md:h-[85vh] w-full">
          <div className="grid md:grid-cols-6 w-full h-full gap-6">
            {/* left section */}
            <div className="h-full md:col-span-4 p-0 md:py-[1rem] md:px-[2rem] flex flex-col justify-around gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="neo-card flex flex-col px-[2rem] py-[1rem] gap-[.5rem]">
                  <div className="text-xl font-light">Available to Withdraw</div>
                  <div className="text-3xl font-semibold self-center">
                    $ {userData.lifetimeInvestment - userData.currentInvestment}
                  </div>
                </div>
                <div className="neo-card flex flex-col px-[2rem] py-[1rem] gap-[.5rem]">
                  <div className="text-xl font-light">Currently Invested</div>
                  <div className="text-3xl font-semibold self-center">
                    ${userData.currentInvestment}
                  </div>
                </div>
              </div>
              <div className="neo-card bg-gray-800 min-h-[80%] rounded-lg shadow-md max-w-full p-6">
                <div className="text-2xl font-semibold mb-6 text-gray-100 ">
                  <p>Transaction Details</p>
                  <p className="text-sm font-thin text-gray-500 w-full text-right">order Id: {selectedTransaction ? `${selectedTransaction.otId}` : ""}</p>
                </div>
                <div className="rounded-lg p-4 max-h-full overflow-y-auto">
                  {selectedTransaction ? (
                    <ul className="relative">
                      {getStatusSteps(selectedTransaction.status).map((step, index, array) => (
                        <li key={index} className="flex items-start space-x-4">
                          <div className="flex flex-col items-center">
                            {statusIcons[step]}
                            {index < array.length - 1 && (
                              <div className="h-16 border-l-4 border-gray-500 "></div>
                            )}
                          </div>
                          <div className="ml-4 flex-grow">
                            <div className="font-medium text-gray-200">
                              {step} {step === selectedTransaction.type ? selectedTransaction.amount : ""} {step === selectedTransaction.type ? selectedTransaction.fromCurrency : ""}
                            </div>
                            <div className="text-sm text-gray-400">
                              {statusDescriptions[step]}
                            </div>
                            <div className="text-sm text-gray-400">
                              <span>{step === selectedTransaction.type ? selectedTransaction.status : ""}</span>
                              
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">Select a transaction to view details</p>
                  )}
                </div>
              </div>
            </div>
            {/* right section */}
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
                <div className="text-4xl font-bold text-gray-300  p-[1rem]">Transactions</div>
                <div className="self-start w-full overflow-y-auto py-[2rem] px-[1rem] gap-3 flex flex-col">
                  
                  {userData.transactions.map((transaction, index) => (
                    <div
                      key={transaction._id}
                      className="text-neutral-100 rounded-xl hover:bg-neutral-700 text-xl flex gap-2 p-4 bg-neutral-800 items-center font-bold w-full cursor-pointer"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      {transaction.type} {transaction.fromCurrency} {transaction.amount} <BsArrowUpRightCircleFill />
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
