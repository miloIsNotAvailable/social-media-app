import { FC } from 'react'
import { styles } from '../styles'
import PostUserNavbar from '../navbars/PostUserNavbar'

const Text: FC = () => {

    return (
        <div className={ styles.post_wrap }>
            <PostUserNavbar/>
            <h1>lorem ipsum</h1>
            <span className={ styles.post_wrap_text }>
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
            </span>
        </div>
    )
}

export default Text