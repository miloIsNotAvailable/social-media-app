import { FC, Suspense, useEffect } from 'react'
import { Posts as PostsType, UserCommunitiesQuery, useQueryCommunityPostsQuery, useUserCommunitiesQuery } from '../../../graphql/codegen/gql/gql'
import { client } from '../../../router/graphqlClient'
import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom'
import { styles } from '../styles'
import Post, { Posts } from '@globals/Post'
import { Post as PostType } from '../../../db/orm/ast/types'
import { Spinner } from '@globals/Fallback'

const ForYou: FC = () => {

    const { data, isLoading, error } = useQueryCommunityPostsQuery( client, {
        communityId: "e9cc01df-596b-424b-9d49-ea7517161c1b"        
    } )

    const navigate = useNavigate()
    useEffect( () => {
        if( error ) navigate( "/user/signin" )
    }, [ error ] )

    if( isLoading ) return (
        <div className={ styles.for_you_wrap }>
            <Spinner/>
        </div>
    ) 

    return (
        <>
            { 
                data?.queryPosts && 
                <Posts posts={ data!.queryPosts! as PostsType[] }/> 
            }
        </>
    )
}

export default ForYou