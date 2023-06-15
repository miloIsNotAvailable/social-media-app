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

export type Community = {
  __typename?: 'Community';
  communities?: Maybe<Array<Maybe<UsersCommunitiesBridge>>>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Like = {
  __typename?: 'Like';
  id?: Maybe<Scalars['String']>;
  like?: Maybe<Scalars['Boolean']>;
  postId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCommunity?: Maybe<Community>;
  createPost?: Maybe<Post>;
  likePost?: Maybe<Like>;
  signin?: Maybe<Auth>;
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

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  userCommunities?: Maybe<Array<Maybe<Post>>>;
  userLikedPost?: Maybe<Like>;
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
};

/** Mapping of union parent types */
export type ResolversUnionParentTypes = {
  Auth: ( AuthError ) | ( AuthSuccess );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auth: ResolverTypeWrapper<ResolversUnionTypes['Auth']>;
  AuthError: ResolverTypeWrapper<AuthError>;
  AuthSuccess: ResolverTypeWrapper<AuthSuccess>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Community: ResolverTypeWrapper<Community>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Like: ResolverTypeWrapper<Like>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
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
  Community: Community;
  Int: Scalars['Int'];
  Like: Like;
  Mutation: {};
  Post: Post;
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

export type CommunityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']> = {
  communities?: Resolver<Maybe<Array<Maybe<ResolversTypes['UsersCommunitiesBridge']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  like?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  postId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCommunity?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<MutationCreateCommunityArgs, 'title'>>;
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'title'>>;
  likePost?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<MutationLikePostArgs, 'like' | 'postId'>>;
  signin?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationSigninArgs, 'email' | 'password'>>;
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  Community?: CommunityResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
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
export { fetcher }