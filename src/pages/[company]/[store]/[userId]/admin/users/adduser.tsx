import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Layout from "@/components/DynamicSaasPages/Layout";
import { useRouter } from "next/router";

const ADD_USER = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $age: Int!
    $email: String!
    $password: String!
    $store1: Boolean!
    $store2: Boolean!
    $store3: Boolean!
    $store4: Boolean!
    $role: UserRole!
    $company: String!
    $type: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      age: $age
      email: $email
      password: $password
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
      email
      store1
      store2
      store3
      store4
      role
    }
  }
`;

const AddUser = () => {
  const [addUser] = useMutation(ADD_USER);
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;

  // State to manage form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [store1, setStore1] = useState(false);
  const [store2, setStore2] = useState(false);
  const [store3, setStore3] = useState(false);
  const [store4, setStore4] = useState(false);
  const [role, setRole] = useState("USER");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
          firstName,
          lastName,
          age,
          email,
          password,
          store1,
          store2,
          store3,
          store4,
          role,
          company: company,
          type: "users",
        },
      });

      // Reset form values after successful submission
      setFirstName("");
      setLastName("");
      setAge(0);
      setEmail("");
      setPassword("");
      setStore1(false);
      setStore2(false);
      setStore3(false);
      setStore4(false);
      setRole("USER");

      // Handle the result as needed (e.g., show a success message)
      console.log("User added successfully:", data.addUser);
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <Layout>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-md w-full mx-auto px-4 pb-4 bg-white rounded shadow-md">
          <h1 className="flex w-full text-2xl font-bold my-4 justify-center">
            Add User
          </h1>
          <form onSubmit={handleSubmit}>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
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
                value={age || ""}
                onChange={(e) => setAge(parseInt(e.target.value, 10))}
                placeholder="Enter Age"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Store Checkboxes */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Stores:
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="store1"
                    name="store1"
                    checked={store1}
                    onChange={() => setStore1(!store1)}
                    className="mr-2"
                  />
                  <label htmlFor="store1">Store 1</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="store2"
                    name="store2"
                    checked={store2}
                    onChange={() => setStore2(!store2)}
                    className="mr-2"
                  />
                  <label htmlFor="store2">Store 2</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="store3"
                    name="store3"
                    checked={store3}
                    onChange={() => setStore3(!store3)}
                    className="mr-2"
                  />
                  <label htmlFor="store3">Store 3</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="store4"
                    name="store4"
                    checked={store4}
                    onChange={() => setStore4(!store4)}
                    className="mr-2"
                  />
                  <label htmlFor="store4">Store 4</label>
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Role:
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
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddUser;
