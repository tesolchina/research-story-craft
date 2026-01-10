-- Add new teacher credential
INSERT INTO public.teacher_credentials (email, password_hash)
VALUES ('simonwang@hkbu.edu.hk', crypt('simon1979', gen_salt('bf')));