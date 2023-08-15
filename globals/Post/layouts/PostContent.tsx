import { FC } from 'react'
import { PostContent } from '../../../graphql/codegen/gql/gql'
import { styles } from '../styles'
import Header from '@globals/Header'

const PostContent: FC<PostContent> = ( { content, title } ) => {

    return (
        <div className={ styles.post_content_wrap }>
            <Header children={ (title as string) }/>
            <span className={ styles.post_wrap_text }>
                { content }
            </span>
        </div>
    )
}

export default PostContent