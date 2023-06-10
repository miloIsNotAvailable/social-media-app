import { LoaderFunction, defer } from 'react-router-dom'
import { client, queryClient } from '../../../router/graphqlClient'
import { UserCommunitiesDocument, UserCommunitiesQuery, UserCommunitiesQueryVariables, fetcher } from '../../../graphql/codegen/gql/gql'

export const loader: LoaderFunction = async( { 
    params, 
    request: req, 
    context 
} ) => {

    // console.log( "hey" )
    if( typeof window === "undefined" ) return defer( { data: null } )

    const data = queryClient.fetchQuery( {
        queryKey: ["UserCommunities"],
        queryFn: fetcher<UserCommunitiesQuery, UserCommunitiesQueryVariables>( 
                client, 
                UserCommunitiesDocument,
                { userId: "" } 
            )
    } )

    console.log( data )

    return defer( { data } )
}