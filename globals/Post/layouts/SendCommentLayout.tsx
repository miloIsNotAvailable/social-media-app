import { FC } from 'react'
import SendComment from '../buttons/SendComment'
import CommentInput from '../inputs/CommentInput'
import { styles } from '../styles'

const SendCommentLayout: FC = () => {

    return (
        <div className={ styles.wrap_send_comment }>
            <SendComment/>
            <CommentInput/>
        </div>
    )
}

export default SendCommentLayout