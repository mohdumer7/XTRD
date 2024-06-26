"use client";

import { redirect, useRouter } from "next/navigation";
import PhoneModal from "@/app/components/ui/PhoneModal";
import useUserSession from "@/app/hooks/useUserSession";
import UpgradePage from "../../components/UpgradePage/UpgradePage";

export default function Upgrade() {
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
          <UpgradePage userData={user} />
        </>)
      )}   
    </div>
  );
}