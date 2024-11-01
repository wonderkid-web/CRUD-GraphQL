"use client";

import { gql, TypedDocumentNode, useLazyQuery, useQuery } from "@apollo/client";

type User = {
  user: {
    name: string;
    age: number;
  };
};

type Users = {
  users: {
    name: string;
    age: number;
  }[];
};

const GET_ALL_USERS: TypedDocumentNode<Users> = gql`
  query GetAllUsers {
    users {
      name
      age
    }
  }
`;

const GET_SPES_USER: TypedDocumentNode<User, { age: number }> = gql`
  query GetSpessUser($age: Int!) {
    user(age: $age) {
      name
      age
    }
  }
`;

function Page() {
  const { data, loading } = useQuery(GET_ALL_USERS);
  const [fetchUser, { data: spesData, loading: spesLoad, error }] =
    useLazyQuery(GET_SPES_USER);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="flex gap-8">
      <div className="p-8 flex gap-2 flex-col pl-8 border-l-4">
        {data?.users.map((d) => (
          <p
            className="cursor-pointer"
            onClick={() => fetchUser({ variables: { age: +d.age } })}
            key={d.age}
          >
            {d.name} | {d.age}{" "}
          </p>
        ))}
      </div>
      <div>
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {spesLoad && <h1>Loading....</h1>}
        <h1 className="mt-8">{spesData && <>{spesData.user.name} | {spesData.user.age}</>}</h1>
      </div>
    </div>
  );
}

export default Page;
