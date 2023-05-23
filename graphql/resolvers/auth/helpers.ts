import { User } from "../../../db/orm/ast/types";
import { ExcludeExcept } from "../../../interfaces/custom";
import { JWTSession } from "./JWT";
import crypto from 'crypto'

export const acc_token = ( id: User["id"] ) => JWTSession.createJWTToken<ExcludeExcept<User, | "id">>( {
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


export const refresh_token = ( id: User["id"] ) => JWTSession.createJWTToken<ExcludeExcept<User, | "id">>( {
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
} )