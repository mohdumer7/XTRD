"use client";

import { redirect, useRouter } from "next/navigation";

import useUserSession from "@/app/hooks/useUserSession";
import P2pPage from "@/app/components/P2pPage/p2pPage";
import PhoneModal from "@/app/components/ui/PhoneModal";

export default function P2p() {
  const {
    status,
    user,
    loading,
    isModalOpen,
    setIsModalOpen,
    handlePhoneSubmit,
    handleOTPSubmit,
    handleConsentSubmit,
    initialStep,
    handleSendVerificationEmail,
    checkEmailVerification,
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
        handleSendVerificationEmail = {handleSendVerificationEmail}
        checkEmailVerification = {checkEmailVerification}
      />:
        (<>
          <P2pPage userData={user} />
        </>)
      )}
      
    </div>
  );
}

