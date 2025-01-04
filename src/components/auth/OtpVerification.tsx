import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { KeyRound, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCountdown } from '@/hooks/useCountdown';
import { AuthService } from '@/lib/services/auth.service';

interface OtpVerificationProps {
  email: string;
  otp: string;
  isLoading: boolean;
  onOtpChange: (value: string) => void;
}

export function OtpVerification({
  email,
  otp,
  isLoading,
  onOtpChange
}: OtpVerificationProps) {
  const { toast } = useToast();
  const { seconds, isActive, startTimer } = useCountdown(60);

  const handleResendOtp = async () => {
    if (isActive) return;
    
    try {
      await AuthService.resendOtp(email);
      startTimer();
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend code. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="otp" className="text-gray-200">Verification Code</Label>
      <div className="relative">
        <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          id="otp"
          type="text"
          placeholder="Enter verification code"
          className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
          value={otp}
          onChange={(e) => onOtpChange(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Enter the verification code sent to your email
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-purple-400 hover:text-purple-300"
          onClick={handleResendOtp}
          disabled={isActive || isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isActive ? 'animate-spin' : ''}`} />
          {isActive ? `Resend in ${seconds}s` : 'Resend Code'}
        </Button>
      </div>
    </div>
  );
}