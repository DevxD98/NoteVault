import { useState } from 'react';

export function useSignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleEmailChange = (value: string) => setEmail(value);
  const handlePasswordChange = (value: string) => setPassword(value);
  const handleOtpChange = (value: string) => setOtp(value);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setOtp('');
    setShowOtpInput(false);
    setIsLoading(false);
  };

  return {
    email,
    password,
    otp,
    isLoading,
    showOtpInput,
    setIsLoading,
    setShowOtpInput,
    handleEmailChange,
    handlePasswordChange,
    handleOtpChange,
    resetForm
  };
}