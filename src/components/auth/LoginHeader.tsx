import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LockKeyhole } from 'lucide-react';

export function LoginHeader() {
  return (
    <CardHeader className="space-y-1">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
          <LockKeyhole className="w-6 h-6 text-purple-400" />
        </div>
      </div>
      <CardTitle className="text-2xl text-center font-bold text-white">Welcome back</CardTitle>
      <CardDescription className="text-gray-400 text-center">
        Enter your credentials to access your account
      </CardDescription>
    </CardHeader>
  );
}