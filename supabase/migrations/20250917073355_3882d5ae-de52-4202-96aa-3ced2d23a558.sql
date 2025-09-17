-- Create tasks table
CREATE TABLE public.task (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Since this is a test project with no authorization, we'll make the table publicly readable
-- Enable Row Level Security
ALTER TABLE public.task ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for test purposes)
CREATE POLICY "Allow public read access to tasks" 
ON public.task 
FOR SELECT 
USING (true);

-- Create policy to allow public insert access (for test purposes)
CREATE POLICY "Allow public insert access to tasks" 
ON public.task 
FOR INSERT 
WITH CHECK (true);