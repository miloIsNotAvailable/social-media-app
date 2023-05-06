CREATE TABLE IF NOT EXISTS public.User (id TEXT NOT NULL PRIMARY KEY, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), email TEXT NOT NULL UNIQUE, name TEXT NULL);
alter table public.User alter column name set NOT NULL;

