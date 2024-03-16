import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../../../../actions/users/fetchUser";
import { editUserRequest } from "../../../../../actions/users/editUser";
import { RootState } from "../../../../../store/reducers/reducers";
import Link from "next/link";
import { User, UserRole } from "../../../../../types/user";

import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import emptyUser from "../../../../../../public/emptyUser.jpeg";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";
import SuccessMessagePopup from "@/components/EventHandling/SuccessMessagePopup";
interface DynamicRouteParams {
  store: string;
  userID: string;
}

const EditUser = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;
  const company = session?.user?.company;
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

  const [profile, setProfile] = useState<File | null>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const userError = useSelector((state: RootState) => state.user.error);

  const editUser = useSelector((state: RootState) => state.edituser.data);
  const editLoading = useSelector((state: RootState) => state.edituser.loading);
  const editError = useSelector((state: RootState) => state.edituser.error);

  const [showCompanyError, setShowCompanyError] = useState(false);
  const [companyMessage, setCompanyMessage] = useState("");

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const [showUserError, setShowUserError] = useState(true);
  const [showEditUserError, setShowEditUserError] = useState(true);

  const [showImageError, setShowImageError] = useState(false);
  const [imageMessage, setImageMessage] = useState("");

  const [successImageMessage, setSuccessImageMessage] = useState("");
  const [showImageSuccess, setShowImageSuccess] = useState(false);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        fetchUserRequest(userID as string, company as string, store as string)
      );
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  }, [dispatch, company, store, userID]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    if (session?.user && (session.user as User)[store] === true && company) {
      if (userId === userID) {
        router.push(`/${store}/admin/users`);
      }
      dispatch(
        editUserRequest(
          user?.id as string,
          company as string,
          store as string,
          filterArray
        )
      );

      setData({
        firstName: "",
        lastName: "",
        store1: false,
        store2: false,
        store3: false,
        store4: false,
        role: "USER",
      });
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }

    try {
      if (profile) {
        const formData = new FormData();
        const newImageName = user?.id;

        // Append the file with the desired name
        formData.append("file", profile, newImageName);
        if (company) {
          formData.append("company", company);
        } else {
          // Handle the case where company is undefined
          // For example, you might want to skip appending it or provide a default value
          setCompanyMessage("Company is undefined, skipping append operation");
          setShowCompanyError(true);
        }
        const response = await fetch("https://stocksync-server.onrender.com/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          setImageMessage(errorMessage);
          setShowImageError(true);
        } else {
          setSuccessImageMessage("Upload successful");
          setShowImageSuccess(true);
        }
      }
    } catch (error) {
      setImageMessage("Error uploading image: " + (error as Error).message);
      setShowImageError(true);
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
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                User ID:
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={user?.id}
                readOnly
                placeholder="Enter New User ID"
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
                name="firstName"
                id="firstName"
                value={user?.firstName}
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
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={user?.lastName}
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
                htmlFor="email"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={user?.email}
                readOnly
                placeholder="Enter Email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="imageURL"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Image URL:
              </label>
              <img
                src={user?.imageURL}
                alt="Product Image"
                className="w-24 h-24"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                  (e.target as HTMLImageElement).src = emptyUser.src; // Corrected line
                }}
              />

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                name="imageURL"
                id="imageURL"
                onChange={(e) => setProfile(e.target.files?.[0] || null)}
                placeholder="Enter New Image URL"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="storePermissions"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                User Role:
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={user?.role}
                readOnly
                placeholder="Enter Role"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
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
      {userError && showUserError && (
        <ErrorMessagePopup
          message={userError}
          onClose={() => setShowUserError(false)}
        />
      )}
      {userLoading && <LoadingMessagePopup />}
      {editError && showEditUserError && (
        <ErrorMessagePopup
          message={editError}
          onClose={() => setShowEditUserError(false)}
        />
      )}
      {editLoading && <LoadingMessagePopup />}
      {showStoreError && (
        <ErrorMessagePopup
          message={storeMessage}
          onClose={() => setShowStoreError(false)}
        />
      )}

      {showCompanyError && (
        <ErrorMessagePopup
          message={companyMessage}
          onClose={() => setShowCompanyError(false)}
        />
      )}
      {showImageError && (
        <ErrorMessagePopup
          message={imageMessage}
          onClose={() => setShowImageError(false)}
        />
      )}
      {showImageSuccess && (
        <SuccessMessagePopup
          message={successImageMessage}
          onClose={() => setShowImageSuccess(false)}
        />
      )}
    </Layout>
  );
};

export default EditUser;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, params } = context;
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { store, userID } = params as unknown as DynamicRouteParams;

  if (session.user.role !== "ADMIN") {
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
