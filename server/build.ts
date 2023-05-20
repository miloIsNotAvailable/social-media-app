import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  ApolloServerPluginLandingPageLocalDefault,
} from "@apollo/server/plugin/landingPage/default";
import express from "express";
import http from "http";
import { root } from "../graphql/resolvers/resolvers";
import { schema, schema_ } from "../graphql/schema/schema";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground' 

export const app = express();
export const httpServer = http.createServer(app);

const ApolloServerLandingPage = () =>
//   process.env.NODE_ENV === "production"
// ? ApolloServerPluginLandingPageProductionDefault({
//         embed: true,
//         graphRef: "ecommerce-stuff@current",
//         includeCookies: true,
//       })
//     : 
    ApolloServerPluginLandingPageLocalDefault({
        includeCookies: true,
        embed: true,
      });

export const server = new ApolloServer<any>({
  typeDefs: schema,
  schema: schema_ as any,
  resolvers: root,
  
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // ApolloServerPluginLandingPageGraphQLPlayground(),
    ApolloServerLandingPage(),
  ],
});
