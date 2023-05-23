import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { GraphQLError } from "graphql";

export default async function context( { req, res }: ExpressContextFunctionArgument ) {

    return { req, res }
}