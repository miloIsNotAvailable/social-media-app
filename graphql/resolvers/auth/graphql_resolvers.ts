import { GraphQLError } from "graphql"
import { GraphqlResolver } from "../../../interfaces/graphql"
import { UserAuthMutationVariables } from "../../codegen/gql/gql"
import { JWTSession } from "./JWT"
import { orm } from "../orm/orm"
import { ExcludeExcept } from "../../../interfaces/custom"
import { User } from "../../../db/orm/ast/types"
import crypto from 'crypto'
import { acc_token, refresh_token } from "./helpers"

export const signin: GraphqlResolver<UserAuthMutationVariables> = async( 
    _, 
    { email, password, username }, 
    { req, res } 
) =>  {

    if( !!req.cookies[ "refresh_token" ] ) throw new GraphQLError( "user already logged in" )

    try {

        // if username is provided, that means 
        // user is trying to create an account
        // if it fails ( most likely due to duplicate unique key constraint )
        // then throw graphql error
        if( !!username ) await orm.user.insert( {
                data: { 
                    email, 
                    name: username 
                }
            } )

        // check for account in signin,
        // in signup check for created account 
        // then using the email provided in args
        const check_for_account = await orm.user.select( {
            data: { email: true, id: true },
            where: { email }
        } ) 

        // throw error for empty array
        if( !check_for_account || !check_for_account.length ) throw new GraphQLError( "account doesn't exist" )

        // grant authorization and create refresh and access token
        const [ { id } ] = check_for_account

        const ref_token = refresh_token( id )
        const access_token = acc_token( id )

        JWTSession.createJWTSession<ExcludeExcept<User, | "id">>( 
            res, req, 
            { jwts: [
                ref_token,
                access_token
            ] }
        )
    
        return {
            __typename: "AuthSuccess",
            token: access_token
        }
    } catch( e ) {
        throw new GraphQLError( (e as Error).message )
    }
}