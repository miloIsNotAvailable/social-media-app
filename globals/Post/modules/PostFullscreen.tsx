import { FC } from 'react'
import { styles } from '../styles'
import PostLayout from '../layouts/PostLayout'
import FullScreenActionsNavbar from '../navbars/FullScreenActionsNavbar'
import { useQueryPostQuery } from '../../../graphql/codegen/gql/gql'
import { client } from '../../../router/graphqlClient'
import { useParams } from 'react-router-dom'
import { Spinner } from '@globals/Fallback'
import SendCommentLayout from '../layouts/SendCommentLayout'

const FullScreenPost: FC = () => {

    const { id: queryPostId } = useParams() as { id: string }
    const { data, isLoading } = useQueryPostQuery( client, { queryPostId } )

    if( isLoading ) return <div className={ styles.post_fullscreen }>
        <Spinner/>
    </div>

    return (
        <div className={ styles.post_fullscreen }>
            <PostLayout 
                content={ data?.queryPost?.content } 
                title={ data?.queryPost?.title } 
                communityId={ data?.queryPost?.communityId }
            />
            <FullScreenActionsNavbar id={ queryPostId }/>
            <SendCommentLayout/>
        </div>
    )
}

export default FullScreenPost