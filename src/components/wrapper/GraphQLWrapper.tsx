"use client";

import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
} from "@apollo/client";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function GraphQLWrapper({ children }: Props) {
  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphQLWrapper;
