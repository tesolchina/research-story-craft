-- Create students table to store ID-to-name mappings
CREATE TABLE public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_code text NOT NULL UNIQUE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read student names
CREATE POLICY "Anyone can view students" 
ON public.students 
FOR SELECT 
USING (true);

-- Insert the student data
INSERT INTO public.students (student_code, name) VALUES
  ('0758', 'John'),
  ('2661', 'Jacky'),
  ('2246', 'Yuki'),
  ('1657', 'Peter'),
  ('2440', 'Stuart'),
  ('1533', 'Lilian'),
  ('0197', 'Sean'),
  ('2254', 'Howard'),
  ('0766', 'Wayne'),
  ('1983', 'Kenny'),
  ('2211', 'Nancy'),
  ('0812', 'Richard'),
  ('0677', 'King'),
  ('0324', 'Gary'),
  ('2351', 'Johnathan'),
  ('2270', 'Bob'),
  ('0227', 'Thomas'),
  ('1568', 'Larry');