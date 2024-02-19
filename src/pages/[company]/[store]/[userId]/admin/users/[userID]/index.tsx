import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchuserRequest } from "../../../../../../../actions/userActions";
import { RootState } from "../../../../../../../store/reducers";
import Link from "next/link";
import { Users } from "../../../../../../../types/user"; // Import the Product type

import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useMutation, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";




const DELETE_USER = gql`
  mutation DeleteUser($id: String!, $company: String!, $type: String!) {
    deleteUser(id: $id, company: $company, type: $type) {
      id
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

const UserDetail = () => {
  const [deleteUser] = useMutation(DELETE_USER);
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;
  const { userID } = router.query;
  const { userId } = router.query;
  const { pathname, query } = router;
  const [isButtonActive, setIsButtonActive] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  
  useEffect(() => {
    if (userId === userID) {
      router.push(`/${company}/${store}/${userId}/admin/users`);
    }
    if (company && store) {
      dispatch(fetchuserRequest( userID as string, company as string, store as string));
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

  const handleDelete = async () => {
    setIsButtonActive(false);

    try {
      const { data } = await deleteUser({
        variables: { id: userID, company: company, type: "users" },
      });

      router.push(`/${company}/${store}/${userId}/admin/users`).then(() => {
        window.location.reload();
      });

    } catch (error) {
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">User Details</h2>
          <span className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link href={`${router.asPath}/edituser`}>Edit</Link>
            </button>
            <button
              onClick={handleDelete}
              className={`${
                isButtonActive
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-4 py-2 rounded`}
              disabled={!isButtonActive}
            >
              {isButtonActive ? "Delete" : "Deleting..."}
            </button>
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 border rounded">
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              User ID:
            </label>
            <input
              type="text"
              id="userId"
              value={user.id}
              readOnly
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
              id="firstName"
              value={user.firstName}
              readOnly
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
              id="lastName"
              value={user.lastName}
              readOnly
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
              id="age"
              value={user.age}
              readOnly
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
              id="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="stores"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Stores:
            </label>
            <div className=" flex flex-col justify-center space-1-2">
              <span>Store 1: {user.store1 ? "Yes" : "No"}</span>
              <span>Store 2: {user.store2 ? "Yes" : "No"}</span>
              <span>Store 3: {user.store3 ? "Yes" : "No"}</span>
              <span>Store 4: {user.store4 ? "Yes" : "No"}</span>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Role:
            </label>
            <input
              type="text"
              id="role"
              value={user.role}
              readOnly
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetail;
