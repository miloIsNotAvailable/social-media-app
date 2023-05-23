import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { contextType } from '../../../interfaces/graphql'
import crypto from 'crypto'
import { Request, Response } from 'express'

export namespace JWTSession {

    export type CookieOptions = cookie.CookieSerializeOptions

    export type JWTOptionsType<T> = { 
        name: string,
        sign: T, 
        secret: string,
        jwtOptions: jwt.SignOptions,
        cookieOptions: cookie.CookieSerializeOptions
    } 

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
    export const createJWTToken: <T>( args: JWTOptionsType<T> ) => string 
    = ( { name, sign, secret, jwtOptions, cookieOptions } ) => {
        
        const token = jwt.sign(
            sign as object,
            secret,
            jwtOptions
        )

        const serialized = cookie.serialize(
            name, 
            token!, 
            cookieOptions
        )

        return serialized
    }

    export const verify = <T>( token: string, secret: string ) => {
        const decoded = jwt.verify( token, secret ) as T

        return decoded
    }

    export const createJWTSession = <T>( res: Response, req: Request, args: {
        jwts: string[],

    } ) => {

        res.setHeader( "Set-Cookie", args.jwts ) 
        return args.jwts
    }
}