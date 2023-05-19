import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

export const queryClient = new QueryClient();

export const client = new GraphQLClient( "/api/graphiql" );

export function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
    return async (): Promise<TData> => client.request({
      document: query,
      variables,
      requestHeaders
    });
  }