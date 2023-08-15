import { FC } from 'react'
import { styles } from '../styles'
import Text from './Text'
import { Post } from '../../../db/orm/ast/types'
import PostLayout from '../layouts/PostLayout'
import PostActionsNavbar from '../navbars/PostActionsNavbar'
import { Posts } from '../../../graphql/codegen/gql/gql'

interface PostsProps {
    posts: Posts[]
}

const Posts: FC<PostsProps> = ( { posts } ) => {

    return (
        <>
            { posts.map( e => (
                <div className={ styles.post }>
                    <PostLayout { ...e }/>
                    <PostActionsNavbar id={ e.post_id! }/>
                </div>
            ) ) }
        </>
    )
}

export default Posts