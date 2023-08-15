import { FC } from 'react'
import { Posts as PostsType, useQueryCommunityPostsQuery } from '../../../graphql/codegen/gql/gql'
import { client } from '../../../router/graphqlClient'
import { useParams } from 'react-router-dom'
import { Spinner } from '@globals/Fallback'
import { styles } from '../styles'
import { Posts } from '@globals/Post'

const CommunityPostsComponent: FC = () => {

    const { id: communityId } = useParams() as { id: string }

    const { data, isLoading, error } = useQueryCommunityPostsQuery( client, {
        communityId       
    } )

    if( isLoading ) return <Spinner placeSelf='center'/>

    return ( 
        <Posts posts={ data!.queryPosts! as PostsType[] || [] }/> 

    )
}

export default CommunityPostsComponent