import { FC, Suspense, useEffect } from 'react'
import { UserCommunitiesQuery, useUserCommunitiesQuery } from '../../../graphql/codegen/gql/gql'
import { client } from '../../../router/graphqlClient'
import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom'
import { styles } from '../styles'
import Post from '@globals/Post'
import { Post as PostType } from '../../../db/orm/ast/types'
import { Spinner } from '@globals/Fallback'

const ForYou: FC = () => {

    const { data, isLoading, error } = useUserCommunitiesQuery( client, {
        userId: ""        
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
        <div className={ styles.for_you_wrap }>
            { data?.userCommunities && data!.userCommunities!.map( 
                ( e: any ) => (
                <Post
                    { ...(e!) }
                />
            ) ) }
        </div>
    )
}

export default ForYou