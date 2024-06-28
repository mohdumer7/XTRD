import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userReducer";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useUserSession = () => {
  const apiUrl =
    process.env.currentEnv === "LOCAL" ? process.env.LOCAL : process.env.PROD;
  const { status, data: session } = useSession();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [initialStep, setInitialStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session.user) {
        try {
          if (!user.email) {
            const { email } = session.user;
            const response = await fetch(`${apiUrl}/api/user?email=${email}`);
            if (response.ok) {
              const { data: userData } = await response.json();
              dispatch(setUser(userData));
              if (!userData.phoneNumber || userData.phoneNumber === "NULL" || !userData.phoneNumberAuthenticated) {
                setIsModalOpen(true);
              } else if (userData.phoneNumberAuthenticated && !userData.emailVerified) {
                setIsModalOpen(true);
                console.log({userData})
                if(!userData.emailVerified){
                  await handleSendVerificationEmail(userData.email)
                }
                setInitialStep(3); 
              } else if (userData.emailVerified) {
                if(!userData.didConsent){
                  setIsModalOpen(true);
                  setInitialStep(4); // Show email verification step
                }
              } else {
                setIsModalOpen(false);
              }
              setLoading(false);
            } else {
              console.error("Failed to fetch user data:", response.statusText);
              toast.error("Something Went Wrong!, Please Relogin");
              router.replace("/");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Something Went Wrong!, Please Relogin");
          router.replace("/");
        }
      }
    };

    if (!user.email && fetchingUser && status === "authenticated") {
      fetchUser();
      setFetchingUser(false);
    } else if (user.email && loading) {
      setLoading(false);
    }
  }, [session, status, user.email, fetchingUser, apiUrl, dispatch, router]);

  const handlePhoneSubmit = async (phoneNumber) => {
    try {
      await fetch(`${apiUrl}/api/phone`, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          phoneNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error submitting phone number:", error);
      throw error;
    }
  };

  const handleOTPSubmit = async (otp, phoneNumber) => {
    try {
      const verifyOtp = await fetch(`${apiUrl}/api/verify-otp`, {
        method: "POST",
        body: JSON.stringify({ email: user.email, otp, phoneNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (verifyOtp.status === 200) {
        toast.success("Phone Number Updated!");

          await handleSendVerificationEmail()
          setInitialStep(3); 

      } else {
        toast.error("Invalid OTP!");
      }
    } catch (error) {
      console.error("Error submitting OTP:", error);
      throw error;
    }
  };

  const handleSendVerificationEmail = async (email="") => {
    try {
      const response = await fetch(`${apiUrl}/api/send-verification-email`, {
        method: "POST",
        body: JSON.stringify({ email: user.email?? email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Verification email sent!");

      } else {
        const data = await response.json();
        toast.error(data.message || "Error sending verification email");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  };

  const checkEmailVerification = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/check-verification-email`, {
        method: "POST",
        body: JSON.stringify({ email: user.email}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("email-ver",response)
      const data = await response.json();
      if (response.ok) {

          setInitialStep(4); // Proceed to terms and conditions
          toast.success("Email verified successfully!");
      } else {
        toast.error(data.message || "Error checking email verification");
      }
    } catch (error) {
      console.error("Error checking email verification:", error);
      throw error;
    }
  };

  const handleConsentSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/consent`, {
        method: "POST",
        body: JSON.stringify({ email: user.email, didConsent: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setFetchingUser(true);
      }
    } catch (error) {
      console.error("Error submitting consent:", error);
      throw error;
    }
  };

  return {
    status,
    user,
    loading,
    isModalOpen,
    setIsModalOpen,
    initialStep,
    handlePhoneSubmit,
    handleOTPSubmit,
    handleSendVerificationEmail,
    checkEmailVerification,
    handleConsentSubmit,
  };
};

export default useUserSession;
