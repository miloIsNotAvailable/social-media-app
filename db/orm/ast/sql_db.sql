create table if not exists User(
id text primary key,
createdAt timestamp with time zone default CURRENT_TIMESTAMP,
email text unique,
name text,

);

create table if not exists Post(
id text primary key,
createdAt timestamp with time zone default CURRENT_TIMESTAMP,
updatedAt timestamp with time zone CURRENT_TIMESTAMP,
published bool default false,
title text,
constraint foreign key(authorId) references User(id) on update cascade on delete restrict,
authorId text
);