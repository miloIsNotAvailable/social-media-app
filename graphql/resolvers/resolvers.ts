import { Generated } from "../../db/orm/generated"
import { rootType } from "../../interfaces/graphql"

let orm = new Generated();

export const root: rootType = {
    Query: {
        async hello() {
            try {

                let data = await orm.user.insert( {
                    data: {
                        id: "hey"
                    },
                    include: {
                        posts: {
                           createdAt: "" 
                        }
                    }
                } )

                // console.log( data )

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