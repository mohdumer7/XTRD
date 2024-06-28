"use client";
import { MdSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import DotBackground from "../components/ui/dotBackgound";
import { GiArmorUpgrade } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { RiP2PFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import { FaWallet } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import { RiCoinsFill } from "react-icons/ri";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import useUserSession from "../hooks/useUserSession";

export default function authLayout({ children }) {
  const [open, setOpen] = useState(true);
  const {
    user,
  } = useUserSession();
  return (
    <div className="flex">
      <div
        className={`${
          open ? "fixed h-screen lg:relative flex" : "hidden"
        }  h-full w-full  left-0  z-10 top-0 sm:w-2/5 lg:w-1/5 min-h-screen  neo-out-card  bg-[#4a2d7e] justify-between flex-col`}
      >
        {/* logo and toggle */}
        <div className="flex p-4 w-full items-center justify-between ">
          <div className="flex ">
            {/* <img src="/logo.svg" className="h-[30px] opacity-70" /> */}
            {/* <p className="text-3xl pl-2 font-extrabold tracking-wide">
                    XTRD
                  </p> */}
            <img src="/xtrd_logo.svg" className="w-[100%] h-[42px]" />
          </div>
          <button
            className="p-[.3rem] bg-red-500 rounded-lg"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
        {/* logo and toggle end */}
        <div className="flex flex-col p-8 overflow-auto gap-4">
          <Link
            href="/dashboard"
            replace
            className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
          >
            <MdSpaceDashboard /> Dashboard
          </Link>
          <Link
            href="/dashboard/upgrade"
            replace
            className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
          >
            <GiArmorUpgrade /> Upgrade
          </Link>
          <Link
            href="/dashboard/support"
            replace
            className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
          >
            <BiSupport /> Support
          </Link>

            <Link
              href="/dashboard/transact"
              replace
              className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
            >
              <RiCoinsFill /> Swap fiat
            </Link>
          {/* <Link
            href="/dashboard/wallet"
            replace
            className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
          >
            <FaWallet /> Wallet
          </Link>
          <Link
            href="/dashboard/p2p"
            replace
            className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
          >
            <RiP2PFill /> P2P
          </Link> */}
        </div>
        <div className="gap-8 p-8 flex flex-col">
          {/* <div className="flex flex-col mb-5">
            <p className="text-2xl flex gap-2 items-center text-purple-500">
              Elite Features
              <RiVipCrownFill />
            </p>
            <Link
              href="/dashboard/transact"
              replace
              className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
            >
              <RiCoinsFill /> Swap fiat
            </Link>
          </div> */}
          <button
            onClick={signOut}
            href="dashboard"
            className="text-xl w-full my-6 hover:bg-neutral-300 text-black gap-4 mb-2 flex justify-center items-center p-2 bg-white rounded-md"
          >
            <IoIosLogOut /> Log Out
          </button>
          <div className=" flex gap-2 items-center">
            <div className="w-1/3 ">
              <img
                src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=029"
                alt="pf"
              />
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="flex items-center font-bold text-xs w-full h-2/3 md:text-base">
                {user?.firstName}  {user?.lastName}
              </div>
              <div className=" w-full h-1/3">{user?.userPlan}</div>
            </div>
          </div>
        </div>
      </div>
      <section className="h-full md:h-screen overflow-x-auto w-full flex text-white  dashboard-bg ">
        {/* <div className="h-full"> */}
        {/* <section className="w-full h-screen flex relative isolate aspect-video bg-[#121212] shadow-lg ring-1 ring-black shadow-lg"> */}
        {/* Scrollable Content */}
        {/* <div className=" opacity-20 h-full w-[1px] min-h-full relative">
              <div
                className="absolute left-1/2 transform translate-y-[80px] rounded-3xl translate-x-1/2 top-0 bottom-0 bg-slate-100 w-px"
                style={{ height: "90%" }}
              ></div>
            </div> */}
        <div className="w-full h-full lg:h-screen  scroll-custom relative ml-1/12">
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className={`${
              open ? " hidden" : " bg-green-500"
            } p-[4px] top-6 absolute rounded-tr-lg rounded-br-lg font-bold `}
          >
            {open ? "" : <GiHamburgerMenu />}
          </button>
          {children}
        </div>
      </section>
      {/* </div> */}
      {/* </section> */}
    </div>
  );
}
