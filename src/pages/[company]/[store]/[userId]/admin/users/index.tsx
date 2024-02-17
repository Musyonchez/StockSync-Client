import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const GET_ALL_USERS = gql`
  query GetUsers($company: String!, $type: String!) {
    users(company: $company, type: $type) {
      id
      firstName
      lastName
      age
      email
      store1
      store2
      store3
      store4
      role
    }
  }
`;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  store1: boolean;
  store2: boolean;
  store3: boolean;
  store4: boolean;
  role: string;
}

function UserList() {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;

  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { company: company, type: "users" },
  });

  if (loading)
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Users List</h2>
            <span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/adduser`}>Add User</Link>
              </button>
            </span>
          </div>
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Users List</h2>
            <span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/adduser`}>Add User</Link>
              </button>
            </span>
          </div>
          <div className="bg-red-100 p-4 border-l-4 border-red-500">
            <p className="text-red-700">No users could be found</p>
          </div>
        </div>
      </Layout>
    );

  if (!data.users) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Users List</h2>
            <span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/adduser`}>Add User</Link>
              </button>
            </span>
          </div>
          <div className="bg-yellow-100 p-4 border-l-4 border-yellow-500">
            <p className="text-yellow-700">No users could be found</p>
          </div>
        </div>
      </Layout>
    );
  }

  const users: User[] = data.users;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Users List</h2>
          <span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link href={`${router.asPath}/adduser`}>Add User</Link>
            </button>
          </span>
        </div>

        <div>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-4 p-4 border rounded">
                <Link
                  href={`${router.asPath}/${user.id}`}
                  className="text-blue-500"
                >
                  <strong>ID:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.id}</span>
                  <br />
                  <strong>First Name:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.firstName}</span>
                  <br />
                  <strong>Last Name:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.lastName}</span>
                  <br />
                  <strong>Age:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.age}</span>
                  <br />
                  <strong>Email:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.email}</span>
                  <br />
                  <strong>Store 1:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.store1 ? "Yes" : "No"}</span>
                  <br />
                  <strong>Store 2:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.store2 ? "Yes" : "No"}</span>
                  <br />
                  <strong>Store 3:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.store3 ? "Yes" : "No"}</span>
                  <br />
                  <strong>Store 4:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.store4 ? "Yes" : "No"}</span>
                  <br />
                  <strong>Role:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default UserList;
