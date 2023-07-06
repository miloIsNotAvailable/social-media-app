import { FC } from 'react'
import SendComment from '../buttons/SendComment'
import CommentInput from '../inputs/CommentInput'
import { styles } from '../styles'
import CommentLayout from './CommentLayout'
import Posts from '../modules/Posts'
import { Post } from '../../../db/orm/ast/types'

const SendCommentLayout: FC = () => {

    const arr: Post[] = new Array( 10 ).fill( {
        id: "hello",
        content: "ye",
        title: "hello",
        communityId: "hello"
    } as Post )

    return (
        <div className={ styles.comments_wrap }>
            <div className={ styles.wrap_send_comment }>
                <CommentInput/>
                <SendComment/>
            </div>
            <div className={ styles.comments_wrap_responses }>
                <Posts posts={ arr }/>
            </div>
        </div>
    )
}

export default SendCommentLayout