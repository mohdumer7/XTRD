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
    <div className="h-24 items-center navbar pl-44 pr-44 w-full flex justify-between">
      <img src="/logo.svg" />
      <div className="flex gap-4 ">
        {status === "authenticated" ? (
          <>
            <button
              type="button"
              onClick={() => {
                toast.success("Setting up your account");
                router.push("/dashboard");
              }}
              className="nav-button"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success("Navigating you safely");
                handleLogout();
              }}
              className="nav-button"
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
            className="nav-button"
          >
            Join Us
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
