// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { transactionCollection } from "@/libs/firebase";
import { FormTransaksiType } from "@/types";
import { deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { createSchema, createYoga } from "graphql-yoga";

type User = {
  name: string;
  age: number;
};

const users = [
  {
    name: "Muhammad Wahyu Ramadhan",
    age: 21,
  },
  {
    name: "Bilka Kembaren",
    age: 22,
  },
  {
    name: "Raudhatul Jannah",
    age: 23,
  },
  {
    name: "Azis Muhammad",
    age: 24,
  },
];

const { handleRequest }: { handleRequest: any } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      enum TipeTransaksiType {
        INFAQ
        JUMAT
        NAZIR
        DANA_MASUK
      }

      type FirebaseTimeType {
        nanoseconds: Int!
        seconds: Int!
      }

      type User {
        name: String!
        age: Int!
      }

      type Transaction {
        keterangan: String!
        nominal: Int!
        type: TipeTransaksiType!
        created_at: FirebaseTimeType!
        id: String!
      }

      type ResponseDelete {
        success: Boolean!
        description: String!
      }

      type Query {
        users: [User]
        user(age: Int!): User
        transactions: [Transaction]
        transaction(id: String!): Transaction
      }

      type Mutation {
        deleteTransaction(id: String!): ResponseDelete
      }
    `,

    resolvers: {
      Query: {
        users: (): User[] => users,
        user: (_, { age }) => users.find((user) => user.age == age),
        transactions: async (): Promise<FormTransaksiType[]> => {
          const rawTransaction = await getDocs(transactionCollection);
          return rawTransaction.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as FormTransaksiType)
          );
        },
        transaction: async (_, { id }) => {
          const docRef = doc(transactionCollection, id);
          const transaction = await getDoc(docRef);

          return transaction;
        },
      },
      Mutation: {
        deleteTransaction: async (_, { id }) => {
          const docRef = doc(transactionCollection, id);
          try {
            await deleteDoc(docRef);

            return {
              success: true,
              description: "Dokumen Berhasil dihapus",
            };
          } catch (error) {
            return {
              success: false,
              description: `Dokumen gagal dihapus: ${error}`,
            };
          }
        },
      },
    },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
