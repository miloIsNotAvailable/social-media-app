import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { contextType } from '../../interfaces/graphql';
import jwt from 'jsonwebtoken'
import { acc_token } from '../resolvers/auth/helpers';

type getUserFnType = () => string

export default function authDirective(
directiveName: string,
getUserFn: getUserFnType
) {
const typeDirectiveArgumentMaps: Record<string, any> = {};

return {
authDirectiveTypeDefs: `directive @${directiveName}(
        requires: Role = USER,
    ) on OBJECT | FIELD_DEFINITION
    
    enum Role {
        USER
        UNKNOWN
    }`,
authDirectiveTransformer: ( schema: GraphQLSchema ) =>
    mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
        const authDirective = getDirective(schema, type, directiveName)?.[0];
        if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective;
        }
        return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
        const authDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ??
        typeDirectiveArgumentMaps[typeName];
        if (authDirective) {
        const { requires } = authDirective;
        if (requires) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = async function (source, args, context: contextType, info) {
                
                const { req, res } = context

                const access_token = req.cookies[ "access_token" ]
                const refresh_token = req.cookies[ "refresh_token" ]
                
                // user is logged out when only 
                // access token exists, or both tokens are gone
                if( (!access_token && !refresh_token) || !refresh_token ) throw new GraphQLError( "could not find authorization token" )
             
                // check refresh token
                jwt.verify( 
                    refresh_token, 
                    process.env.REFRESH_TOKEN!, 
                    // check subject
                    { subject: "user" },
                    // decoded returns id, sub and iss
                    ( err, decoded ) => {
                    if( err ) throw new GraphQLError( "invalid refresh token" )

                    const { id, iss, sub } = decoded as { id: string, iss: string, sub: string }
                    
                    if( !access_token ) {
                        res.setHeader( "Set-Cookie", [ acc_token( id ) ] )
                        return
                    }

                    jwt.verify( 
                        access_token, 
                        process.env.ACCESS_TOKEN!,
                        { issuer: iss, subject: sub },
                        ( err ) => {                            
                            if( !err ) return

                            // check if jwt expired
                            err.message == "jwt expired" && res.setHeader( "Set-Cookie", [ acc_token( id ) ] )
                            // otherwise its forged or something
                            // so log user out
                            res.clearCookie( "refresh_token" )
                            res.clearCookie( "access_token" )
                            
                            throw new GraphQLError( "invalid access token" )
                        } 
                    )
                } )

                return resolve(source, args, context, info);
            };
            return fieldConfig;
        }
        }
    },
    }),
};
}

export function getUser() {
    console.log( "ye" )
    return "USER"
}

export const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth', getUser)