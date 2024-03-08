import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../../../../../../actions/users/fetchUser";
import { editUserRequest } from "../../../../../../../actions/users/editUser";
import { RootState } from "../../../../../../../store/reducers/reducers";
import Link from "next/link";
import { User, UserRole } from "../../../../../../../types/user";

import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const EditUser = () => {
  const router = useRouter();
  const userId = router.query?.userId as string;
  const company = router.query?.company as string; // Ensure company is always a string
  const store = router.query?.store as string;
  const userID = router.query?.userID as string;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    store1: false,
    store2: false,
    store3: false,
    store4: false,
    role: "USER",
  });

  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    store1: false,
    store2: false,
    store3: false,
    store4: false,
    role: "USER",
  });

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (userId === userID) {
      router.push(`/${company}/${store}/${userId}/admin/users`);
    }
    if (company && store) {
      dispatch(
        fetchUserRequest(userID as string, company as string, store as string)
      );
    }
  }, [dispatch, company, store, userID]);

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

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <p className="text-yellow-700">No user could be found</p>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("firstname", data.firstName);
    console.log("Initial Data:", initialData);
    console.log("Current Data:", data);

    const filterArray: { field: string; value: string }[] = [];

    Object.keys(data).forEach((key) => {
      const dataValue = data[key as keyof typeof data];
      const initialValue = initialData[key as keyof typeof initialData];

      // Special handling for boolean values and case sensitivity for strings
      if (typeof dataValue === "boolean" || typeof initialValue === "boolean") {
        if (dataValue !== initialValue) {
          filterArray.push({ field: key, value: dataValue.toString() });
        }
      } else if (
        typeof dataValue === "string" &&
        typeof initialValue === "string"
      ) {
        if (dataValue.toLowerCase() !== initialValue.toLowerCase()) {
          filterArray.push({ field: key, value: dataValue });
        }
      } else {
        // For other types, use strict equality check
        if (dataValue !== initialValue) {
          filterArray.push({ field: key, value: dataValue.toString() });
        }
      }
    });

    console.log("Form submitted with changes:", filterArray);

    if (company && store && userId && userID) {
      if (userId === userID) {
        router.push(`/${company}/${store}/${userId}/admin/users`);
      }
      dispatch(
        editUserRequest(
          user.id as string,
          company as string,
          store as string,
          filterArray
        )
      );
    }

    setData({
      firstName: "",
      lastName: "",
      store1: false,
      store2: false,
      store3: false,
      store4: false,
      role: "USER",
    });
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
                value={data.firstName}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    firstName: e.target.value,
                  }))
                }
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
                value={data.lastName}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    lastName: e.target.value,
                  }))
                }
                placeholder="Enter New Last Name"
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
                  checked={data.store1}
                  onChange={() =>
                    setData((prevData) => ({
                      ...prevData,
                      store1: !prevData.store1,
                    }))
                  }
                />
                <label htmlFor="store1">Store 1</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="store2"
                  id="store2"
                  checked={data.store2}
                  onChange={() =>
                    setData((prevData) => ({
                      ...prevData,
                      store2: !prevData.store2,
                    }))
                  }
                />
                <label htmlFor="store2">Store 2</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="store3"
                  id="store3"
                  checked={data.store3}
                  onChange={() =>
                    setData((prevData) => ({
                      ...prevData,
                      store3: !prevData.store3,
                    }))
                  }
                />
                <label htmlFor="store3">Store 3</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="store4"
                  id="store4"
                  checked={data.store4}
                  onChange={() =>
                    setData((prevData) => ({
                      ...prevData,
                      store4: !prevData.store4,
                    }))
                  }
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
                value={data.role}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    role: e.target.value as UserRole,
                  }))
                }
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
