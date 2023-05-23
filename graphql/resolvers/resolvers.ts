import { rootType } from "../../interfaces/graphql"
import { orm } from "./orm/orm";
import { signin } from "./auth/graphql_resolvers";

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
        signin
    }
}