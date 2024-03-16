import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserRequest } from "../../../../actions/users/addUser";
import { RootState } from "../../../../store/reducers/reducers";
import Link from "next/link";
import { User, UserRole } from "../../../../types/user";

import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

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

const AddUser = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
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

  const [showImageError, setShowImageError] = useState(false);
  const [imageMessage, setImageMessage] = useState("");
  
  const [successImageMessage, setSuccessImageMessage] = useState("");
  const [showImageSuccess, setShowImageSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState<File | null>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.adduser.data);
  const loading = useSelector((state: RootState) => state.adduser.loading);
  const error = useSelector((state: RootState) => state.adduser.error);

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const [showError, setShowError] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (session?.user && (session.user as User)[store] === true && company) {
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
      } else {
        setStoreMessage(`User does not have access to ${store}.`);
        setShowStoreError(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (profile && user) {
      // Once product data is available, proceed with image upload
      handleImageUpload();
    }
  }, [user]);

  const handleImageUpload = async () => {
    try {
      if (profile && user) {
        const formData = new FormData();
        const newImageName = user.id;

        // Append the file with the desired name
        formData.append("file", profile, newImageName);

        if (company) {
          formData.append("company", company);
        } else {
          // Handle the case where company is undefined
          // For example, you might want to skip appending it or provide a default value
          setImageMessage("Company is undefined, skipping append operation");
          setShowImageError(true);
        }

        const response = await fetch(process.env.SERVER_PUBLIC_URL_UPLOAD || "http://localhost:5000/upload", {
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
      <div className="w-full flex justify-center items-center">
        <div className="max-w-md w-full mx-auto px-4 pb-4 dark:bg-gray-800 min-h-screen bg-white rounded shadow-md">
          <h1 className="flex w-full text-2xl font-bold my-4 justify-center">
            Add User
          </h1>
          <form onSubmit={handleSubmit}>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
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
                htmlFor="image"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Profile Image:
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                name="image"
                id="image"
                onChange={(e) => setProfile(e.target.files?.[0] || null)}
                placeholder="Enter Product Image"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Password:
              </label>
              <div className=" relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold dark:text-white text-gray-600 mb-1">
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
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
      {error && showError && (
        <ErrorMessagePopup
          message={error}
          onClose={() => setShowError(false)}
        />
      )}
      {loading && <LoadingMessagePopup />}
      {showImageError && (
        <ErrorMessagePopup
          message={imageMessage}
          onClose={() => setShowImageError(false)}
        />
      )}
        {showStoreError && (
        <ErrorMessagePopup
          message={storeMessage}
          onClose={() => setShowStoreError(false)}
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

export default AddUser;

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

  const { store } = params as unknown as DynamicRouteParams;

  if (session.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: `/${store}/dashboard`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
