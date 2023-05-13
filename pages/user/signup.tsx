import { FC } from "react";
import SignUpOutlet from "../../components/auth/outlets/SignUpOutlet";
import FillOutForm from "../../components/auth/layouts/FillOutForm";
import { RouteObject } from "react-router-dom";
import { queryClient } from "../../components/auth/modules/LoginPage";
import { SignInQueryVariables, SignInResolvers, fetcher } from "../../graphql/codegen/gql/gql";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient( "/api/graphiql" );
const SIGNIN_QUERY = gql`query SignIn($email: String, $password: String) {
    signin(email: $email, password: $password) {
      email
      password
    }
  }`

export const action: RouteObject["action"] = async( { params, request } ) => {
    
    const data = await request.formData()

    if( data.get( "username" )!.length < 4 ) throw new Error( "invalid data" ) 

    const query = queryClient.fetchQuery( {
        queryKey: [ "fn" ],
        queryFn: fetcher<SignInResolvers, SignInQueryVariables>( 
            client, 
            SIGNIN_QUERY,
            { email: data.get( "email" ) as string, password: data.get( "password" ) as string } 
        )
    } )

    return null
}

const SignUp: FC = () => {

    return <SignUpOutlet/>
}

export default SignUp