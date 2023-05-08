CREATE TABLE IF NOT EXISTS public.User (id TEXT NOT NULL PRIMARY KEY, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), email TEXT NOT NULL UNIQUE, name TEXT NULL);
alter table public.User alter column name set NOT NULL;

CREATE TABLE IF NOT EXISTS public.Post (id INTEGER NOT NULL DEFAULT 0, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), published bool NOT NULL DEFAULT false, title TEXT NOT NULL, authorId TEXT NULL, CONSTRAINT id_Kp5L_as_pkey PRIMARY KEY (id), CONSTRAINT User_6XGL_fkey FOREIGN KEY (authorId) REFERENCES public.User(id) ON DELETE RESTRICT ON UPDATE CASCADE);
alter table public.User alter column id set default uuid_v4s();

alter table public.Post alter column published type bool using published::bool;
alter table public.User alter column name set NULL;


alter table public.Post alter column published type bool using published::bool;
alter table public.User alter column name set NULL;

