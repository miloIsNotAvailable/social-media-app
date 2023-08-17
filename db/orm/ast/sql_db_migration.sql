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
	constraint community_community_fkey foreign key(community_id) references "community"(id) on update cascade on delete restrict,
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint userscommunitiesbridge_id_as_pkey primary key(id),
	constraint community_community_fkey foreign key(community_id) references "community"(id) on update cascade on delete restrict,
	constraint community_community_fkey foreign key(community_id) references "community"(id) on update cascade on delete restrict,
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict
);

create table if not exists public.like (
	id text not null default uuid_v4s(),
	postid text null,
	userid text null,
	constraint like_id_as_pkey primary key(id),
	constraint post_post_fkey foreign key(postid) references "post"(id) on update cascade on delete restrict,
	constraint post_post_fkey foreign key(postid) references "post"(id) on update cascade on delete restrict,
	constraint user_user_fkey foreign key(userid) references "user"(id) on update cascade on delete restrict,
	constraint user_user_fkey foreign key(userid) references "user"(id) on update cascade on delete restrict,
	constraint post_post_fkey foreign key(post_id) references "post"(id) on update cascade on delete restrict,
	constraint post_post_fkey foreign key(post_id) references "post"(id) on update cascade on delete restrict,
	constraint user_user_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint user_user_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict
);

create table if not exists public.comment (
	id text not null default uuid_v4s(),
	post_id text not null,
	comment_id text not null,
	constraint post_post_fkey foreign key(postid) references "post"(id) on update cascade on delete restrict,
	constraint post_post_fkey foreign key(postid) references "post"(id) on update cascade on delete restrict,
	constraint comment_id_as_pkey primary key(id),
	constraint post_post_fkey foreign key(post_id) references "post"(id) on update cascade on delete restrict,
	constraint post_post_fkey foreign key(post_id) references "post"(id) on update cascade on delete restrict
);

create table if not exists public.post (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	updatedat timestamp with time zone not null default now(),
	title text not null,
	authorid text null,
	content text null,
	communityid text null,
	flairs text null,
	constraint post_id_as_pkey primary key(id),
	constraint user_author_fkey foreign key(authorid) references "user"(id) on update cascade on delete restrict,
	constraint user_author_fkey foreign key(authorid) references "user"(id) on update cascade on delete restrict,
	constraint user_author_fkey foreign key(author_id) references "user"(id) on update cascade on delete restrict,
	constraint user_author_fkey foreign key(author_id) references "user"(id) on update cascade on delete restrict
);

create table if not exists public.flairs (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	updatedat timestamp with time zone not null default now(),
	flair_name text not null,
	type text not null,
	constraint flairs_id_as_pkey primary key(id)
);

create table if not exists public.postflairassignments (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	updatedat timestamp with time zone not null default now(),
	flair_id text null,
	post_id text null,
	constraint flairs_flair_fkey foreign key(flair_id) references "flairs"(id) on update cascade on delete restrict,
	constraint postflairassignments_id_as_pkey primary key(id),
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict
);

create table if not exists public.likes (
	id text not null default uuid_v4s(),
	post_id text null,
	user_id text null,
	constraint user_user_fkey foreign key(userid) references "user"(id) on update cascade on delete restrict,
	constraint user_user_fkey foreign key(userid) references "user"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint likes_id_as_pkey primary key(id),
	constraint likes_post_id_as_uniq primary key(post_id),
	constraint likes_user_id_as_uniq primary key(user_id),
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint user_user_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint user_user_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict
);

create table if not exists public.postcontent (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	updatedat timestamp with time zone not null default now(),
	content text null,
	title text not null,
	post_id text null,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint postcontent_id_as_pkey primary key(id),
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict,
	constraint posts_post_fkey foreign key(post_id) references "posts"(id) on update cascade on delete restrict
);

create table if not exists public.posts (
	id text not null default uuid_v4s(),
	comment boolean not null default false,
	type text not null,
	post_flair_id text null,
	author_id text null,
	community_id text null,
	communities_id text null,
	constraint community_community_fkey foreign key(community_id) references "community"(id) on update cascade on delete restrict,
	constraint community_community_fkey foreign key(community_id) references "community"(id) on update cascade on delete restrict,
	constraint user_author_fkey foreign key(authorid) references "user"(id) on update cascade on delete restrict,
	constraint user_author_fkey foreign key(authorid) references "user"(id) on update cascade on delete restrict,
	constraint community_community_fkey foreign key(community_id) references "community"(id) on update cascade on delete restrict,
	constraint community_community_fkey foreign key(community_id) references "community"(id) on update cascade on delete restrict,
	constraint posts_id_as_pkey primary key(id),
	constraint user_author_fkey foreign key(author_id) references "user"(id) on update cascade on delete restrict,
	constraint user_author_fkey foreign key(author_id) references "user"(id) on update cascade on delete restrict
);

create table if not exists public.communities (
	id text not null default uuid_v4s(),
	createdat timestamp with time zone not null default now(),
	community_name text not null,
	description text not null,
	constraint communities_id_as_pkey primary key(id)
);

create table if not exists public.communityusers (
	id text not null default uuid_v4s(),
	user_id text not null,
	community_id text not null,
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint communities_community_fkey foreign key(community_id) references "communities"(id) on update cascade on delete restrict,
	constraint communityusers_id_as_pkey primary key(id),
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict,
	constraint user_users_fkey foreign key(user_id) references "user"(id) on update cascade on delete restrict
);