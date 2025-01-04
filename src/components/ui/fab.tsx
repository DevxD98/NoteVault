import { Plus, FileText, PenLine } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "./modal";

interface FABProps {
  onAddNote: () => void;
  onAddFile: () => void;
  userId: string;
  QuickNoteComponent: React.ComponentType<{ userId: string; onNoteCreated: () => void }>;
  FileUploadComponent: React.ComponentType<{ userId: string; onFileUploaded: () => void }>;
}

export function FAB({ 
  onAddNote, 
  onAddFile, 
  userId, 
  QuickNoteComponent,
  FileUploadComponent 
}: FABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col-reverse gap-2">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-2"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-full w-12 h-12"
                  onClick={() => {
                    setShowNoteModal(true);
                    setIsOpen(false);
                  }}
                >
                  <PenLine className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-full w-12 h-12"
                  onClick={() => {
                    setShowFileModal(true);
                    setIsOpen(false);
                  }}
                >
                  <FileText className="h-5 w-5" />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <Button
          variant="outline"
          size="icon"
          className="bg-purple-600 hover:bg-purple-500 text-white rounded-full w-12 h-12"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
        </Button>
      </div>

      <Modal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        title="Add New Note"
      >
        <div className="bg-gray-900/60">
          <QuickNoteComponent userId={userId} onNoteCreated={() => {
            onAddNote();
            setShowNoteModal(false);
          }} />
        </div>
      </Modal>

      <Modal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        title="Upload File"
      >
        <div className="bg-gray-900/60">
          <FileUploadComponent userId={userId} onFileUploaded={() => {
            onAddFile();
            setShowFileModal(false);
          }} />
        </div>
      </Modal>
    </>
  );
} 