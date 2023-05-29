export type User = {
	id: string,
	createdAt: string,
	email: string,
	name?: string,
	posts: Post[],
	communities: UsersCommunitiesBridge[]
}

export type Post = {
	id: number,
	createdAt: string,
	updatedAt: string,
	published: boolean,
	title: string,
	author?: User,
	authorId?: string
}

export type Community = {
	id: string,
	createdAt: string,
	title: string,
	description: string,
	communities: UsersCommunitiesBridge[]
}

export type UsersCommunitiesBridge = {
	id: string,
	users?: User,
	community?: Community,
	user_id: string,
	community_id: string
}