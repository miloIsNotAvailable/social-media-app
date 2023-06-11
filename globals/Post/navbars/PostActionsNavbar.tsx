import { Loading } from "@globals/Fallback";
import { FC, Suspense, lazy } from "react";
import { styles } from "../styles";
const Like = lazy( () => import( "../buttons/Like" ) )
const Comment = lazy( () => import( "../buttons/Comment" ) )
const Share = lazy( () => import( "../buttons/share" ) )

const PostActionsNavbar: FC = () => {

    return (
        <nav className={ styles.post_actions_nav_wrap }>
            <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                <Share/>
            </Suspense>
            <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                <Comment/>
            </Suspense>
            <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                <Like/>
            </Suspense>
        </nav>
    )
}

export default PostActionsNavbar