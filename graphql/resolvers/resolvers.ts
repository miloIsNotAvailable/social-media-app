import { rootType } from "../../interfaces/graphql"
import { orm } from "./orm/orm";
import { signin } from "./auth/graphql_resolvers";
import { GraphQLError } from "graphql";
import { CreateCommunityMutationVariables } from "../codegen/gql/gql";
import { uuid } from 'uuidv4'

export const root: rootType = {
    Query: {
        async hello() {
            try {

                // console.log( data )

                return "Hey"
            } catch( e ) { 
                console.log( e ) 
            }
        }
    },

    Mutation: {
        signin,
        async createCommunity( 
            _, 
            { title, description }: CreateCommunityMutationVariables, 
            { user } 
        ) {
            
            try {

                const uuidv4 = uuid()

                const data = await orm.community.insert( {
                    data: {
                        title, 
                        description: description || "",
                        id: uuidv4
                    },
                    include: {
                        communities: {
                            community_id: uuidv4,
                            user_id: user
                        }
                    }
                } )

                return { title, description }
            } catch( e ) {
                new GraphQLError( e as any )
            }
        }
    }
}