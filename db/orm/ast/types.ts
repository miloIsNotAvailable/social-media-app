export type User = {
	id: string,
	createdAt: string,
	email: string,
	name?: string,
	posts: Post[],
	communities: UsersCommunitiesBridge[],
	liked: Like[]
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
	communityId?: string,
	communities: UsersCommunitiesBridge[],
	likes: Like[]
}

export type Like = {
	id: string,
	post?: Post,
	postId?: string,
	user?: User,
	userId?: string
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
	posts?: Post,
	user_id: string,
	community_id: string,
	post_id?: string
}