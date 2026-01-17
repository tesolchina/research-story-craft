-- Enable pgcrypto for password hashing/verification (crypt, gen_salt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;