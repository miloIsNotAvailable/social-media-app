import { FC } from 'react'
import { CommunityPosts, Maybe, Post, useQueryCommunityQuery } from '../../../graphql/codegen/gql/gql'
import { client } from '../../../router/graphqlClient'
import { Posts } from '@globals/Post'
import { useParams } from 'react-router-dom'
import { Spinner } from '@globals/Fallback'
import { styles } from '../styles'

const CommunityPosts: FC = () => {

    const { id: communityId } = useParams() as { id: string }

    const { data, isLoading } = useQueryCommunityQuery( client, {
        communityId,
        includePosts: true
    } )

    if( isLoading ) return <Spinner placeSelf='center'/>

    return (
        <Posts posts={ 
            data?.queryCommunity && 
            ((data?.queryCommunity as NonNullable<CommunityPosts>)!
            .posts as Post[])
            .map( ( e ) => ( { ...e, communityId } ) ) || [] 
        }/>
    )
}

export default CommunityPosts