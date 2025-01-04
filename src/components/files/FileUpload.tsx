import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ACCEPTED_FILE_TYPES = {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};

interface FileUploadProps {
  userId: string;
  onFileUploaded: () => void;
}

export function FileUpload({ userId, onFileUploaded }: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const fileType = file.type;
    const isAccepted = Object.entries(ACCEPTED_FILE_TYPES).some(([type, extensions]) => {
      return fileType.startsWith(type.split('/')[0]) && extensions.some(ext => 
        file.name.toLowerCase().endsWith(ext)
      );
    });

    if (!isAccepted) {
      toast({
        title: "Invalid file type",
        description: "Please upload only images, PDFs, or Word documents.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      // Your existing upload logic here
      // ...
      onFileUploaded();
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <div className="flex items-center justify-center w-full h-32 px-4 transition bg-gray-800/50 border-2 border-gray-700 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-500 focus:outline-none">
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-400">
              {loading ? 'Uploading...' : 'Drop files or click to upload'}
            </span>
            <span className="text-xs text-gray-500">
              (Images, PDFs, or Word documents)
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
      </label>
    </div>
  );
}