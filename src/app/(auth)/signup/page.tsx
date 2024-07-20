"use client";

import React, { useState } from 'react';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [cooldown, setCooldown] = useState(false);

  const sendVerification = async (resend = false) => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    try {
      const res = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhoneNumber, resend }),
      });

      const contentType = res.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.message}`);
        return;
      }

      const data = await res.json();
      setMessage(data.message);
      if (res.status === 200) {
        setCooldown(true);
        setTimeout(() => setCooldown(false), 60000); // 1 minute cooldown
      }
    } catch (error: any) {
      setMessage(`Failed to send verification code: ${error.message}`);
    }
  };

  const verifyCode = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, phoneNumber: formattedPhoneNumber }),
      });

      const contentType = res.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.message}`);
        return;
      }

      const data = await res.json();
      setMessage(data.message);
    } catch (error: any) {
      setMessage(`Failed to verify code: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Phone Verification</h1>
      <div>
        <label>
          Phone Number
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="010-1234-5678"
          />
        </label>
        <button onClick={() => sendVerification()} disabled={cooldown}>Send Verification Code</button>
        {cooldown && <p>Please wait before resending the code.</p>}
      </div>
      <div>
        <label>
          Verification Code:
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <button onClick={verifyCode}>Verify Code</button>
      </div>
      <button onClick={() => sendVerification(true)} disabled={cooldown}>Resend Verification Code</button>
      {message && <p>{message}</p>}
    </div>
  );
}
