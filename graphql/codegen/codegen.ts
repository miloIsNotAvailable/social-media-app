import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:5173/api/graphiql',
  documents: ['./**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './graphql/codegen/gql/gql.ts': {
        plugins: [
            'typescript', 
            'typescript-resolvers', 
            'typescript-operations', 
            'typescript-react-query'
        ],
        config: {
            preset: "client",
            fetcher: 'graphql-request',
            useImplementingTypes: true
        },
    }
  },
  hooks: {
    afterAllFileWrite: [ 
        // replace graphql-request/dist/types.dom with graphql-request/src/types
        "bash -c \"sed -i 's/graphql-request\\/dist\\/types\\.dom\/graphql-request\\/src\\/types/g' ./graphql/codegen/gql/gql.ts\"",
        // replace RequestInit with GraphQLClientRequestHeaders
        "bash -c \"sed -i 's/\{ RequestInit \\} /\{ GraphQLClientRequestHeaders \}/g' ./graphql/codegen/gql/gql.ts\"",
    ]
  }
}
 
export default config