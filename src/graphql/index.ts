import { TransactionsGraphType } from "@/types";
import { gql, TypedDocumentNode } from "@apollo/client";



export const GET_TRANSACTIONS : TypedDocumentNode<TransactionsGraphType> = gql`
    query GetAllTransactions{
        transactions{
            keterangan
            nominal
            type
            created_at{
                seconds
                nanoseconds
            }
            id
        }
    }
`