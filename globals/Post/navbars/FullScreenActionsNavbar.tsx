import { Loading } from '@globals/Fallback'
import { FC, Suspense, lazy } from 'react'
import { useUserLikedPostQuery } from '../../../graphql/codegen/gql/gql'
import { client } from '../../../router/graphqlClient'
import { styles } from '../styles'
const Like = lazy( () => import( "../buttons/Like" ) )
const Comment = lazy( () => import( "../buttons/Comment" ) )
const Share = lazy( () => import( "../buttons/share" ) )

interface FullScreenActionsNavbarProps {
    id: string
}

const FullScreenActionsNavbar: FC<FullScreenActionsNavbarProps> = ( { id } ) => {
    
    const { data, isLoading } = useUserLikedPostQuery( client, { postId: id } )

    if( isLoading ) return (
        <nav className={ styles.post_actions_nav_wrap }>
            <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/>
            <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/>
            <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/>
        </nav>        
    )

    return (
        <div className={ styles.post_actions_fullscreen_wrap }>
            <div className={ styles.post_actions_date }>
                2023-12-07
            </div>
            <nav 
                className={ styles.post_actions_nav_wrap } 
                style={ { 
                    padding: "1rem 0",
                    justifyContent: "space-around"
                } }
            >
                <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                    <Share/>
                </Suspense>
                <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                    <Comment id={ id }/>
                </Suspense>
                <Suspense fallback={ <Loading width={ "var(--icon-size)" } height={ "var(--icon-size)" }/> }>
                    <Like id={ id } liked={ !!data?.userLikedPost?.like }/>
                </Suspense>
            </nav>
        </div>
    )
}

export default FullScreenActionsNavbar