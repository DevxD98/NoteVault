import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Background } from "@/components/layout/Background";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

export function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Background />
      <Card className="w-full max-w-md mx-4 bg-gray-900/60 border-gray-800 backdrop-blur-sm">
        <LoginHeader />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
            <TabsTrigger value="login" className="data-[state=active]:bg-gray-700">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-gray-700">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onLoadingChange={setIsLoading} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}