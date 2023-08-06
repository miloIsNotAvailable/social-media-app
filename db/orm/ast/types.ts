export type User = {
	id: string,
	createdAt: string,
	email: string,
	name?: string,
	posts: Post[],
	post: Posts[],
	communities: UsersCommunitiesBridge[],
	liked: Like[],
	like: Likes[]
}

export type Comment = {
	id: string,
	post_id: string,
	comment_id: string,
	post?: Post
}

export type Post = {
	id: string,
	createdAt: string,
	updatedAt: string,
	content?: string,
	flairs?: string,
	title: string,
	author?: User,
	authorId?: string,
	community?: Community,
	communityId?: string,
	communities: UsersCommunitiesBridge[],
	likes: Like[],
	comments: Comment[]
}

export type Flairs = {
	id: string,
	createdAt: string,
	updatedAt: string,
	flair_name: string,
	type: string,
	flairs: PostFlairAssignments[]
}

export type PostFlairAssignments = {
	id: string,
	createdAt: string,
	updatedAt: string,
	flair?: Flairs,
	flair_id?: string,
	post?: Posts,
	post_id?: string
}

export type PostContent = {
	id: string,
	createdAt: string,
	updatedAt: string,
	content?: string,
	title: string,
	post?: Posts,
	post_id?: string
}

export type Posts = {
	id: string,
	comment: boolean,
	type: string,
	post_flairs: PostFlairAssignments[],
	post_flair_id?: string,
	likes: Likes[],
	details: PostContent[],
	author?: User,
	author_id?: string,
	community?: Community,
	community_id?: string
}

export type Likes = {
	id: string,
	post?: Posts,
	post_id?: string,
	user?: User,
	user_id?: string
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
	posts: Post[],
	post: Posts[]
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