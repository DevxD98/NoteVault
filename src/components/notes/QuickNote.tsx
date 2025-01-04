import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine } from 'lucide-react';
import { NotesService } from '@/lib/services/notes.service';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function QuickNote({ userId, onNoteCreated }: { userId: string; onNoteCreated: () => void }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await NotesService.createNote({
        user_id: userId,
        content: content.trim(),
        type: 'quick'
      });
      setContent('');
      onNoteCreated();
      toast({ title: "Note saved" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-900/60 border-gray-800 backdrop-blur-sm p-3 sm:p-4">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <PenLine className="h-4 sm:h-5 w-4 sm:w-5 text-purple-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white">Quick Note</h3>
          </div>
          <Textarea
            placeholder="Write a quick note..."
            className="min-h-[80px] sm:min-h-[100px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 text-sm sm:text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm sm:text-base"
            disabled={isLoading || !content.trim()}
          >
            {isLoading ? 'Saving...' : 'Save Note'}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}