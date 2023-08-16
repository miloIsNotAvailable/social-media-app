import { GraphQLResolveInfo } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders }from 'graphql-request/src/types';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth = AuthError | AuthSuccess;

export type AuthError = {
  __typename?: 'AuthError';
  error?: Maybe<Scalars['String']>;
};

export type AuthSuccess = {
  __typename?: 'AuthSuccess';
  token?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  comments?: Maybe<Array<Maybe<Post>>>;
  post_id?: Maybe<Scalars['String']>;
};

export type Communities = {
  __typename?: 'Communities';
  community_id?: Maybe<Scalars['String']>;
  community_name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Community = {
  __typename?: 'Community';
  communities?: Maybe<Array<Maybe<UsersCommunitiesBridge>>>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CommunityDetails = {
  __typename?: 'CommunityDetails';
  communities?: Maybe<Array<Maybe<UsersCommunitiesBridge>>>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CommunityPosts = {
  __typename?: 'CommunityPosts';
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type CommunityQuery = CommunityDetails | CommunityPosts;

export type Flairs = {
  __typename?: 'Flairs';
  createdat?: Maybe<Scalars['String']>;
  flair_name?: Maybe<Scalars['String']>;
  flairs?: Maybe<Array<Maybe<PostFlairAssignments>>>;
  id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedat?: Maybe<Scalars['String']>;
};

export type Like = {
  __typename?: 'Like';
  id?: Maybe<Scalars['String']>;
  like?: Maybe<Scalars['Boolean']>;
  postId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Likes = {
  __typename?: 'Likes';
  like_id?: Maybe<Scalars['String']>;
  post_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createCommunity?: Maybe<Community>;
  createPost?: Maybe<Post>;
  likePost?: Maybe<Like>;
  signin?: Maybe<Auth>;
  userCreatePost?: Maybe<Posts>;
};


export type MutationCreateCommentArgs = {
  communityId?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  post_id: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateCommunityArgs = {
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationCreatePostArgs = {
  communityId?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationLikePostArgs = {
  like: Scalars['Boolean'];
  postId: Scalars['String'];
};


export type MutationSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUserCreatePostArgs = {
  communityId?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  flairs?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<Array<Maybe<User>>>;
  authorId?: Maybe<Scalars['String']>;
  communityId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  likes?: Maybe<Array<Maybe<Like>>>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type PostContent = {
  __typename?: 'PostContent';
  content?: Maybe<Scalars['String']>;
  content_id?: Maybe<Scalars['String']>;
  createdat?: Maybe<Scalars['String']>;
  post_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedat?: Maybe<Scalars['String']>;
};

export type PostFlairAssignments = {
  __typename?: 'PostFlairAssignments';
  createdat?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  updatedat?: Maybe<Scalars['String']>;
};

export type Posts = {
  __typename?: 'Posts';
  author?: Maybe<User>;
  comment?: Maybe<Scalars['Boolean']>;
  community?: Maybe<Communities>;
  details?: Maybe<PostContent>;
  flairs?: Maybe<Array<Maybe<PostFlairAssignments>>>;
  likes?: Maybe<Array<Maybe<Likes>>>;
  post_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  queryComments?: Maybe<Comment>;
  queryCommunity?: Maybe<CommunityQuery>;
  queryPost?: Maybe<Post>;
  queryPostById?: Maybe<Array<Maybe<Posts>>>;
  queryPosts?: Maybe<Array<Maybe<Posts>>>;
  userCommunities?: Maybe<Array<Maybe<Post>>>;
  userLikedPost?: Maybe<Like>;
};


export type QueryQueryCommentsArgs = {
  post_id: Scalars['String'];
};


export type QueryQueryCommunityArgs = {
  communityId: Scalars['String'];
  includePosts?: InputMaybe<Scalars['Boolean']>;
};


export type QueryQueryPostArgs = {
  id: Scalars['String'];
};


export type QueryQueryPostByIdArgs = {
  communityId?: InputMaybe<Scalars['String']>;
};


export type QueryQueryPostsArgs = {
  communityId?: InputMaybe<Scalars['String']>;
};


export type QueryUserCommunitiesArgs = {
  user_id: Scalars['String'];
};


export type QueryUserLikedPostArgs = {
  postId: Scalars['String'];
};

export enum Role {
  Unknown = 'UNKNOWN',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  communities?: Maybe<Array<Maybe<UsersCommunitiesBridge>>>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UsersCommunitiesBridge = {
  __typename?: 'UsersCommunitiesBridge';
  community?: Maybe<Array<Maybe<Community>>>;
  community_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = {
  Auth: ( AuthError ) | ( AuthSuccess );
  CommunityQuery: ( CommunityDetails ) | ( CommunityPosts );
};

/** Mapping of union parent types */
export type ResolversUnionParentTypes = {
  Auth: ( AuthError ) | ( AuthSuccess );
  CommunityQuery: ( CommunityDetails ) | ( CommunityPosts );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auth: ResolverTypeWrapper<ResolversUnionTypes['Auth']>;
  AuthError: ResolverTypeWrapper<AuthError>;
  AuthSuccess: ResolverTypeWrapper<AuthSuccess>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  Communities: ResolverTypeWrapper<Communities>;
  Community: ResolverTypeWrapper<Community>;
  CommunityDetails: ResolverTypeWrapper<CommunityDetails>;
  CommunityPosts: ResolverTypeWrapper<CommunityPosts>;
  CommunityQuery: ResolverTypeWrapper<ResolversUnionTypes['CommunityQuery']>;
  Flairs: ResolverTypeWrapper<Flairs>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Like: ResolverTypeWrapper<Like>;
  Likes: ResolverTypeWrapper<Likes>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostContent: ResolverTypeWrapper<PostContent>;
  PostFlairAssignments: ResolverTypeWrapper<PostFlairAssignments>;
  Posts: ResolverTypeWrapper<Posts>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UsersCommunitiesBridge: ResolverTypeWrapper<UsersCommunitiesBridge>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: ResolversUnionParentTypes['Auth'];
  AuthError: AuthError;
  AuthSuccess: AuthSuccess;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  Communities: Communities;
  Community: Community;
  CommunityDetails: CommunityDetails;
  CommunityPosts: CommunityPosts;
  CommunityQuery: ResolversUnionParentTypes['CommunityQuery'];
  Flairs: Flairs;
  Int: Scalars['Int'];
  Like: Like;
  Likes: Likes;
  Mutation: {};
  Post: Post;
  PostContent: PostContent;
  PostFlairAssignments: PostFlairAssignments;
  Posts: Posts;
  Query: {};
  String: Scalars['String'];
  User: User;
  UsersCommunitiesBridge: UsersCommunitiesBridge;
};

export type AuthDirectiveArgs = {
  requires?: Maybe<Role>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'AuthSuccess', ParentType, ContextType>;
};

export type AuthErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthError'] = ResolversParentTypes['AuthError']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthSuccess'] = ResolversParentTypes['AuthSuccess']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  post_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunitiesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Communities'] = ResolversParentTypes['Communities']> = {
  community_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  community_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']> = {
  communities?: Resolver<Maybe<Array<Maybe<ResolversTypes['UsersCommunitiesBridge']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommunityDetails'] = ResolversParentTypes['CommunityDetails']> = {
  communities?: Resolver<Maybe<Array<Maybe<ResolversTypes['UsersCommunitiesBridge']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityPostsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommunityPosts'] = ResolversParentTypes['CommunityPosts']> = {
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommunityQuery'] = ResolversParentTypes['CommunityQuery']> = {
  __resolveType: TypeResolveFn<'CommunityDetails' | 'CommunityPosts', ParentType, ContextType>;
};

export type FlairsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Flairs'] = ResolversParentTypes['Flairs']> = {
  createdat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flair_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flairs?: Resolver<Maybe<Array<Maybe<ResolversTypes['PostFlairAssignments']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  like?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  postId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Likes'] = ResolversParentTypes['Likes']> = {
  like_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'post_id' | 'title'>>;
  createCommunity?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<MutationCreateCommunityArgs, 'title'>>;
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'title'>>;
  likePost?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<MutationLikePostArgs, 'like' | 'postId'>>;
  signin?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationSigninArgs, 'email' | 'password'>>;
  userCreatePost?: Resolver<Maybe<ResolversTypes['Posts']>, ParentType, ContextType, RequireFields<MutationUserCreatePostArgs, 'title'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  communityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Like']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostContent'] = ResolversParentTypes['PostContent']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostFlairAssignmentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostFlairAssignments'] = ResolversParentTypes['PostFlairAssignments']> = {
  createdat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Posts'] = ResolversParentTypes['Posts']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Communities']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['PostContent']>, ParentType, ContextType>;
  flairs?: Resolver<Maybe<Array<Maybe<ResolversTypes['PostFlairAssignments']>>>, ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Likes']>>>, ParentType, ContextType>;
  post_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  queryComments?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryQueryCommentsArgs, 'post_id'>>;
  queryCommunity?: Resolver<Maybe<ResolversTypes['CommunityQuery']>, ParentType, ContextType, RequireFields<QueryQueryCommunityArgs, 'communityId'>>;
  queryPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryQueryPostArgs, 'id'>>;
  queryPostById?: Resolver<Maybe<Array<Maybe<ResolversTypes['Posts']>>>, ParentType, ContextType, Partial<QueryQueryPostByIdArgs>>;
  queryPosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Posts']>>>, ParentType, ContextType, Partial<QueryQueryPostsArgs>>;
  userCommunities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, RequireFields<QueryUserCommunitiesArgs, 'user_id'>>;
  userLikedPost?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<QueryUserLikedPostArgs, 'postId'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  communities?: Resolver<Maybe<Array<Maybe<ResolversTypes['UsersCommunitiesBridge']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersCommunitiesBridgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersCommunitiesBridge'] = ResolversParentTypes['UsersCommunitiesBridge']> = {
  community?: Resolver<Maybe<Array<Maybe<ResolversTypes['Community']>>>, ParentType, ContextType>;
  community_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>;
  AuthError?: AuthErrorResolvers<ContextType>;
  AuthSuccess?: AuthSuccessResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Communities?: CommunitiesResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  CommunityDetails?: CommunityDetailsResolvers<ContextType>;
  CommunityPosts?: CommunityPostsResolvers<ContextType>;
  CommunityQuery?: CommunityQueryResolvers<ContextType>;
  Flairs?: FlairsResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Likes?: LikesResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostContent?: PostContentResolvers<ContextType>;
  PostFlairAssignments?: PostFlairAssignmentsResolvers<ContextType>;
  Posts?: PostsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersCommunitiesBridge?: UsersCommunitiesBridgeResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};

export type UserAuthMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
}>;


export type UserAuthMutation = { __typename?: 'Mutation', signin?: { __typename?: 'AuthError', error?: string | null } | { __typename?: 'AuthSuccess', token?: string | null } | null };

export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = { __typename?: 'Query', hello?: string | null };

export type CreateCommunityMutationVariables = Exact<{
  title: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity?: { __typename?: 'Community', id?: string | null, title?: string | null, description?: string | null } | null };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  communityId?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', authorId?: string | null, content?: string | null, createdAt?: string | null, id?: string | null, title?: string | null, updatedAt?: string | null } | null };

export type UserCommunitiesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserCommunitiesQuery = { __typename?: 'Query', userCommunities?: Array<{ __typename?: 'Post', authorId?: string | null, communityId?: string | null, content?: string | null, createdAt?: string | null, id?: string | null, title?: string | null, updatedAt?: string | null } | null> | null };

export type UserLikedPostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type UserLikedPostQuery = { __typename?: 'Query', userLikedPost?: { __typename?: 'Like', like?: boolean | null } | null };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String'];
  like: Scalars['Boolean'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'Like', like?: boolean | null } | null };

export type QueryCommunityQueryVariables = Exact<{
  communityId: Scalars['String'];
  includePosts?: InputMaybe<Scalars['Boolean']>;
}>;


export type QueryCommunityQuery = { __typename?: 'Query', queryCommunity?: { __typename?: 'CommunityDetails', id?: string | null, title?: string | null, description?: string | null, createdAt?: string | null } | { __typename?: 'CommunityPosts', posts?: Array<{ __typename?: 'Post', content?: string | null, authorId?: string | null, title?: string | null, id?: string | null } | null> | null } | null };

export type QueryPostQueryVariables = Exact<{
  queryPostId: Scalars['String'];
}>;


export type QueryPostQuery = { __typename?: 'Query', queryPost?: { __typename?: 'Post', authorId?: string | null, communityId?: string | null, content?: string | null, createdAt?: string | null, id?: string | null, title?: string | null } | null };

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['String'];
  title: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  communityId?: InputMaybe<Scalars['String']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', post_id?: string | null } | null };

export type ContentFragment = { __typename?: 'Posts', details?: { __typename?: 'PostContent', content?: string | null, title?: string | null } | null };

export type CommunityFragment = { __typename?: 'Posts', community?: { __typename?: 'Communities', community_id?: string | null, community_name?: string | null, description?: string | null } | null };

export type FlairsFragment = { __typename?: 'Posts', flairs?: Array<{ __typename?: 'PostFlairAssignments', createdat?: string | null, id?: string | null, updatedat?: string | null } | null> | null };

export type AuthorFragment = { __typename?: 'Posts', author?: { __typename?: 'User', email?: string | null, id?: string | null, name?: string | null } | null };

export type LikesFragment = { __typename?: 'Posts', likes?: Array<{ __typename?: 'Likes', like_id?: string | null } | null> | null };

export type QueryCommunityPostsQueryVariables = Exact<{
  communityId?: InputMaybe<Scalars['String']>;
}>;


export type QueryCommunityPostsQuery = { __typename?: 'Query', queryPosts?: Array<{ __typename?: 'Posts', comment?: boolean | null, post_id?: string | null, type?: string | null, author?: { __typename?: 'User', email?: string | null, id?: string | null, name?: string | null } | null, details?: { __typename?: 'PostContent', content?: string | null, title?: string | null } | null, flairs?: Array<{ __typename?: 'PostFlairAssignments', createdat?: string | null, id?: string | null, updatedat?: string | null } | null> | null, community?: { __typename?: 'Communities', community_id?: string | null, community_name?: string | null, description?: string | null } | null, likes?: Array<{ __typename?: 'Likes', like_id?: string | null } | null> | null } | null> | null };

export const ContentFragmentDoc = `
    fragment Content on Posts {
  details {
    content
    title
  }
}
    `;
export const CommunityFragmentDoc = `
    fragment Community on Posts {
  community {
    community_id
    community_name
    description
  }
}
    `;
export const FlairsFragmentDoc = `
    fragment Flairs on Posts {
  flairs {
    createdat
    id
    updatedat
  }
}
    `;
export const AuthorFragmentDoc = `
    fragment Author on Posts {
  author {
    email
    id
    name
  }
}
    `;
export const LikesFragmentDoc = `
    fragment Likes on Posts {
  likes {
    like_id
  }
}
    `;
export const UserAuthDocument = `
    mutation UserAuth($email: String!, $password: String!, $username: String) {
  signin(email: $email, password: $password, username: $username) {
    ... on AuthSuccess {
      token
    }
    ... on AuthError {
      error
    }
  }
}
    `;
export const useUserAuthMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UserAuthMutation, TError, UserAuthMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UserAuthMutation, TError, UserAuthMutationVariables, TContext>(
      ['UserAuth'],
      (variables?: UserAuthMutationVariables) => fetcher<UserAuthMutation, UserAuthMutationVariables>(client, UserAuthDocument, variables, headers)(),
      options
    );
export const HelloQueryDocument = `
    query HelloQuery {
  hello
}
    `;
export const useHelloQueryQuery = <
      TData = HelloQueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: HelloQueryQueryVariables,
      options?: UseQueryOptions<HelloQueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<HelloQueryQuery, TError, TData>(
      variables === undefined ? ['HelloQuery'] : ['HelloQuery', variables],
      fetcher<HelloQueryQuery, HelloQueryQueryVariables>(client, HelloQueryDocument, variables, headers),
      options
    );
export const CreateCommunityDocument = `
    mutation CreateCommunity($title: String!, $description: String) {
  createCommunity(title: $title, description: $description) {
    id
    title
    description
  }
}
    `;
export const useCreateCommunityMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommunityMutation, TError, CreateCommunityMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommunityMutation, TError, CreateCommunityMutationVariables, TContext>(
      ['CreateCommunity'],
      (variables?: CreateCommunityMutationVariables) => fetcher<CreateCommunityMutation, CreateCommunityMutationVariables>(client, CreateCommunityDocument, variables, headers)(),
      options
    );
export const CreatePostDocument = `
    mutation CreatePost($title: String!, $content: String, $communityId: String) {
  createPost(title: $title, content: $content, communityId: $communityId) {
    authorId
    content
    createdAt
    id
    title
    updatedAt
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['CreatePost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    );
export const UserCommunitiesDocument = `
    query UserCommunities($userId: String!) {
  userCommunities(user_id: $userId) {
    authorId
    communityId
    content
    createdAt
    id
    title
    updatedAt
  }
}
    `;
export const useUserCommunitiesQuery = <
      TData = UserCommunitiesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserCommunitiesQueryVariables,
      options?: UseQueryOptions<UserCommunitiesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserCommunitiesQuery, TError, TData>(
      ['UserCommunities', variables],
      fetcher<UserCommunitiesQuery, UserCommunitiesQueryVariables>(client, UserCommunitiesDocument, variables, headers),
      options
    );
export const UserLikedPostDocument = `
    query userLikedPost($postId: String!) {
  userLikedPost(postId: $postId) {
    like
  }
}
    `;
export const useUserLikedPostQuery = <
      TData = UserLikedPostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserLikedPostQueryVariables,
      options?: UseQueryOptions<UserLikedPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserLikedPostQuery, TError, TData>(
      ['userLikedPost', variables],
      fetcher<UserLikedPostQuery, UserLikedPostQueryVariables>(client, UserLikedPostDocument, variables, headers),
      options
    );
export const LikePostDocument = `
    mutation LikePost($postId: String!, $like: Boolean!) {
  likePost(postId: $postId, like: $like) {
    like
  }
}
    `;
export const useLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LikePostMutation, TError, LikePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
      ['LikePost'],
      (variables?: LikePostMutationVariables) => fetcher<LikePostMutation, LikePostMutationVariables>(client, LikePostDocument, variables, headers)(),
      options
    );
export const QueryCommunityDocument = `
    query QueryCommunity($communityId: String!, $includePosts: Boolean) {
  queryCommunity(communityId: $communityId, includePosts: $includePosts) {
    ... on CommunityDetails {
      id
      title
      description
      createdAt
    }
    ... on CommunityPosts {
      posts {
        content
        authorId
        title
        id
      }
    }
  }
}
    `;
export const useQueryCommunityQuery = <
      TData = QueryCommunityQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: QueryCommunityQueryVariables,
      options?: UseQueryOptions<QueryCommunityQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<QueryCommunityQuery, TError, TData>(
      ['QueryCommunity', variables],
      fetcher<QueryCommunityQuery, QueryCommunityQueryVariables>(client, QueryCommunityDocument, variables, headers),
      options
    );
export const QueryPostDocument = `
    query QueryPost($queryPostId: String!) {
  queryPost(id: $queryPostId) {
    authorId
    communityId
    content
    createdAt
    id
    title
  }
}
    `;
export const useQueryPostQuery = <
      TData = QueryPostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: QueryPostQueryVariables,
      options?: UseQueryOptions<QueryPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<QueryPostQuery, TError, TData>(
      ['QueryPost', variables],
      fetcher<QueryPostQuery, QueryPostQueryVariables>(client, QueryPostDocument, variables, headers),
      options
    );
export const CreateCommentDocument = `
    mutation CreateComment($postId: String!, $title: String!, $content: String, $communityId: String) {
  createComment(
    post_id: $postId
    title: $title
    content: $content
    communityId: $communityId
  ) {
    post_id
  }
}
    `;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['CreateComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    );
export const QueryCommunityPostsDocument = `
    query QueryCommunityPosts($communityId: String) {
  queryPosts(communityId: $communityId) {
    comment
    post_id
    type
    ...Author
    ...Content
    ...Flairs
    ...Community
    ...Likes
  }
}
    ${AuthorFragmentDoc}
${ContentFragmentDoc}
${FlairsFragmentDoc}
${CommunityFragmentDoc}
${LikesFragmentDoc}`;
export const useQueryCommunityPostsQuery = <
      TData = QueryCommunityPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: QueryCommunityPostsQueryVariables,
      options?: UseQueryOptions<QueryCommunityPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<QueryCommunityPostsQuery, TError, TData>(
      variables === undefined ? ['QueryCommunityPosts'] : ['QueryCommunityPosts', variables],
      fetcher<QueryCommunityPostsQuery, QueryCommunityPostsQueryVariables>(client, QueryCommunityPostsDocument, variables, headers),
      options
    );
export { fetcher }