import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:5173/api/graphiql',
  documents: [ "./graphql/**/*.graphql" ],
  ignoreNoDocuments: true,
  generates: {
    './graphql/codegen/gql/gql.ts': {
        plugins: [
            'typescript', 
            'typescript-resolvers', 
            'typescript-operations', 
            'typescript-react-query',
            {
              'add': {
                placement: "append",
                content: "export { fetcher }"
              }
            }
        ],
        config: {
            preset: "client",
            fetcher: 'graphql-request',
            useImplementingTypes: true,
            isReactHook: true
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