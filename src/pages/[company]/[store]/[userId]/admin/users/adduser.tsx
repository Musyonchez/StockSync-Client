import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserRequest } from "../../../../../../actions/users/addUser";
import { RootState } from "../../../../../../store/reducers/reducers";
import Link from "next/link";
// import { User } from "../../../../../../../types/user"
import { UserRole } from '../../../../../../types/user';

import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const AddUser = () => {
  const router = useRouter();
  const company = router.query?.company as string; // Ensure company is always a string
  const store = router.query?.store as string;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [store1, setStore1] = useState(false);
  const [store2, setStore2] = useState(false);
  const [store3, setStore3] = useState(false);
  const [store4, setStore4] = useState(false);
  const [role, setRole] = useState<UserRole>("USER"); // Use UserRole type here

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.adduser.data);
  const loading = useSelector((state: RootState) => state.adduser.loading);
  const error = useSelector((state: RootState) => state.adduser.error);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(
        addUserRequest(
          firstName,
          lastName,
          email,
          password,
          store1,
          store2,
          store3,
          store4,
          role,
          company,
          store
        )
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setStore1(false);
      setStore2(false);
      setStore3(false);
      setStore4(false);
      setRole("USER");
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-md w-full mx-auto px-4 pb-4 dark:bg-gray-800 min-h-screen bg-white rounded shadow-md">
          <h1 className="flex w-full text-2xl font-bold my-4 justify-center">
            Add User
          </h1>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setRole(e.target.value as UserRole)}
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
              Add User
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddUser;
