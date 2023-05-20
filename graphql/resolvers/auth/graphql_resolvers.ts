import { GraphQLError } from "graphql"
import { GraphqlResolver } from "../../../interfaces/graphql"
import { SignIn, SignUp, UserAuthMutationVariables } from "../../codegen/gql/gql"
import { JWTSession } from "./JWT"
import { orm } from "../orm/orm"
import { ExcludeExcept } from "../../../interfaces/custom"

export const signin: GraphqlResolver<UserAuthMutationVariables> = async( 
    _, 
    { email, password, username }, 
    { req, res } 
) =>  {

    if( !!req.cookies[ "refresh_token" ] ) throw new GraphQLError( "user already logged in" )

    if( !!username ) {
     
        try {

            const check_for_account = await orm.user.select( {
                data: { email: true },
                where: { email }
            } ) 

            if( !!check_for_account && !!check_for_account.length ) throw new GraphQLError( "account already exists" )

            // const data = await orm.user.insert( {
            //     data: { 
            //         email, 
            //         name: username 
            //     }
            // } ) 

            JWTSession.createJWTSession<ExcludeExcept<SignUp, "email" | "username">>( 
                res, 
                { username } 
            )

            return {
                __typename: "SignUp",
                email, 
                password, 
                username
            }

        } catch( e ) {
            throw new GraphQLError( (e as Error).message )
        }
    }

    try {

        const check_for_account = await orm.user.select( {
            data: { email: true },
            where: { email }
        } ) 

        if( !check_for_account || !check_for_account.length ) throw new GraphQLError( "account doesn't exist" )

        JWTSession.createJWTSession<ExcludeExcept<SignUp, "email" | "username">>( 
            res, 
            { username, email } 
        )
    
        return {
            __typename: "SignIn",
            email, 
            password
        }
    } catch( e ) {
        throw new GraphQLError( (e as Error).message )
    }
}