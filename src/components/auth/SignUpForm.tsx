import { useState } from 'react';
import { SignUpFormInputs } from './SignUpFormInputs';
import { OtpVerification } from './OtpVerification';
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthService } from '@/lib/services/auth.service';
import { useToast } from '@/hooks/use-toast';
import { useSignUpForm } from '@/hooks/useSignUpForm';

export function SignUpForm() {
  const { toast } = useToast();
  const {
    email,
    password,
    otp,
    isLoading,
    showOtpInput,
    handleEmailChange,
    handlePasswordChange,
    handleOtpChange,
    resetForm
  } = useSignUpForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      if (!showOtpInput) {
        const { error } = await AuthService.signUp(email, password);
        if (error?.message.includes('already registered')) {
          toast({
            title: "Account Exists",
            description: "This email is already registered. Please try logging in.",
            variant: "destructive"
          });
          resetForm();
          return;
        }
        
        toast({
          title: "Check your email",
          description: "We've sent you a verification code.",
        });
      } else {
        await AuthService.verifyOtp(email, otp);
        toast({
          title: "Success",
          description: "Your account has been verified. You can now log in.",
        });
        resetForm();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to process request. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {!showOtpInput ? (
          <SignUpFormInputs
            email={email}
            password={password}
            isLoading={isLoading}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
          />
        ) : (
          <OtpVerification
            email={email}
            otp={otp}
            isLoading={isLoading}
            onOtpChange={handleOtpChange}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-500 text-white"
          disabled={isLoading}
        >
          {isLoading 
            ? (showOtpInput ? 'Verifying...' : 'Creating account...') 
            : (showOtpInput ? 'Verify Email' : 'Create account')}
        </Button>
      </CardFooter>
    </form>
  );
}