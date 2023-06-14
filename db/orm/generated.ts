import Query from './Queries/Query'
import * as Types from '../orm/ast/types'

export class Generated {
	get user() { return new Query<Types.User>( 'User', { posts: 'Post', communities: 'UsersCommunitiesBridge', liked: 'Like' } ) }

get post() { return new Query<Types.Post>( 'Post', { author: 'User', community: 'Community', communities: 'UsersCommunitiesBridge', likes: 'Like' } ) }

get like() { return new Query<Types.Like>( 'Like', { post: 'Post', user: 'User' } ) }

get community() { return new Query<Types.Community>( 'Community', { communities: 'UsersCommunitiesBridge', posts: 'Post' } ) }

get userscommunitiesbridge() { return new Query<Types.UsersCommunitiesBridge>( 'UsersCommunitiesBridge', { users: 'User', community: 'Community', posts: 'Post' } ) }
}