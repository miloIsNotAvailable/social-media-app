import Query from './Queries/Query'
import * as Types from '../orm/ast/types'
export class Generated {
	get user() { return new Query<Types.User>( 'User' ) }

get post() { return new Query<Types.Post>( 'Post' ) }
}