import Profile from '@globals/Profile'
import { FC } from 'react'
import { styles } from '../styles'

interface CommentLayoutProps {
    comment: string
    user: string
}

const CommentLayout: FC<CommentLayoutProps> = ( { comment, user } ) => {

    return (
        <div className={ styles.comment_wrap }>
            <Profile/>
            <span>
                { comment }
            </span>
        </div>
    )
}

export default CommentLayout