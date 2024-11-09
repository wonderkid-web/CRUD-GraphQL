// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { formatDate } from "@/helper";
import { transactionCollection } from "@/libs/firebase";
import { FormTransaksiType } from "@/types";
import { compareAsc } from "date-fns";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
        KHATIB
        NAZIR
      }

      type FirebaseTimeType {
        nanoseconds: Int!
        seconds: Int!
      }

      type User {
        name: String!
        age: Int!
      }

      type KhatibTime {
        oldest: String
        newest: String
      }

      type Transaction {
        keterangan: String!
        nominal: String!
        type: TipeTransaksiType!
        created_at: String!
        id: String!
        error: String
      }

      type ResponseDelete {
        success: Boolean!
        description: String!
      }

      type StatisticKhatib {
        totalKhatib: Int
      }

      type StatisticInfaq {
        totalInfaq: Int
      }

      type StatisticNazir {
        totalNazir: Int
      }

      type StatisticTotal {
        transaksiMasuk: Int
        transaksiKeluar: Int
        totalKas: Int
      }

      input DataTransaction {
        keterangan: String!
        nominal: String!
        type: TipeTransaksiType!
        created_at: String
        id: String
        error: String
      }

      type Query {
        users: [User]
        user(age: Int!): User
        transactions: [Transaction]
        transaction(id: String!): Transaction
        statisticKhatib: StatisticKhatib
        statisticInfaq: StatisticInfaq
        statisticNazir: StatisticNazir
        statisticTotal: StatisticTotal
        khatibTime: KhatibTime
      }

      type Mutation {
        deleteTransaction(id: String!): ResponseDelete
        createTransaction(form: DataTransaction): Transaction
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

        statisticTotal: async () => {
          const khatibData: FormTransaksiType[] = (
            await getDocs(transactionCollection)
          ).docs.map((d) => ({ ...d.data(), id: d.id } as FormTransaksiType));

          const transaksiMasuk = khatibData.filter(d=> d.type == "INFAQ").reduce(
            (acc, curr: FormTransaksiType) => {
              const nominalStr = curr.nominal.toString();
              const nominal = +nominalStr.replace(/\./g, "");
              return acc + nominal;
            },
            0
          );

          const transaksiKeluar = khatibData.filter(d=> d.type != "INFAQ").reduce(
            (acc, curr: FormTransaksiType) => {
              const nominalStr = curr.nominal.toString();
              const nominal = +nominalStr.replace(/\./g, "");
              return acc + nominal;
            },
            0
          );


          return { 
            transaksiMasuk,
            transaksiKeluar,
            totalKas: (transaksiMasuk - transaksiKeluar)
           };
        },

        statisticKhatib: async () => {
          const qKhatib = query(
            transactionCollection,
            where("type", "==", "KHATIB")
          );

          const khatibData: FormTransaksiType[] = (
            await getDocs(qKhatib)
          ).docs.map((d) => ({ ...d.data(), id: d.id } as FormTransaksiType));

          const totalKhatib = khatibData.reduce(
            (acc, curr: FormTransaksiType) => {
              const nominalStr = curr.nominal.toString();
              const nominal = +nominalStr.replace(/\./g, "");
              return acc + nominal;
            },
            0
          );

          return { totalKhatib };
        },

        statisticNazir: async () => {
          const qNazir = query(
            transactionCollection,
            where("type", "==", "NAZIR")
          );

          const nazirData: FormTransaksiType[] = (
            await getDocs(qNazir)
          ).docs.map((d) => ({ ...d.data(), id: d.id } as FormTransaksiType));

          const totalNazir = nazirData.reduce(
            (acc, curr: FormTransaksiType) => {
              const nominalStr = curr.nominal.toString();
              const nominal = +nominalStr.replace(/\./g, "");
              return acc + nominal;
            },
            0
          );

          return { totalNazir };
        },

        statisticInfaq: async () => {
          const qInfaq = query(
            transactionCollection,
            where("type", "==", "INFAQ")
          );

          const infaqData: FormTransaksiType[] = (
            await getDocs(qInfaq)
          ).docs.map((d) => ({ ...d.data(), id: d.id } as FormTransaksiType));

          const totalInfaq = infaqData.reduce(
            (acc, curr: FormTransaksiType) => {
              const nominalStr = curr.nominal.toString();
              const nominal = +nominalStr.replace(/\./g, "");
              return acc + nominal;
            },
            0
          );

          return { totalInfaq };
        },
        khatibTime: async () => {
          const qKhatib = query(
            transactionCollection,
            where("type", "==", "KHATIB")
          );

          const khatibTime: Date[] = (await getDocs(qKhatib)).docs.map(
            (d) => new Date(d.data().created_at)
          );

          const filter = khatibTime.sort(compareAsc);


          return {
            oldest: formatDate(filter[0]),
            newest: formatDate(filter[filter.length - 1]),
          };
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
        createTransaction: async (_, { form }) => {
          try {
            const newDoc = await addDoc(transactionCollection, form);

            return {
              ...form,
              id: newDoc.id,
              error: "",
            };
          } catch (error) {
            return {
              keterangan: "", // field default atau placeholder
              nominal: 0, // field default atau placeholder
              type: "unknown", // bisa diisi nilai default atau null
              created_at: "",
              id: "", // bisa diisi nilai default atau null
              error: `Gagal Menambahkan Transaksi: ${JSON.stringify(
                error,
                null,
                2
              )}`, // field tambahan untuk info error
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
