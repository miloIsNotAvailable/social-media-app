import { RouteObject, redirect } from "react-router-dom";
import { GraphQLClient, gql } from "graphql-request";
import { Auth, AuthResolvers, SignIn, SignUp } from "../../../graphql/codegen/gql/gql";
import { client, fetcher, queryClient } from "../../../router/graphqlClient";

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

  if( !(data.get( "email" ) as string)!.match( "@" ) || !data.get( "password" ) ) throw new Response( "invalid email or password", { status: 400 } ) 

  await queryClient.invalidateQueries( { queryKey: [ "UserAuth" ] } )

  const query = await queryClient.fetchQuery( {
      queryKey: [ "UserAuth" ],
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

  console.log( query )

  return query
}