import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { setUser } from "../../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const { status } = useSession();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUser({}));
    signOut();
  };
  return (
    <div className="bg-black h-auto md:h-24 items-center navbar px-[1.5rem] pt-[1rem] md:px-[4rem] lg:px-44 w-full flex justify-between">
      <img src="/xtrd_logo.svg" className="w-[10%]" />
      <div className="flex gap-4 ">
        {status === "authenticated" ? (
          <>
            <button
              type="button"
              onClick={() => {
                toast.success("Setting up your account");
                router.push("/dashboard");
              }}
              className="w-auto h-[2.8rem] sm:w-[150px] sm:h-[60px] px-[8px] border-2 border-[#fed174] rounded-[8px] bg-[#030303] text-[#fed174] texxt-[20px] font-[harted] font-bold outline-0 transition-all duration-[0.5s]"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success("Navigating you safely");
                handleLogout();
              }}
              className="w-auto h-[2.8rem] sm:w-[150px] sm:h-[60px] px-[8px] border-2 border-[#fed174] rounded-[8px] bg-[#030303] text-[#fed174] texxt-[20px] font-[harted] font-bold outline-0 transition-all duration-[0.5s]"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              toast.success("Navigating you safely");
              router.push("/auth");
            }}
            className="w-auto h-[2.8rem] sm:w-[150px] sm:h-[60px] px-[8px] border-2 border-[#fed174] rounded-[8px] bg-[#030303] text-[#fed174] texxt-[20px] font-[harted] font-bold outline-0 transition-all duration-[0.5s]"
          >
            Join Us
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
