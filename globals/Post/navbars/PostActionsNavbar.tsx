import { Loading } from "@globals/Fallback";
import { FC, Suspense, lazy } from "react";
import { styles } from "../styles";
import { useUserLikedPostQuery } from "../../../graphql/codegen/gql/gql";
import { client } from "../../../router/graphqlClient";
const Like = lazy( () => import( "../buttons/Like" ) )
const Comment = lazy( () => import( "../buttons/Comment" ) )
const Share = lazy( () => import( "../buttons/share" ) )

interface PostActionsNavbarProps {
    id: string
}

const PostActionsNavbar: FC<PostActionsNavbarProps> = ( { id } ) => {

    const { data, isLoading } = useUserLikedPostQuery( client, { postId: id } )

    if( isLoading ) return (
        <nav className={ styles.post_actions_nav_wrap }>
            <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/>
            <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/>
            <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/>
        </nav>        
    )

    return (
        <nav className={ styles.post_actions_nav_wrap }>
            <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                <Share/>
            </Suspense>
            <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                <Comment/>
            </Suspense>
            <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                <Like id={ id } liked={ !!data?.userLikedPost?.like }/>
            </Suspense>
        </nav>
    )
}

export default PostActionsNavbar