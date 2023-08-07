import { GraphQLError } from "graphql";
import { rootType } from "../../../interfaces/graphql";
import { orm } from "../orm/orm";
import { uuid } from "uuidv4";

export default {
    Query: {
        async queryPosts( _, { communityId } ) {
            try {

                const data = await orm.posts.select( {
                    data: { 
                        community_id: true, 
                        author_id: true, 
                        comment: true ,
                        id: true,
                        post_flair_id: true,
                        type: true
                    },
                    where: { community_id: communityId },
                    include: {
                        details: {
                            data: { 
                                content: true, 
                                title: true, 
                                createdAt: true 
                            },
                            equal: { post_id: true },
                            on: { id: true }
                        },
                        author: {
                            data: { name: true },
                            on: { author_id: true },
                            equal: { id: true }
                        },
                        likes: {
                            data: { id: true },
                            equal: { post_id: true },
                            on: { id: true }
                        }
                        // post_flairs: {
                        //     data: { flair_id: true },
                        //     on: { id: true },
                        //     equal: { flair_id: true },
                        //     include: {
                        //         flair: {
                        //             data: { flair_name: true, type: true },
                        //             on: { flair_id: true },
                        //             equal: { id: true }
                        //         }
                        //     }
                        // }
                    }
                } )

                console.log( data )
                return data?.map( args => ({
                    ...args,
                    details: args,
                    community: args,
                    author: args,
                    likes: [args]
                }) )

            } catch( e ) {
                throw new GraphQLError( e as any )
            }
        }
    },
    Mutation: {
        async userCreatePost( _, args ) {
        
            try {
        
                const flairs = await orm.flairs.select( {
                    data: { 
                        id: true, 
                        createdAt: true, 
                        updatedAt: true,
                        flair_name: true 
                    },
                    where: { flair_name: "text" }
                } )
                if( !flairs ) throw new Error( "flair not found" )

                const post_id = uuid()

                const data = await orm.posts.insert( {
                    data: {
                        id: post_id,
                        author_id: "8a4b85a6-65d3-434653235-39636635-fb23d0c595f5",
                        community_id: "e9cc01df-596b-424b-9d49-ea7517161c1b",
                        comment: false,
                        type: "text"
                    },
                    include: {
                        details: {
                            post_id,
                            title: args.title,
                            content: args.content
                        },
                        likes: {
                            post_id,
                            user_id: "8a4b85a6-65d3-434653235-39636635-fb23d0c595f5",
                        }
                    }
                } )

                console.log( data )
                
                for ( const { id: flair_id } of flairs! ) {
                    
                    await orm.postflairassignments.insert( {
                        data: { post_id, flair_id }
                    } )
                }

                return {
                    ...args,
                    details: args,
                    community: args,
                    likes: args,
                    flairs
                }
            } catch( e ) {
                throw new GraphQLError( e as any )
            }
        }
    }
} as rootType