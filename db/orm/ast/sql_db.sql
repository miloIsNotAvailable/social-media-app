create table if not exists public.User(
	id integer not null primary key,
	createdAt timestamp with time zone not null default now(),
	email text not null unique,
	name text null
);

create table if not exists public.Post(
	id integer not null primary key,
	createdAt timestamp with time zone not null default now(),
	updatedAt timestamp with time zone not null default now(),
	published bool not null default false,
	title text not null,
	constraint User_fkey foreign key(authorId) references public.User(id) on update cascade on delete restrict,
	authorId integer null
);CREATE TABLE IF NOT EXISTS public.User (id TEXT NOT NULL PRIMARY KEY, createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), email TEXT NOT NULL UNIQUE, name TEXT NULL);
