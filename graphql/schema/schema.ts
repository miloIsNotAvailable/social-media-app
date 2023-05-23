import fs from 'fs'
import path from 'path'
import { buildSchema } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { root } from '../resolvers/resolvers'
import { authDirectiveTransformer } from '../directives/authDirective'

const schemaPath = path.join( process.cwd(), "/graphql/schema/graphql-schema.graphql" )
const readSchema = fs.readFileSync( schemaPath, "utf-8" )

export const schema = buildSchema( readSchema )

let schema_ = makeExecutableSchema({
    typeDefs: schema,
    resolvers: root,
  })

schema_ = authDirectiveTransformer( schema_ )

export { schema_ }