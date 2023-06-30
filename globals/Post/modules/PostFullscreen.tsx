import { FC } from 'react'
import { styles } from '../styles'
import PostLayout from '../layouts/PostLayout'
import FullScreenActionsNavbar from '../navbars/FullScreenActionsNavbar'

const FullScreenPost: FC = () => {

    // const {} = 

    return (
        <div className={ styles.post_fullscreen }>
            <PostLayout 
                content={ "hey" } 
                title={ "lorem-ispum" } 
                communityId={ "hello" }
            />
            <FullScreenActionsNavbar id={ "ye" }/>
        </div>
    )
}

export default FullScreenPost