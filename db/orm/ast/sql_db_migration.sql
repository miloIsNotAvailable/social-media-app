create table if not exists public.user (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	email text not null,
	name text null,
	constraint user_email_as_uniq primary key(email),
	constraint user_id_as_pkey primary key(id)
);