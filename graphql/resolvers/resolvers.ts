import { rootType } from "../../interfaces/graphql"

export const root: rootType = {
    Query: {
        async hello() {
            try {
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