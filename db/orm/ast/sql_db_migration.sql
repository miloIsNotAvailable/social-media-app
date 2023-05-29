create table if not exists public.user (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	email text not null,
	name text null,
	constraint user_email_as_uniq primary key(email),
	constraint user_id_as_pkey primary key(id)
);

create table if not exists public.post (
	id integer not null default 0,
	createdat timestamp with time zone not null default now(),
	updatedat timestamp with time zone not null default now(),
	published boolean not null default false,
	title text not null,
	authorid text null,
	constraint post_id_as_pkey primary key(id),
	constraint user_author_fkey foreign key(authorid) references "user"(id) on update cascade on delete restrict
);