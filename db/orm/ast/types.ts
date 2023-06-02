export type User = {
	id: string,
	createdAt: string,
	email: string,
	name?: string,
	posts: Post[],
	communities: UsersCommunitiesBridge[]
}

export type Post = {
	id: string,
	createdAt: string,
	updatedAt: string,
	content?: string,
	title: string,
	author?: User,
	authorId?: string,
	community?: Community,
	communityId?: string
}

export type Community = {
	id: string,
	createdAt: string,
	title: string,
	description: string,
	communities: UsersCommunitiesBridge[],
	posts: Post[]
}

export type UsersCommunitiesBridge = {
	id: string,
	users?: User,
	community?: Community,
	user_id: string,
	community_id: string
}