create table if not exists public._prisma_migrations (
	id character varying(36) not null,
	checksum character varying(64) not null,
	finished_at timestamp with time zone null,
	migration_name character varying(255) not null,
	logs text null,
	rolled_back_at timestamp with time zone null,
	started_at timestamp with time zone not null default now(),
	applied_steps_count integer not null default 0,
	constraint _prisma_migrations_pkey key(id)
);

create table if not exists public.Users (
	id uuid not null default uuid_generate_v4(),
	username text not null,
	email text not null,
	password text not null,
	created_at timestamp with time zone null default CURRENT_TIMESTAMP,
	constraint Users_pkey key(id)
);

create table if not exists public.Item (
	id uuid not null default uuid_generate_v4(),
	title text not null,
	desc text null,
	img text not null,
	created_at timestamp with time zone null default CURRENT_TIMESTAMP,
	author_id uuid not null,
	category text not null,
	constraint Item_pkey key(id),
	constraint Item_author_id_fkey foreign key(author_id) references "Users"(id) on update cascade on delete restrict
);

create table if not exists public.Review (
	id uuid not null default uuid_generate_v4(),
	text text not null,
	author text not null,
	created_at timestamp with time zone null default CURRENT_TIMESTAMP,
	item_id uuid not null,
	constraint Review_pkey key(id),
	constraint Review_item_id_fkey foreign key(item_id) references "Item"(id) on update cascade on delete restrict
);