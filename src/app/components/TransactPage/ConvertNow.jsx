import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ConvertNow = ({ isOpen, onClose, action }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const user = useSelector((state) => state.user);
  const [withdrawWalletAddress,setWithdrawWalletAddress] = useState("")
  const [withdrawBankAccountNumber,setWithDrawBankAccountNumber] = useState("")
  const [withdrawBankIfsc,setWithDrawBankIfsc] = useState("")
  const apiUrl =
    process.env.currentEnv === "LOCAL" ? process.env.LOCAL : process.env.PROD;
console.log(user)
  useEffect(() => {
    setAmount("");
    setFile(null);
    setFileName("");
    setFilePreview(null);
  }, [isOpen, selectedCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleWithdrawWalletAddress = (e)=>{
    setWithdrawWalletAddress(e.target.value)
  }
  const handleWithdrawBankAccount = (e)=>{
    setWithDrawBankAccountNumber(e.target.value)
  }
  const handleWithdrawBankIfsc = (e)=>{
    setWithDrawBankIfsc(e.target.value)
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setFileName(selectedFile.name);
      if (selectedFile.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setFilePreview(previewUrl);
      } else {
        setFilePreview(null);
      }
    } else {
      setFileName("");
      setFilePreview(null);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleAction = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("amount", amount);
    formData.append("currency", selectedCurrency);
    formData.append("action", action);
    formData.append("userId", user.id);
    if (file) {
      formData.append("file", file);
    }
    if(action === "Withdraw"){
      formData.append("withdrawWalletAddress",withdrawWalletAddress)
      formData.append("withdrawBankAccountNumber",withdrawBankAccountNumber)
      formData.append("withdrawBankIfsc",withdrawBankIfsc)
    }

    const response = await fetch("/api/transactions", {
      method: "POST",
      body: formData,
    });
    console.log(response)
    if (response.ok) {
      toast.success(`${action} Request has been placed`);
      onClose();
    } else {
      toast.error("Something Went Wrong!");
    }
    e.target.disabled = false;
  };

  const walletAddress = "0xbcae4e61f719833517ba389f5751e90cb07ad7c2";
  const bankDetails = {
    accountNumber: "1234567890",
    ifscCode: "IFSC0000123",
  };

  // Determine if Deposit button should be enabled
  console.log(!!amount && !!withdrawWalletAddress)
  let isDepositButtonEnabled = false
  if(action === "Withdraw"){
    if(selectedCurrency === "USDT"){
      isDepositButtonEnabled = !!amount && !!withdrawWalletAddress
    }else{
      isDepositButtonEnabled = !!amount && !!withdrawBankAccountNumber && !!withdrawBankIfsc
    }
  }else{
    isDepositButtonEnabled = !!amount && !!file;
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="text-center w-[40vw] h-fit flex flex-col items-center justify-center">
        <div className="mx-auto my-4 w-full flex flex-col items-center justify-center gap-6">
          <h3 className="text-2xl font-extrabold text-gray-800">
            {action ? `${action} Currency` : "Currency Action"}
          </h3>
          <div className="w-[80%]">
            <select
              className="w-full p-2 rounded-lg px-[1rem] bg-slate-300 font-[600] text-black"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <option value="USDT" className="font-[600] text-black py-4">
                USDT
              </option>
              <option value="INR" className="font-[600] text-black py-4">
                INR
              </option>
            </select>
            <input
              type="number"
              className="w-full p-2 mt-4 border border-gray-300 rounded"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter Amount"
            />
            {action==="Deposit" && (<input
              type="file"
              className="w-full p-2 mt-4 border border-gray-300 rounded"
              onChange={handleFileChange}
            />)}
            {fileName && (
              <div className="flex items-center mt-2">
                <AiOutlineCheckCircle className="text-green-500 mr-2" />
                <span className="text-black">{fileName}</span>
              </div>
            )}
            {filePreview && (
              <div className="mt-4">
                <img
                  src={filePreview}
                  alt="File Preview"
                  className="w-32 h-32 object-contain rounded"
                />
              </div>
            )}
            {selectedCurrency === "USDT" && action === "Deposit" && (
              <div className="mt-4">
                <div className="flex items-center justify-between p-2 border border-gray-300 rounded">
                  <span className="text-gray-700">{walletAddress}</span>
                  <FaCopy
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleCopy(walletAddress)}
                  />
                </div>
                <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100 text-left text-black ">
                <p className="text-black font-bold text-2xl w-full flex justify-center mb-4">INSTRUCTIONS</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 1:</span> Copy the address and deposit the said amount to the wallet.</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 2:</span> Please ensure to select AVAX chain or Avalanche chain.</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 3:</span> Please ensure that the amount entered here is the same as the amount that shall be deposited.</p>
                </div>
              </div>
            )}
            {selectedCurrency === "INR" && action === "Deposit" && (
              <div className="mt-4">
                <div className="flex items-center justify-between p-2 border border-gray-300 rounded">
                  <div>

                  <span className="text-gray-700 ">Bank Account No: </span>
                  <span className="text-black font-bold">{bankDetails.accountNumber}</span>
                  </div>
                  <FaCopy
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleCopy(bankDetails.accountNumber)}
                  />
                </div>
                <div className="flex items-center justify-between p-2 border border-gray-300 rounded mt-2">
                  <div>

                <span className="text-gray-700 ">IFSC: </span>
                  <span className="text-black font-bold">{bankDetails.ifscCode}</span>
                  </div>
                  <FaCopy
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleCopy(bankDetails.ifscCode)}
                    />
                </div>
                <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100 text-left text-black ">
                <p className="text-black font-bold text-2xl w-full flex justify-center mb-4">INSTRUCTIONS</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 1:</span> Copy the account number and IFSC code.</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 2:</span> Transfer to our bank using cash in hand or machine deposit.</p>
                  <p className="italic mb-2 text-red-800"><span className="font-extrabold">NOTE:</span> Do not transfer through UPI/NEFT/RTGS, doing this may lead to your money being blocked if flagged and we are not responsible for it.</p>
                </div>

              </div>
            )}
            {selectedCurrency === "USDT" && action === "Withdraw" && (
              <div className="mt-4">
                  <input
                type="string"
                className="w-full p-2 mt-4 border border-gray-300 rounded"
                value={withdrawWalletAddress}
                onChange={handleWithdrawWalletAddress}
                placeholder="Enter Wallet Address"
              />
                <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100 text-left text-black ">
                <p className="text-black font-bold text-2xl w-full flex justify-center mb-4">INSTRUCTIONS</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 1:</span> Copy the address and deposit the said amount to the wallet.</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 2:</span> Please ensure to select AVAX chain or Avalanche chain.</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 3:</span> Please ensure that the amount entered here is the same as the amount that shall be deposited.</p>
                </div>
              </div>
            )}
            {selectedCurrency === "INR" && action === "Withdraw" && (
              <div className="mt-4">
                 <input
                type="string"
                className="w-full p-2 mt-4 border border-gray-300 rounded"
                value={withdrawBankAccountNumber}
                onChange={handleWithdrawBankAccount}
                placeholder="Enter Bank Account Number"
              />
              

              <input
                type="string"
                className="w-full p-2 mt-4 border border-gray-300 rounded"
                value={withdrawBankIfsc}
                onChange={handleWithdrawBankIfsc}
                placeholder="Enter Bank Ifsc"
              />
                <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100 text-left text-black ">
                <p className="text-black font-bold text-2xl w-full flex justify-center mb-4">INSTRUCTIONS</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 1:</span> Copy the account number and IFSC code.</p>
                  <p className="italic mb-2"><span className="font-extrabold">Step 2:</span> Transfer to our bank using cash in hand or machine deposit.</p>
                  <p className="italic mb-2 text-red-800"><span className="font-extrabold">NOTE:</span> Do not transfer through UPI/NEFT/RTGS, doing this may lead to your money being blocked if flagged and we are not responsible for it.</p>
                </div>

              </div>
            )}
          </div>
        </div>
        <div className="flex md:px-[3rem] w-full gap-4">
          <button
            className={`py-[0.7rem] rounded-2xl px-[2rem] w-full text-[1rem] font-semibold ${!isDepositButtonEnabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#492d7eb5] text-neutral-900'}`}
            onClick={handleAction}
            disabled={!isDepositButtonEnabled}
          >
            {action ? action.toUpperCase() : "ACTION"}
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

export default ConvertNow;
