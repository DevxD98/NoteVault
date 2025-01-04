import { supabase } from '@/lib/supabase';

export class FilesService {
  static async uploadFile(file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('study-files')
      .upload(fileName, file);

    if (error) throw error;

    const { data: fileRecord, error: recordError } = await supabase
      .from('files')
      .insert({
        user_id: userId,
        name: file.name,
        size: file.size,
        type: file.type,
        path: data.path
      })
      .select()
      .single();

    if (recordError) throw recordError;
    return fileRecord;
  }

  static async getFiles(userId: string) {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async deleteFile(id: string, path: string) {
    await supabase.storage.from('study-files').remove([path]);
    
    const { error } = await supabase
      .from('files')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}