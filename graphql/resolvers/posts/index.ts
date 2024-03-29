import { GraphQLError } from "graphql";
import { rootType } from "../../../interfaces/graphql";
import { orm } from "../orm/orm";
import { uuid } from "uuidv4";
import { QueryCommunityPostsQuery, QueryCommunityPostsQueryVariables } from "../../codegen/gql/gql";
import { Where } from "../../../db/orm/Queries/interfaces";
import { Posts } from "../../../db/orm/ast/types";

/**
 * @params where is where statement for posts
 * @returns queried posts json
 */
const selectPosts: ( where: Where<Posts> ) => Promise<Posts[] | undefined> = async( where ) => {
    const data = await orm.posts.select( {
        // select data
        data: { 
            community_id: true, 
            author_id: true, 
            comment: true ,
            id: "post_id",
            post_flair_id: true,
            type: true
        },
        where,
        include: {
            // join for PostContent table
            details: {
                data: { 
                    content: true, 
                    title: true, 
                    createdAt: true 
                },
                // join on post_id = id
                equal: { post_id: true },
                on: { id: true }
            },
            // join User table
            author: {
                data: { name: true, id: true, email: true },
                // join on author_id = id
                on: { author_id: true },
                equal: { id: true }
            },
            // join Likes table
            likes: {
                data: { id: "like_id" },
                // join on post_id = id
                equal: { post_id: true },
                on: { id: true }
            },
            community: {
                data: { title: "community_name", description: true },
                on: { community_id: true },
                equal: { id: true }
            }
        }
    } )

    return data
}

/**
 * @returns mapped data for GraphQL types
 */
const mapOrmQueryData = ( args: Posts ) => {

    return {
        ...args,
        details: args,
        community: args,
        author: args,
        likes: [args] || []
    }
} 

export default {
    Query: {
        async queryPostById( _, { postId } ) {
            try {
                // if( !communityId ) throw new Error( "no community provided" )

                // const d = await orm.userscommunitiesbridge.select( {
                //     data: { id: true },
                //     include: {
                //         posts: {
                //             data: {  }
                //         }
                //     }
                // } )

                // query poss data
                const data = await orm.posts.select( {
                    // select data
                    data: { 
                        community_id: true, 
                        author_id: true, 
                        comment: true ,
                        id: "post_id",
                        post_flair_id: true,
                        type: true
                    },
                    where: { id: (postId as string) },
                    include: {
                        // join for PostContent table
                        details: {
                            data: { 
                                content: true, 
                                title: true, 
                                createdAt: true 
                            },
                            // join on post_id = id
                            equal: { post_id: true },
                            on: { id: true }
                        },
                        // join User table
                        author: {
                            data: { name: true, id: true, email: true },
                            // join on author_id = id
                            on: { author_id: true },
                            equal: { id: true }
                        },
                        // join Likes table
                        likes: {
                            data: { id: "like_id" },
                            // join on post_id = id
                            equal: { post_id: true },
                            on: { id: true }
                        },
                        community: {
                            data: { title: "community_name", description: true },
                            on: { community_id: true },
                            equal: { id: true }
                        }
                    }
                } )

                console.log( data )
                // map the data since it's an array 
                // and js will handle assigning proper 
                // object values
                return data?.map( args => ({
                    ...args,
                    details: args,
                    community: args,
                    author: args,
                    likes: [args] || []
                }) )[0]

            } catch( e ) {
                throw new GraphQLError( e as any )
            }
        },
        
        async queryPosts( _, { communityId }: QueryCommunityPostsQueryVariables ) {

            try {
                return (await selectPosts( { community_id: communityId as string } ))!
                .map( mapOrmQueryData )
            } catch( e ) {
                throw new GraphQLError( e as any )
            }
        },

        // TODO: get nested include joins working
        async queryPostsUnion( _, { communityId: community_id, postId: post_id }, { user } ) {
            try {
                
                // map the data since it's an array 
                // and js will handle assigning proper 
                // object values
                if( community_id ) return {
                    __typename: "CommunityPostsArray",
                    posts: (await selectPosts( { community_id } ))!
                    .map( args => mapOrmQueryData( { 
                            ...args, 
                        } ) ) as QueryCommunityPostsQuery
                }

                if( post_id ) {
                    const data = await selectPosts( { id: post_id } )
                    return { 
                        __typename: "PostsSingle", 
                        post: data?.map( args => mapOrmQueryData( { 
                            ...args, 
                        } ) )[0]
                    }
                }
                return null

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