import { makeExecutableSchema } from '@graphql-tools/schema'

export const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
  }
`

export const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions]
})
