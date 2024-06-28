// src/app/verify-email/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verifying your email...');
  const [isSuccess, setIsSuccess] = useState(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    console.log('Component mounted with token:', token);

    const verifyEmail = async () => {
      if (!token) {
        setMessage('Invalid verification link');
        setIsSuccess(false);
        return;
      }

      try {
        const response = await fetch(`/api/verify-email?token=${token}`);
        const data = await response.json();
        console.log('Verification response:', data);

        if (response.ok) {
          setMessage(data.message);
          setIsSuccess(true);
        } else {
          setMessage(data.message || 'Error verifying email');
          setIsSuccess(false);
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setMessage('Error verifying email');
        setIsSuccess(false);
      }
    };

    verifyEmail();

    // Cleanup function if needed
    return () => {
      console.log('Component unmounted');
    };

  }, [token]); // Dependency array with `token`

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        {isSuccess === null ? (
          <p className="text-gray-700">{message}</p>
        ) : isSuccess ? (
          <div>
            <h1 className="text-2xl font-bold text-green-500">Email Verified Successfully!</h1>
            <p className="text-gray-700">{message}</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-red-500">Email Verification Failed</h1>
            <p className="text-gray-700">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
