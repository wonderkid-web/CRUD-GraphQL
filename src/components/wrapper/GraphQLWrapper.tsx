"use client";

import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { ReactNode } from "react";
import Navbar from "../Navbar";

type Props = {
  children: ReactNode;
};

function GraphQLWrapper({ children }: Props) {
  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <main className="grid grid-rows-[1fr_1fr_4rem] min-h-screen">
        <section className="row-start-1 row-end-3">{children}</section>
        <Navbar />
      </main>
    </ApolloProvider>
  );
}

export default GraphQLWrapper;
