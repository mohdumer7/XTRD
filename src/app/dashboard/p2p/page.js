"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useRouter } from "next/navigation";

import DashboardPage from "../../components/DashboardPage/DashboardPage";

export default function P2p() {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  const router = useRouter();
  if (status === "unauthenticated") {
    router.replace("/dashboard");
  }
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
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
