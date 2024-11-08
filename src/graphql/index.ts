import { TransactionsGraphType } from "@/types";
import { gql, TypedDocumentNode } from "@apollo/client";

export const GET_TRANSACTIONS: TypedDocumentNode<TransactionsGraphType> = gql`
  query GetAllTransactions {
    transactions {
      keterangan
      nominal
      type
      created_at
      id
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id) {
      success
      description
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($form: DataTransaction!) {
    createTransaction(form: $form) {
      id
      keterangan
      nominal
      type
      created_at
      error
    }
  }
`;

export const GET_STATISTIC_KHATIB = gql`
  query GetStatisticKhatib {
    statisticKhatib {
      totalKhatib
    }
  }
`;
export const GET_STATISTIC_NAZIR = gql`
  query GetStatisticNazir {
    statisticNazir {
      totalNazir
    }
  }
`;
export const GET_STATISTIC_INFAQ = gql`
  query GetStatisticInfaq {
    statisticInfaq {
      totalInfaq
    }
  }
`;
export const GET_STATISTIC_TOTAL = gql`
  query GetStatisticTotal {
    statisticTotal {
      totalStatistic
    }
  }
`;
