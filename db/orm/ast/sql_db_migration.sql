create table if not exists public.user (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	email text not null,
	name text null,
	constraint user_email_as_uniq primary key(email),
	constraint user_id_as_pkey primary key(id)
);

create table if not exists public.community (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	title text not null,
	description text not null,
	constraint community_id_as_pkey primary key(id),
	constraint community_title_as_uniq primary key(title)
);

create table if not exists public.userscommunitiesbridge (
	id text not null default uuid_v4s(),
	user_id text not null,
	community_id text not null,
	post_id text null,
	constraint community_community_fkey foreign key(community_id) references "community"(id) on update cascade on delete restrict,
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint userscommunitiesbridge_id_as_pkey primary key(id)
);

create table if not exists public.post (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	updatedat timestamp with time zone not null default now(),
	title text not null,
	authorid text null,
	content text null,
	communityid text null,
	constraint post_id_as_pkey primary key(id),
	constraint user_author_fkey foreign key(authorid) references "user"(id) on update cascade on delete restrict
);