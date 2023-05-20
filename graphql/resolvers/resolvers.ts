import { rootType } from "../../interfaces/graphql"
import { orm } from "./orm/orm";
import { signin } from "./auth/graphql_resolvers";

export const root: rootType = {
    Query: {
        async hello() {
            try {

                // let data = await orm.user.select( {
                //     data: {
                //         createdAt: true,
                //         email: true,
                //         id: true,
                //         name: true    
                //     },
                //     where: {
                //         id: "8a4b85a6-65d3-434653235-39636635-fb23d0c595f5"
                //     }
                // } ) 

                const data = await orm.user.insert( {
                    data: {
                        email: "heyyyy",
                        name: "heknn"
                    }
                } )

                console.log( data )

                return "Hey"
            } catch( e ) { 
                console.log( e ) 
            }
        }
    },
    Mutation: {
        signin: async( _, args, context ) => signin( _, args, context )
    }
}