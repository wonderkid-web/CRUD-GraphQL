// @ts-ignore
// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from 'graphql-yoga';

type User  ={
  name: string
  age: number
}

const users = [
  {
      name: "Muhammad Wahyu Ramadhan",
      age: 21
  },
  {
      name: "Bilka Kembaren",
      age: 22
  },
  {
      name: "Raudhatul Jannah",
      age: 23
  },
  {
      name: "Azis Muhammad",
      age: 24
  },
]
const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `

      type User{
        name: String!,
        age: Int!
      }

      type Query {
        users: [User]
        user(age: Int!) : User
      }
        
    `,
    resolvers: {
      Query: {
        users: () : User[] => users,
        user: (_, {age}) => users.find(user=> user.age == age)
      },
    },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});


export { handleRequest as GET, handleRequest as POST };