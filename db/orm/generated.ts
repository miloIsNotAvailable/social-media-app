import Query from './Queries/Query'
import * as Types from '../orm/ast/types'

export class Generated {
	get user() { return new Query<Types.User>( 'User', { posts: 'Post', post: 'Posts', communities: 'UsersCommunitiesBridge', liked: 'Like', like: 'Likes' } ) }

get comment() { return new Query<Types.Comment>( 'Comment', { post: 'Post' } ) }

get post() { return new Query<Types.Post>( 'Post', { author: 'User', community: 'Community', communities: 'UsersCommunitiesBridge', likes: 'Like', comments: 'Comment' } ) }

get flairs() { return new Query<Types.Flairs>( 'Flairs', { flairs: 'PostFlairAssignments' } ) }

get postflairassignments() { return new Query<Types.PostFlairAssignments>( 'PostFlairAssignments', { flair: 'Flairs', post: 'Posts' } ) }

get postcontent() { return new Query<Types.PostContent>( 'PostContent', { post: 'Posts' } ) }

get posts() { return new Query<Types.Posts>( 'Posts', { post_flairs: 'PostFlairAssignments', likes: 'Likes', details: 'PostContent', author: 'User', community: 'Community' } ) }

get likes() { return new Query<Types.Likes>( 'Likes', { post: 'Posts', user: 'User' } ) }

get like() { return new Query<Types.Like>( 'Like', { post: 'Post', user: 'User' } ) }

get community() { return new Query<Types.Community>( 'Community', { communities: 'UsersCommunitiesBridge', posts: 'Post', post: 'Posts' } ) }

get userscommunitiesbridge() { return new Query<Types.UsersCommunitiesBridge>( 'UsersCommunitiesBridge', { users: 'User', community: 'Community', posts: 'Post' } ) }
}