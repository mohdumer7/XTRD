"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userReducer";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DashboardPage from "../components/DashboardPage/DashboardPage";

export default function Dashboard() {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const [fetchingUser, setFetchingUser] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.replace("/");
  }

  const fetchUser = async () => {
    // console.log({ status, session, user });
    if (status === "authenticated" && session.user) {
      try {
        if (!user.email) {
          const { email } = session.user;
          const response = await fetch(
            `http://localhost:3000/api/user?email=${email}`
          );
          console.log(response);
          if (response.ok) {
            const { data: userData } = await response.json();
            dispatch(setUser(userData));
          } else {
            console.error("Failed to fetch user data:", response.statusText);
            toast.error("Something Went Wrong!,Please Relogin");
            router.replace("/");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Something Went Wrong!,Please Relogin");
        router.replace("/");
      }
    }
  };

  if (!user.email && fetchingUser && status === "authenticated") {
    console.log({ user });
    fetchUser();
    setFetchingUser(false);
  } else if (user.email && loading) {
    setLoading(false);
  }

  console.log({ user, fetchingUser, status, loading });
  return (
    <div className="w-full h-full flex justify-center items-center bg-[#121212]">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <DashboardPage userData={user} />
        </>
      )}
    </div>
  );
  // return <>{loading ? <div className="spinner"></div> : <>{user.email}</>}</>;
}
