import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Countdown from "react-countdown";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
    height: "auto",
    maxHeight: "90vh", // Added this line to handle overflow
    padding: "2rem",
    borderRadius: "8px",
    overflowY: "auto", // Added this line to handle overflow
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "1000",
  },
};

const PhoneModal = ({ isOpen, onRequestClose, onPhoneSubmit, onOTPSubmit, onConsentSubmit, initialStep }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(initialStep);
  const [timerKey, setTimerKey] = useState(0); // Key to reset the timer
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const handlePhoneSubmit = async () => {
    try {
      await onPhoneSubmit(phoneNumber);
      setStep(2);
      setIsResendEnabled(false);
      setTimerKey((prevKey) => prevKey + 1); // Reset timer
    } catch (error) {
      console.error("Error submitting phone number:", error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await onOTPSubmit(otp, phoneNumber);
      setStep(3);
    } catch (error) {
      console.error("Error submitting OTP:", error);
    }
  };

  const handleResendOTP = async () => {
    try {
      await onPhoneSubmit(phoneNumber);
      setIsResendEnabled(false);
      setTimerKey((prevKey) => prevKey + 1); // Reset timer
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleTimerComplete = () => {
    setIsResendEnabled(true);
  };

  const handleConsentChange = (e) => {
    setIsConsentChecked(e.target.checked);
  };

  const handleConsentSubmit = async () => {
    try {
      await onConsentSubmit();
      onRequestClose();
    } catch (error) {
      console.error("Error submitting consent:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Phone Verification"
      ariaHideApp={false} // Add this line to avoid accessibility issues if this is the only modal in your app
    >
      {step === 1 && (
        <div>
          <h2>Enter Your Phone Number</h2>
          <PhoneInput
            country={"in"}
            value={phoneNumber}
            onChange={setPhoneNumber}

          />
          <button onClick={handlePhoneSubmit}>Continue</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Enter OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
          <button onClick={handleOTPSubmit}>Confirm</button>
          <button onClick={() => setStep(1)}>Edit Phone Number</button>
          <div>
            {isResendEnabled ? (
              <button onClick={handleResendOTP}>Resend OTP</button>
            ) : (
              <Countdown
                key={timerKey}
                date={Date.now() + 30000} // 30 seconds
                renderer={({ seconds }) => <span>Resend OTP in {seconds}s</span>}
                onComplete={handleTimerComplete}
              />
            )}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="text-black">
          <h2>Terms and Conditions</h2>
          <div className="terms-content" style={{ maxHeight: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <p>Terms and conditions content goes here...</p>
            <p>...More content...</p>
            <p>...More content...</p>
            <p>...More content...</p>
            <p>...More content...</p>
          </div>
          <div>
            <label>
              <input type="checkbox" checked={isConsentChecked} onChange={handleConsentChange} />
              I agree to the terms and conditions
            </label>
          </div>
          <button onClick={handleConsentSubmit} disabled={!isConsentChecked}>
            Continue
          </button>
        </div>
      )}
    </Modal>
  );
};

export default PhoneModal;
