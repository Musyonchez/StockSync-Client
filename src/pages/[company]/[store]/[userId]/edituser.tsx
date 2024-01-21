// ... (previous imports)

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

// Define the GraphQL query for a single user
const GET_USER = gql`
query GetUser($id: String!, $company: String!, $type: String!) {
    user(id: $id, company: $company, type: $type) {
        id
      firstName
      lastName
      age
     
    }
  }
`;

const EDIT_USER = gql`
  mutation EditUser(
    $id: String!
    $firstName: String
    $lastName: String
    $age: Int
    $password: String
    $company: String!
    $type: String!
  ) {
    editUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      age: $age
      password: $password
      company: $company
      type: $type
    ) {
      id
      firstName
      lastName
      age
     
    }
  }
`;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
 
}

// Create a functional component to display a single user
const EditUser = () => {
  const [editUser] = useMutation(EDIT_USER);
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;
  const { userId } = router.query;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");


  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId, company: company, type: "users" },
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
          password,
          company: company,
          type: "users",
        },
      });

      // Handle the result as needed (e.g., show a success message)
      console.log("User edited successfully:", data.editUser);

      // Reset form values after successful submission
      setFirstName("");
      setLastName("");
      setAge(0);
      setPassword("");

      // Additional logic as needed after a successful edit
    } catch (error) {
      console.error("Error editing user:", firstName, error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit User</h2>
        </div>
        <div className="bg-white p-4 border rounded">
          <form onSubmit={handleSubmit}>
            {/* User ID */}
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

            {/* First Name */}
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

            {/* Last Name */}
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

            {/* Age */}
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

           

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter New Password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

           
            {/* Submit Button */}
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
