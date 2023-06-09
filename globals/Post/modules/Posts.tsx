import { FC } from 'react'
import { styles } from '../styles'
import Text from './Text'
import { Post } from '../../../db/orm/ast/types'

interface PostsProps {
    posts: any[]
}

const Posts: FC<PostsProps> = ( { posts } ) => {

    return (
        <div className={ styles.wrap_posts }>
            { posts.map( e => (
                <Text { ...e }/>
            ) ) }
        </div>
    )
}

export default Posts