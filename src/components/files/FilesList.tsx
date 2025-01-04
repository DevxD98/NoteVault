import { useState, useEffect } from 'react';
import { File, Image, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface File {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface FilesListProps {
  userId: string;
}

export function FilesList({ userId }: FilesListProps) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchFiles();
  }, [userId]);

  const fetchFiles = async () => {
    // Your existing fetch logic here
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-5 w-5" />;
    if (type.includes('pdf')) return <FileText className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  const handleFileOpen = (file: File) => {
    if (file.type.startsWith('image/') || file.type.includes('pdf')) {
      window.open(file.url, '_blank');
    } else {
      // For other file types, trigger download
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            {getFileIcon(file.type)}
            <span className="text-sm text-gray-200">{file.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFileOpen(file)}
            className="text-gray-400 hover:text-white"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {files.length === 0 && (
        <p className="text-center text-gray-400">No files uploaded yet</p>
      )}
    </div>
  );
}