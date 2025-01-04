import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LockKeyhole, Mail } from 'lucide-react';
import { SocialLogin } from './SocialLogin';
import { RememberMe } from './RememberMe';
import { AuthService } from '@/lib/services/auth.service';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLoadingChange: (loading: boolean) => void;
}

export function LoginForm({ onLoadingChange }: LoginFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      onLoadingChange(true);
      await AuthService.login(email, password);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
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
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
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
              placeholder="Enter your password"
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>
        <RememberMe />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-500 text-white"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        <SocialLogin />
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300">Sign up</a>
        </p>
      </CardFooter>
    </form>
  );
}