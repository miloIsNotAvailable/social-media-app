export type User = {
	id: string,
	createdAt: string,
	email: string,
	name?: string,
	posts: Post[]
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