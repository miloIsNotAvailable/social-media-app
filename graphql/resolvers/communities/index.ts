import { GraphQLError } from "graphql";
import { rootType } from "../../../interfaces/graphql";
import { orm } from "../orm/orm";

export default {
    Query: {
        async searchCommunity( _, { name } ) {
            const data = await orm.communities.select( {
                data: { community_name: true, createdAt: true, description: true, id: true },
                where: { community_name: { LIKE: name } }
            } )

            return data
        }
    },
    Mutation: {
        async createCommunities( _, { name, description } ) {

            try {
                const data = await orm.communities.insert( {
                    data: {
                        community_name: name,
                        description                    
                    }
                } )
    
                return data![0]    
            } catch( e ) {
                throw new GraphQLError( e as any )
            }
        }
    }
} as rootType