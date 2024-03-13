import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../../../../actions/users/fetchUser";
import { deleteUserRequest } from "../../../../../actions/users/deleteUser";
import { RootState } from "../../../../../store/reducers/reducers";
import Link from "next/link";
// import { User } from "../../../../../../../types/user"
import emptyUser from "../../../../../../public/emptyUser.jpeg";

import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";
import { deactivateUserRequest } from "@/actions/users/deactivateUser";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

interface DynamicRouteParams {
  company: string;
  store: string;
  userId: string;
  userID: string;
}

const UserDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const userID = router.query?.userID as string;
  const userId = session?.user?.id;
  const [isActiveButtonActive, setIsActiveButtonActive] = useState(true);
  const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        fetchUserRequest(userID as string, company as string, store as string)
      );
    } else {
      console.error(`User does not have access to ${store}.`);
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

  const handleDeactivate = async () => {
    setIsActiveButtonActive(false);

    try {
      if (session?.user && (session.user as User)[store] === true && company) {
        dispatch(
          deactivateUserRequest(
            userID,
            company,
            store // Assuming 'store' is the correct variable for the user type
          )
        );

        // Use router.push to navigate to the new URL structure
        router.push(`/${store}/admin/users/`).then(() => {
          window.location.reload();
        });
      } else {
        console.error(`User does not have access to ${store}.`);
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    setIsDeleteButtonActive(false);

    try {
      if (session?.user && (session.user as User)[store] === true && company) {
        if (user.firstRecordAction === false) {
          dispatch(
            deleteUserRequest(
              userID,
              company,
              store // Assuming 'store' is the correct variable for the user type
            )
          );

          // Use router.push to navigate to the new URL structure
          router.push(`/${store}/admin/users/`).then(() => {
            window.location.reload();
          });
        } else {
          throw new Error("User has a transaction hence can't delete");
        }
      } else {
        console.error(`User does not have access to ${store}.`);
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      // Handle the error as needed
    }
  };

  const handleActivate = async () => {
    setIsActiveButtonActive(false);
    try {
      if (session?.user && (session.user as User)[store] === true && company) {
        dispatch(
          deactivateUserRequest(
            userID,
            company,
            store // Assuming 'store' is the correct variable for the user type
          )
        );

        // Use router.push to navigate to the new URL structure
        router.push(`/${store}/admin/users/`).then(() => {
          window.location.reload();
        });
      } else {
        console.error(`User does not have access to ${store}.`);
      }
    } catch (error) {}
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
              onClick={user.active ? handleDeactivate : handleActivate}
              className={`${
                isActiveButtonActive
                  ? user.active
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-4 py-2 rounded`}
              disabled={!isActiveButtonActive}
            >
              {user.active
                ? isActiveButtonActive
                  ? "Deactivate"
                  : "Deactivating..."
                : isActiveButtonActive
                ? "Activate"
                : "Activating"}
            </button>

            {!user.active && (
              <button
                onClick={handleDelete}
                className={`${
                  isDeleteButtonActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white px-4 py-2 rounded`}
                disabled={!isDeleteButtonActive}
              >
                {isDeleteButtonActive ? "Delete" : "Deleting..."}
              </button>
            )}
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 border rounded">
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
              className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
              className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
              htmlFor="email"
              className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                  htmlFor="profile"
                  className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
                >
                  Profile:
                </label>
                <img
                  src={user.imageURL}
                  alt="User Profile"
                  className="w-24 h-24"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                    (e.target as HTMLImageElement).src = emptyUser.src; // Corrected line
                  }}
                />
              </div>

          <div className="mb-4">
            <label
              htmlFor="stores"
              className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
              className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, params } = context;
  const session = await getSession({ req });

  console.log("Server-side session:", session); // Add this line for debugging

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { store, userID } = params as unknown as DynamicRouteParams;

  if (session.user.id !== "ADMIN") {
    return {
      redirect: {
        destination: `/${store}/dashboard`,
        permanent: false,
      },
    };
  }

  // Check if the user IDs match
  if (userID === session.user.id) {
    return {
      redirect: {
        destination: `/${store}/admin/users`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
