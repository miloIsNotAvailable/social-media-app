import { FC } from 'react'
import { styles } from '../styles'
import Text from './Text'
import { Post } from '../../../db/orm/ast/types'

interface PostsProps {
    posts: any[]
}

const Posts: FC<PostsProps> = ( { posts } ) => {

    return (
        <>
            { posts.map( e => (
                <Text { ...e }/>
            ) ) }
        </>
    )
}

export default Posts