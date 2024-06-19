"use client";

import { redirect, useRouter } from "next/navigation";
import DashboardPage from "../components/DashboardPage/DashboardPage";
import PhoneModal from "../components/ui/PhoneModal";
import useUserSession from "../hooks/useUserSession";

export default function Dashboard() {
  const {
    status,
    user,
    loading,
    isModalOpen,
    setIsModalOpen,
    initialStep,
    handlePhoneSubmit,
    handleOTPSubmit,
    handleConsentSubmit,
  } = useUserSession();

  const router = useRouter();
  if (status === "unauthenticated") {
    router.replace("/");
  }

  return (
    <div className="w-full flex h-full justify-center items-center bg-[#121212]">
      {loading ? (
        <div className="spinner"></div>
      ) : ( isModalOpen? <PhoneModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onPhoneSubmit={handlePhoneSubmit}
        onOTPSubmit={handleOTPSubmit}
        onConsentSubmit={handleConsentSubmit}
        initialStep={initialStep}
      />:
        (<>
          <DashboardPage userData={user} />
        </>)
      )}
      
    </div>
  );
}
