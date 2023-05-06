create table if not exists public.user (
	id text not null,
	createdat timestamp with time zone not null default now(),
	email text not null,
	name text null,
	constraint user_email_key primary key(email),
	constraint user_pkey primary key(id)
);