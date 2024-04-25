"use client";

import { useRouter } from "next/navigation";
import React from "react";
const EndPage = () => {
  const router = useRouter();
  return (
    <section className="h-1/2 pl-44 pr-44 items-center flex flex-col mb-20 gap-20 ">
      <div className="left-side-3 con-3  flex flex-col justify-center gap-4">
        <p className="text-5xl text-white title-3 title-4 ">
          GET STARTED WITH X TRADE TODAY
        </p>
      </div>
      <div className="con-2 text-2xl flex flex-col w-[67%] justify-center items-center ">
        <button
          type="button"
          onClick={() => router.push("/auth")}
          className="sub-button-2 flex items-center  justify-between p-4 w-3/4 h-12"
        >
          <p>Click here to sign up</p>
          <div className="long-arrow-right"></div>
        </button>
      </div>
    </section>
  );
};

export default EndPage;
