import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { contextType } from '../../../interfaces/graphql'
import crypto from 'crypto'
import { Request, Response } from 'express'

export namespace JWTSession {

    export type CookieOptions = cookie.CookieSerializeOptions

    type PayloadType<T> = jwt.SignOptions 

    type CreateCookieType = (
        cookie_name: string,
        encoded: string | undefined,
        options: CookieOptions
    ) => string    

    export const handleCreateCookie: CreateCookieType = ( 
        cookie_name,
        token,
        options     
    ): string => {

        const serialized = cookie.serialize(
        cookie_name, token!, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            ...options
            } 
        )

        return serialized
    }

    /**
     * @name createJWTToken
     * @description creates new jwt token and a cookie for it 
     * ---
     * @param payload takes sign which is just JSON Object,
     * and a jwt secret, token also has to have iss, subject and expiry 
     * date provided for safety reasons
     * 
     * @example ```ts
     *  
     * ```
     * 
     * @returns httpOnly secure cookie 
     */
    export const createJWTToken: <T>( 
        name: string,
        sign: T, 
        secret: string,
        payload: PayloadType<T>
    ) => string 
    = ( name, sign, secret, payload ) => {
        const token = jwt.sign(
            sign as object,
            secret,
            {
                jwtid: crypto.randomBytes( 16 ).toString( "hex" ),
                ...payload
            }
        )

        return handleCreateCookie( 
            name,
            token, 
            { 
            maxAge: payload.expiresIn as number || 60 * 60,
            httpOnly: true,
            secure: true,
            path: "/",
        } )
    }

    export const verify = <T>( token: string, secret: string ) => {
        const decoded = jwt.verify( token, secret ) as T

        return decoded
    }

    export const createJWTSession = <T>( res: Response, args: T ) => {
        const refresh_token_cookie = JWTSession.createJWTToken<T>( 
            "refresh_token",
            args,
            process.env.ACCESS_TOKEN!,
            {
                issuer: "/user/",
                expiresIn: 60 * 60 * 24, // 24 hours
                subject: "user"
            } 
        )

        const access_token_cookie = JWTSession.createJWTToken<T>( 
            "access_token",
            args,
            process.env.REFRESH_TOKEN!,
            {
                issuer: "/user/",
                expiresIn: 60 * 2, // 24 hours
                subject: "user"
            } 
        )
        
        res.setHeader( "Set-Cookie", [ refresh_token_cookie, access_token_cookie ] ) 

        // res.setHeader( "Set-Cookie", [ access_token_cookie ] ) 

    }
}