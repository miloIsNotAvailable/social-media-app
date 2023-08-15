import { FC } from 'react'
import { styles } from '../styles'
import PostLayout from '../layouts/PostLayout'
import FullScreenActionsNavbar from '../navbars/FullScreenActionsNavbar'
import { useQueryCommunityPostsQuery, useQueryPostQuery } from '../../../graphql/codegen/gql/gql'
import { client } from '../../../router/graphqlClient'
import { useParams } from 'react-router-dom'
import { Spinner } from '@globals/Fallback'
import SendCommentLayout from '../layouts/SendCommentLayout'

const FullScreenPost: FC = () => {

    const { id: queryPostId } = useParams() as { id: string }
    const { data, isLoading } = useQueryCommunityPostsQuery( client, { communityId: queryPostId } )

    if( !isLoading && !data?.queryPosts ) return <div className={ styles.post_fullscreen }>
        faled to load post
    </div>

    if( isLoading ) return <div className={ styles.post_fullscreen }>
        <Spinner/>
    </div>

    return (
        <div className={ styles.post_fullscreen }>
            <PostLayout 
                { ...data!.queryPosts![0] }
            />
            <FullScreenActionsNavbar id={ queryPostId }/>
            <SendCommentLayout/>
        </div>
    )
}

export default FullScreenPost