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
export default function authLayout({ children }) {
  return (
    <>
      <section className="h-screen w-full text-white  dashboard-bg ">
        <DotBackground>
          <section className="w-full flex h-full rounded-2xl isolate aspect-video pl-4 bg-[#121212] shadow-lg ring-1 ring-black shadow-lg">
            {/* Scrollable Content */}
            <div className="h-full w-1/5 min-h-full p-8 neo-out-card  bg-[#121212] justify-between flex flex-col">
              <div className="flex p-2 w-full items-center ">
                <img src="/logo.svg" className="h-[30px] opacity-70" />
                <p className="text-3xl pl-2 font-extrabold tracking-wide">
                  XTRD
                </p>
              </div>
              <div className="flex flex-col h-2/5 gap-4">
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
                  href="/dashboard/wallet"
                  replace
                  className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
                >
                  <FaWallet /> Walltet
                </Link>
                <Link
                  href="/dashboard/p2p"
                  replace
                  className="text-xl hover:text-white text-neutral-300 gap-2 flex items-center p-2 hover:bg-zinc-700 rounded-md"
                >
                  <RiP2PFill /> P2P
                </Link>
              </div>
              <button
                onClick={signOut}
                href="dashboard"
                className="text-xl hover:bg-neutral-300 text-black gap-2 flex justify-center items-center p-2 bg-white rounded-md"
              >
                <IoIosLogOut /> Log Out
              </button>
              <div className="h-10 flex gap-2 items-center p-2 mb-10">
                <div className="w-1/3 ">
                  <img
                    src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=029"
                    alt="pf"
                  />
                </div>
                <div className="w-full h-full flex flex-col">
                  <div className="flex items-center font-bold text-xs w-full h-2/3 md:text-base">
                    Mohammed Umer
                  </div>
                  <div className=" w-full h-1/3">Basic plan</div>
                </div>
              </div>
            </div>
            {/* <div className=" opacity-20 h-full w-[1px] min-h-full relative">
              <div
                className="absolute left-1/2 transform translate-y-[80px] rounded-3xl translate-x-1/2 top-0 bottom-0 bg-slate-100 w-px"
                style={{ height: "90%" }}
              ></div>
            </div> */}
            <div className="w-full  overflow-y-auto ml-1/12 min-h-full">
              {children}
            </div>
          </section>
        </DotBackground>
      </section>
    </>
  );
}
