import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, LockKeyhole } from 'lucide-react';

interface SignUpFormInputsProps {
  email: string;
  password: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

export function SignUpFormInputs({
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange
}: SignUpFormInputsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-200">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-200">Password</Label>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            disabled={isLoading}
            required
            minLength={8}
          />
        </div>
        <p className="text-xs text-gray-400">
          Password must be at least 8 characters long
        </p>
      </div>
    </>
  );
}