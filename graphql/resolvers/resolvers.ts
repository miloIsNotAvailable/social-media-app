import { Generated } from "../../db/orm/generated"
import { rootType } from "../../interfaces/graphql"

let orm = new Generated();

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
                        email: "hi",
                        name: "hey"
                    }
                } )

                console.log( data )

                return "Hey"
            } catch( e ) { 
                console.log( e ) 
            }
        },
        async signin( _, args ) {
            try {
                console.log( args )
                return args
            } catch( e ) { 
                console.log( e ) 
            }
        },
    }
}