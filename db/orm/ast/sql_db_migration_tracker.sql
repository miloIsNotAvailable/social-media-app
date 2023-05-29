CREATE TABLE IF NOT EXISTS public.User (id TEXT NOT NULL PRIMARY KEY, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), email TEXT NOT NULL UNIQUE, name TEXT NULL);
alter table public.User alter column name set NOT NULL;

CREATE TABLE IF NOT EXISTS public.Post (id INTEGER NOT NULL DEFAULT 0, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), published bool NOT NULL DEFAULT false, title TEXT NOT NULL, authorId TEXT NULL, CONSTRAINT id_Kp5L_as_pkey PRIMARY KEY (id), CONSTRAINT User_6XGL_fkey FOREIGN KEY (authorId) REFERENCES public.User(id) ON DELETE RESTRICT ON UPDATE CASCADE);
alter table public.User alter column id set default uuid_v4s();

alter table public.Post alter column published type bool using published::bool;
alter table public.User alter column name set NULL;


drop table public.post;
drop table public.user;


CREATE TABLE IF NOT EXISTS public.Post (id INTEGER NOT NULL DEFAULT 0, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), published bool NOT NULL DEFAULT false, title TEXT NOT NULL, authorId TEXT NULL, CONSTRAINT Post_id_as_pkey PRIMARY KEY (Post), CONSTRAINT User_author_fkey FOREIGN KEY (authorId) REFERENCES public.User(id) ON DELETE RESTRICT ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS public.User (id TEXT NOT NULL DEFAULT uuid_v4s(), createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), email TEXT NOT NULL, name TEXT NULL, CONSTRAINT User_id_as_pkey PRIMARY KEY (User), CONSTRAINT User_email_as_uniq UNIQUE (User));

drop table public.user;
drop table public.post;
alter table public.Post alter column published type bool using published::bool;

drop table public.post;

CREATE TABLE IF NOT EXISTS public.User (id TEXT NOT NULL DEFAULT uuid_v4s(), createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), email TEXT NOT NULL, name TEXT NULL, CONSTRAINT User_id_as_pkey PRIMARY KEY (id), CONSTRAINT User_email_as_uniq UNIQUE (email));
CREATE TABLE IF NOT EXISTS public.Post (id INTEGER NOT NULL DEFAULT 0, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), published bool NOT NULL DEFAULT false, title TEXT NOT NULL, authorId TEXT NULL, CONSTRAINT Post_id_as_pkey PRIMARY KEY (id), CONSTRAINT User_author_fkey FOREIGN KEY (authorId) REFERENCES public.User(id) ON DELETE RESTRICT ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS public.User (id TEXT NOT NULL DEFAULT uuid_v4s(), createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), email TEXT NOT NULL, name TEXT NULL, CONSTRAINT User_id_as_pkey PRIMARY KEY (id), CONSTRAINT User_email_as_uniq UNIQUE (email));
CREATE TABLE IF NOT EXISTS public.Post (id INTEGER NOT NULL DEFAULT 0, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), published bool NOT NULL DEFAULT false, title TEXT NOT NULL, authorId TEXT NULL, CONSTRAINT Post_id_as_pkey PRIMARY KEY (id), CONSTRAINT User_author_fkey FOREIGN KEY (authorId) REFERENCES public.User(id) ON DELETE RESTRICT ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS public.User (id TEXT NOT NULL DEFAULT uuid_v4s(), createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), email TEXT NOT NULL, name TEXT NULL, CONSTRAINT User_id_as_pkey PRIMARY KEY (id), CONSTRAINT User_email_as_uniq UNIQUE (email));
CREATE TABLE IF NOT EXISTS public.Post (id INTEGER NOT NULL DEFAULT 0, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), published bool NOT NULL DEFAULT false, title TEXT NOT NULL, authorId TEXT NULL, CONSTRAINT Post_id_as_pkey PRIMARY KEY (id), CONSTRAINT User_author_fkey FOREIGN KEY (authorId) REFERENCES public.User(id) ON DELETE RESTRICT ON UPDATE CASCADE);


alter table public.Post alter column published type bool using published::bool;


alter table public.Post alter column published type bool using published::bool;


;


alter table public.Post alter column authorId set NOT NULL;


alter table public.Post alter column authorId set NULL;


drop table public.post;


CREATE TABLE IF NOT EXISTS public.Post (id INTEGER NOT NULL DEFAULT 0, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), published BOOLEAN NOT NULL DEFAULT false, title TEXT NOT NULL, authorId TEXT NULL, CONSTRAINT Post_id_as_pkey PRIMARY KEY (id), CONSTRAINT User_author_fkey FOREIGN KEY (authorId) REFERENCES public.User(id) ON DELETE CASCADE ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS public.Community (id TEXT NOT NULL DEFAULT uuid_v4s(), createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), title TEXT NOT NULL, CONSTRAINT Community_id_as_pkey PRIMARY KEY (id), CONSTRAINT Community_title_as_uniq UNIQUE (title), CONSTRAINT User_users_fkey FOREIGN KEY (id) REFERENCES public.User(id) ON DELETE CASCADE ON UPDATE CASCADE);


drop table public.community;


CREATE TABLE IF NOT EXISTS public.Community (id TEXT NOT NULL DEFAULT uuid_v4s(), createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), title TEXT NOT NULL, user_id TEXT NOT NULL, CONSTRAINT Community_id_as_pkey PRIMARY KEY (id), CONSTRAINT Community_title_as_uniq UNIQUE (title), CONSTRAINT User_users_fkey FOREIGN KEY (user_id) REFERENCES public.User(id) ON DELETE CASCADE ON UPDATE CASCADE);


drop table public.community;


CREATE TABLE IF NOT EXISTS public.Community (id TEXT NOT NULL DEFAULT uuid_v4s(), createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), title TEXT NOT NULL, description TEXT NOT NULL, CONSTRAINT Community_id_as_pkey PRIMARY KEY (id), CONSTRAINT Community_title_as_uniq UNIQUE (title));
CREATE TABLE IF NOT EXISTS public.UsersCommunitiesBridge (id TEXT NOT NULL DEFAULT uuid_v4s(), user_id TEXT NOT NULL, community_id TEXT NOT NULL, CONSTRAINT UsersCommunitiesBridge_id_as_pkey PRIMARY KEY (id), CONSTRAINT User_users_fkey FOREIGN KEY (user_id) REFERENCES public.User(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT Community_community_fkey FOREIGN KEY (community_id) REFERENCES public.Community(id) ON DELETE CASCADE ON UPDATE CASCADE);

