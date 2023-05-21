import { GraphQLError } from "graphql"
import { GraphqlResolver } from "../../../interfaces/graphql"
import { SignIn, SignUp, UserAuthMutationVariables } from "../../codegen/gql/gql"
import { JWTSession } from "./JWT"
import { orm } from "../orm/orm"
import { ExcludeExcept } from "../../../interfaces/custom"
import { User } from "../../../db/orm/ast/types"
import crypto from 'crypto'

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

            JWTSession.createJWTSession<ExcludeExcept<User, | "id">>( 
                res, req, 
                { jwts: [
                    JWTSession.createJWTToken<ExcludeExcept<User, | "id">>( {
                        name: "refresh_token",
                        sign: { id: "heyey" },
                        secret: process.env.REFRESH_TOKEN!,
                        cookieOptions: {
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 7,
                            secure: true,
                            path: "/"
                        },
                        jwtOptions: {
                            expiresIn: 60 * 60 * 24 * 7,
                            jwtid: crypto.randomBytes( 32 ).toString(),
                            issuer: "heyey",
                            subject: "user"
                        }
                    } ),
                    
                    JWTSession.createJWTToken<ExcludeExcept<User, | "id">>( {
                        name: "access_token",
                        sign: { id: "heyey" },
                        secret: process.env.ACCESS_TOKEN!,
                        cookieOptions: {
                            httpOnly: true,
                            maxAge: 60 * 60,
                            secure: true,
                            path: "/"
                        },
                        jwtOptions: {
                            expiresIn: 60 * 60,
                            jwtid: crypto.randomBytes( 32 ).toString(),
                            issuer: "heyey",
                            subject: "user"
                        }
                    } )
                ] }
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
            data: { email: true, id: true },
            where: { email }
        } ) 

        if( !check_for_account || !check_for_account.length ) throw new GraphQLError( "account doesn't exist" )

        const [ { id } ] = check_for_account

        JWTSession.createJWTSession<ExcludeExcept<User, | "id">>( 
            res, req, 
            { jwts: [
                JWTSession.createJWTToken<ExcludeExcept<User, | "id">>( {
                    name: "refresh_token",
                    sign: { id },
                    secret: process.env.REFRESH_TOKEN!,
                    cookieOptions: {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7,
                        secure: true,
                        path: "/"
                    },
                    jwtOptions: {
                        expiresIn: 60 * 60 * 24 * 7,
                        jwtid: crypto.randomBytes( 32 ).toString(),
                        issuer: id,
                        subject: "user"
                    }
                } ),
                
                JWTSession.createJWTToken<ExcludeExcept<User, | "id">>( {
                    name: "access_token",
                    sign: { id },
                    secret: process.env.ACCESS_TOKEN!,
                    cookieOptions: {
                        httpOnly: true,
                        maxAge: 60 * 60,
                        secure: true,
                        path: "/"
                    },
                    jwtOptions: {
                        expiresIn: 60 * 60,
                        jwtid: crypto.randomBytes( 32 ).toString(),
                        issuer: id,
                        subject: "user"
                    }
                } )
            ] }
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