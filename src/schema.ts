import { makeExecutableSchema } from '@graphql-tools/schema'
import type { GraphQLContext } from './context'
import type { Link } from '@prisma/client'

export const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
  }
  
  type Mutation {
    postLink(url: String!, description: String!): Link!
  }
  
  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (parent: unknown, args: {}, context: GraphQLContext) =>
      context.prisma.link.findMany()
  },
  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url
  },
  Mutation: {
    async postLink(
      parent: unknown,
      args: { description: string; url: string },
      context: GraphQLContext
    ) {
      const newLink = await context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      })
      return newLink
    }
  }
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions]
})
