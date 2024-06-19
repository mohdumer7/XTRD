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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialStep, setInitialStep] = useState(1);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session.user) {
        try {
          if (!user.email) {
            const { email } = session.user;
            const response = await fetch(`${apiUrl}/api/user?email=${email}`);
            console.log(response);
            if (response.ok) {
              const { data: userData } = await response.json();
              dispatch(setUser(userData));
              if (!userData.phoneNumber || userData.phoneNumber === "NULL") {
                setIsModalOpen(true);
              } else if (userData.phoneNumberAuthenticated && !userData.didConsent) {
                setIsModalOpen(true);
                setInitialStep(3); // Skip to terms and conditions if phoneNumberAuthenticated is true
              }else{
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
        setInitialStep(3); // Proceed to terms and conditions
        // setFetchingUser(true); // Trigger refetch of user data
      } else {
        toast.error("Invalid OTP!");
      }
    } catch (error) {
      console.error("Error submitting OTP:", error);
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
      if(response.status === 200){
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
    handleConsentSubmit,
  };
};

export default useUserSession;
