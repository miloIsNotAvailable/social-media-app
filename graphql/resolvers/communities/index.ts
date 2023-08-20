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
    }
} as rootType