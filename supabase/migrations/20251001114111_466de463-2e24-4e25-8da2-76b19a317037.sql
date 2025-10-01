-- Add RLS policy for updating tasks
CREATE POLICY "Allow public update access to tasks"
ON public.task
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Add RLS policy for deleting tasks
CREATE POLICY "Allow public delete access to tasks"
ON public.task
FOR DELETE
TO public
USING (true);