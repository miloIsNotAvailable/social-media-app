import { RouteObject } from "react-router-dom";

import { GraphQLClient, gql } from "graphql-request";
import { Auth, AuthResolvers, SignIn, SignUp } from "../../../graphql/codegen/gql/gql";
import { fetcher, queryClient } from "../../../router/graphqlClient";

const client = new GraphQLClient( "/api/graphiql" );
const SIGNIN_QUERY = gql`mutation UserAuth($email: String!, $password: String!, $username: String) {
    signin(email: $email, password: $password, username: $username) {
      ... on SignIn {
        email
        password
      }
      ... on SignUp {
        email
        password
        username
      }
    }
  }`

export const action: RouteObject["action"] = async( { params, request } ) => {
    
    const data = await request.formData()

    if( !data.get( "email" ) || !data.get( "password" ) ) throw new Error( "invalid email or password" ) 

    const query = queryClient.fetchQuery( {
        queryKey: [ "fn" ],
        queryFn: fetcher<AuthResolvers, Auth>( 
            client, 
            SIGNIN_QUERY,
            { 
                email: data.get( "email" ) as string, 
                password: data.get( "password" ) as string,
                username: data.get( "username" ) as string
            } 
        )
    } )

    return null
}