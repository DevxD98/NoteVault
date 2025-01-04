/*
  # Create notes and files tables

  1. New Tables
    - `notes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `type` (text)
      - `created_at` (timestamptz)
    - `files`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `size` (bigint)
      - `type` (text)
      - `path` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create notes table
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('quick', 'study')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create files table
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  size BIGINT NOT NULL,
  type TEXT NOT NULL,
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Create policies for notes
CREATE POLICY "Users can manage their own notes"
  ON public.notes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for files
CREATE POLICY "Users can manage their own files"
  ON public.files
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for files
INSERT INTO storage.buckets (id, name)
VALUES ('study-files', 'study-files')
ON CONFLICT DO NOTHING;

-- Enable storage policies
CREATE POLICY "Users can manage their own files in storage"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'study-files' AND auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (bucket_id = 'study-files' AND auth.uid()::text = (storage.foldername(name))[1]);