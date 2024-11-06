"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "@/graphql";
import Loader from "./Loader";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import { formatCurrency } from "@/helper";

function Transaction() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <Loader />;

  if(error) return <p>{error.message}</p>

  return (
    <>
      {data?.transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="w-full h-fit rounded-sm border border-carcoal p-2 text-carcoal divide-y-4"
        >
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">
              Type Transaksi: {transaction.type}
            </h1>
            {transaction.type == "DANA_MASUK" ? (
              <ArrowBigDownDash strokeWidth={1} color="" />
            ) : (
              <ArrowBigUpDash strokeWidth={1} color="red" />
            )}
          </div>
          <div className="flex justify-between items-center">
            <p>Deskripsi</p>
            <p className="italic text-xs line-clamp-1">
              {transaction.keterangan}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p>Jenis Transaksi</p>
            <p className="italic text-xs">
              {transaction.type == "DANA_MASUK" ? "masuk" : "keluar"}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p>{formatCurrency(transaction.nominal)}</p>
            <p className="italic text-xs">{"Jum'at"}, 21 Desember 2024</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Transaction;
