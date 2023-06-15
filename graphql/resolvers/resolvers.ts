import { rootType } from "../../interfaces/graphql"
import { orm } from "./orm/orm";
import { signin } from "./auth/graphql_resolvers";
import { GraphQLError } from "graphql";
import { CreateCommunityMutationVariables, CreatePostMutation, CreatePostMutationVariables, LikePostMutationVariables, QueryUserLikedPostArgs } from "../codegen/gql/gql";
import { uuid } from 'uuidv4'
import { createClient } from '@supabase/supabase-js'
import { decode } from 'base64-arraybuffer'
import { Community, Post, UsersCommunitiesBridge } from "../../db/orm/ast/types";

const prepareBase64DataUrl = ( base64: string ) => base64
    .replace('data:image/jpeg;', 'data:image/jpeg;charset=utf-8;')
    .replace('data:image/png;', 'data:image/png;charset=utf-8;')
    .replace(/^.+,/, '')

const supabase = createClient( "https://pwfvdtvduwysiswsbyio.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZnZkdHZkdXd5c2lzd3NieWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzODMxNzAsImV4cCI6MTk5ODk1OTE3MH0.Xvch3b9lPuYfHVbo8xEZbuFuZCWm0OxqDRIZSGGML6o" )

export const root: rootType = {
    Query: {
        async hello() {
            try {

                // console.log( data )

                return "Hey"
            } catch( e ) { 
                console.log( e ) 
            }
        },
        async userCommunities( _, args, { user } ) {
            try {

                const data = await orm.userscommunitiesbridge.select( {
                    data: {
                        community_id: true,
                    },
                    include: {
                        community: {
                            on: { community_id: true },
                            equal: { id: true },
                            data: { title: true },
                        },
                        posts: {
                            on: { community_id: true },
                            equal: { communityId: true },
                            data: { 
                                content: true, 
                                title: true,
                                communityId: true,
                                authorId: true,
                                createdAt: true,
                                id: true 
                            }
                        }
                    },
                    where: { user_id: user }
                } )

                console.log( data )

                return data!.map( ( d: UsersCommunitiesBridge | Post ) => ({ 
                        ...d, 
                        createdAt: (d as any).createdat,
                        authorId: (d as any).authorid,
                        communityId: (d as any).communityid,
                    })
                )
            } catch( e ) { 
                throw new GraphQLError( e as any ) 
            }
        },
        async userLikedPost( _, { postId }: QueryUserLikedPostArgs, { user } ) {

            const data = await orm.like.select( {
                data: { id: true },
                where: {
                    postId,
                    userId: user
                }
            } )

            return { like: !!data?.length } 
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
        },

        async createPost( _, { communityId, title, content }: CreatePostMutationVariables, { user } ) {

            try {

                const name = uuid();

                const img = content && content?.match( /data\:image\/(.*)/ ) && 
                await supabase
                .storage
                .from('images')
                .upload( `${ name }.jpg`,
                    Buffer.from(prepareBase64DataUrl( content ), 'base64'),
                    {
                        contentType: 'image/jpeg',
                        upsert: true,
                    }
                )

                const link: "" | { data: { publicUrl: string } } | undefined | null = img && 
                await supabase
                .storage
                .from( "images" )
                .getPublicUrl( `${ name }.jpg` )

                const [ { id } ] = communityId && await orm.community.select( {
                    data: { id: true },
                    where: { title: communityId }
                } ) || [ { id: undefined } ]
    
                const data = await orm.post.insert( {
                    data: {
                        authorId: user,
                        communityId: id,
                        title,
                        content: (link as { data: { publicUrl: string } })?.data?.publicUrl || content as string | undefined
                    }
                } )
    
                return {
                    title,
                    content
                } as CreatePostMutation[ "createPost" ]
    
            } catch( e ) {
                throw new GraphQLError( e as any )
            }
        },
        async likePost( _, { postId, like }: LikePostMutationVariables, { user } ) {

            console.log(like )

            if( !like ) {
                await orm.like.delete( {
                    where: { userId: user, postId }
                } )

                return { like }
            }

            const data = await orm.like.insert( {
                data: {
                    postId,
                    userId: user
                }
            } )

            return { like }
        }
    }
}