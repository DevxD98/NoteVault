import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "@/components/layout/Background";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, PenLine, FileText } from "lucide-react";
import { AuthService } from "@/lib/services/auth.service";
import { supabase } from "@/lib/supabase";
import { QuickNote } from "@/components/notes/QuickNote";
import { NotesList } from "@/components/notes/NotesList";
import { FileUpload } from "@/components/files/FileUpload";
import { FilesList } from "@/components/files/FilesList";
import { motion } from "framer-motion";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { FAB } from "@/components/ui/fab";
import { useToast } from "@/hooks/use-toast";

export function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("notes");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login', { replace: true });
        } else {
          setUserId(session.user.id);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        navigate('/login', { replace: true });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      console.log('Logout successful');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Background />
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: [1, 1.02, 1],
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="text-2xl sm:text-3xl font-bold text-white"
          >
            Dashboard
          </motion.h1>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white w-full sm:w-auto"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? (
              'Logging out...'
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
        >
          <Card className="bg-gray-900/60 border-gray-800 backdrop-blur-sm p-4 sm:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 mb-4 sm:mb-6">
                <TabsTrigger value="notes" className="data-[state=active]:bg-gray-700">
                  <PenLine className="h-4 w-4 mr-2 hidden sm:inline-block" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="files" className="data-[state=active]:bg-gray-700">
                  <FileText className="h-4 w-4 mr-2 hidden sm:inline-block" />
                  Files
                </TabsTrigger>
              </TabsList>
              <TabsContent value="notes" className="space-y-4 sm:space-y-6">
                <NotesList key={`notes-${refreshKey}`} userId={userId} />
              </TabsContent>
              <TabsContent value="files" className="space-y-4 sm:space-y-6">
                <FilesList key={`files-${refreshKey}`} userId={userId} />
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
      <FAB 
        onAddNote={handleRefresh}
        onAddFile={handleRefresh}
        userId={userId}
        QuickNoteComponent={QuickNote}
        FileUploadComponent={FileUpload}
      />
    </div>
  );
}