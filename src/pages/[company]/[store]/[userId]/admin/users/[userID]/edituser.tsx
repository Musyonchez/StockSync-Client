import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const GET_USER = gql`
  query GetUser($id: String!, $company: String!, $type: String!) {
    user(id: $id, company: $company, type: $type) {
      id
      firstName
      lastName
      age
      store1
      store2
      store3
      store4
      role
    }
  }
`;

const EDIT_USER = gql`
  mutation EditUser(
    $id: String!
    $firstName: String
    $lastName: String
    $age: Int
    $store1: Boolean
    $store2: Boolean
    $store3: Boolean
    $store4: Boolean
    $role: UserRole
    $company: String!
    $type: String!
  ) {
    editUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      age: $age
      store1: $store1
      store2: $store2
      store3: $store3
      store4: $store4
      role: $role
      company: $company
      type: $type
    ) {
      id
      firstName
      lastName
      age
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
  store1: boolean;
  store2: boolean;
  store3: boolean;
  store4: boolean;
  role: string;
}

const EditUser = () => {
  const [editUser] = useMutation(EDIT_USER);
  const router = useRouter();
  const { userId } = router.query;
  const { userID } = router.query;
  const { company } = router.query;
  const { store } = router.query;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [store1, setStore1] = useState(false);
  const [store2, setStore2] = useState(false);
  const [store3, setStore3] = useState(false);
  const [store4, setStore4] = useState(false);
  const [role, setRole] = useState("USER");

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userID, company: company, type: "users" },
  });

  if (loading)
    return (
      <Layout>
        <div className="container mx-auto p-4 flex justify-center items-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="container mx-auto p-4 bg-red-100 border-l-4 border-red-500">
          <p className="text-red-700">Error</p>
        </div>
      </Layout>
    );

  const user: User = data.user;

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <p className="text-yellow-700">No user could be found</p>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await editUser({
        variables: {
          id: userId,
          firstName,
          lastName,
          age,
          store1,
          store2,
          store3,
          store4,
          role,
          company: company,
          type: "users",
        },
      });


      setFirstName("");
      setLastName("");
      setAge(0);
      setStore1(false);
      setStore2(false);
      setStore3(false);
      setStore4(false);
      setRole("");
    } catch (error) {
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit User</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 border rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="id"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                User ID:
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={user.id}
                readOnly
                placeholder="Enter New User ID"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={user.firstName}
                readOnly
                placeholder="Enter First Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter New First Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={user.lastName}
                readOnly
                placeholder="Enter Last Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter New Last Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Age:
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={user.age}
                readOnly
                placeholder="Enter Age"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="age"
                id="age"
                value={age || ""}
                required
                onChange={(e) => setAge(parseInt(e.target.value, 10))}
                placeholder="Enter New Age"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="storePermissions"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Store Permissions:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="store1"
                  id="store1"
                  checked={store1}
                  onChange={() => setStore1(!store1)}
                />
                <label htmlFor="store1">Store 1</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="store2"
                  id="store2"
                  checked={store2}
                  onChange={() => setStore2(!store2)}
                />
                <label htmlFor="store2">Store 2</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="store3"
                  id="store3"
                  checked={store3}
                  onChange={() => setStore3(!store3)}
                />
                <label htmlFor="store3">Store 3</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="store4"
                  id="store4"
                  checked={store4}
                  onChange={() => setStore4(!store4)}
                />
                <label htmlFor="store4">Store 4</label>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                User Role:
              </label>
              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit User
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
