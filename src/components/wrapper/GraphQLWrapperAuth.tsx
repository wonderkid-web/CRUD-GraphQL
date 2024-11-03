"use client";

import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { ReactNode } from "react";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};

function GraphQLWrapperAuth({ children }: Props) {
  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Toaster position="top-center" />
      <main className="flex justify-center items-center min-h-screen mx-auto md:max-w-lg md:border md:border-carcoal">
        {children}
      </main>
    </ApolloProvider>
  );
}

export default GraphQLWrapperAuth;
