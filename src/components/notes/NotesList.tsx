import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotesService } from '@/lib/services/notes.service';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Trash2 } from 'lucide-react';
import type { Note } from '@/types/notes';

export function NotesList({ userId }: { userId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotes = async () => {
    try {
      const data = await NotesService.getNotes(userId);
      setNotes(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notes",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [userId]);

  const handleDelete = async (id: string) => {
    try {
      await NotesService.deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
      toast({ title: "Note deleted" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-400">Loading notes...</div>;
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-4"
          >
            <Card className="bg-gray-900/60 border-gray-800 backdrop-blur-sm p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-white whitespace-pre-wrap">{note.content}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </ScrollArea>
  );
}