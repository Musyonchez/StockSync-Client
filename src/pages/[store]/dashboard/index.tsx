import Layout from "@/components/DynamicSaasPages/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../../actions/users/fetchUser";
import { RootState } from "../../../store/reducers/reducers";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";

const Index = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const userId = session?.user?.id;
  const [greeting, setGreeting] = useState("");
  const store = "users";
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.data);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    if (session?.user && company) {
      dispatch(
        fetchUserRequest(userId as string, company as string, store as string)
      );
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  }, [dispatch, company, store, userId, router]);

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <div className=" flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-6">
            {greeting}, {user?.firstName}
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-950 p-8 border rounded shadow-lg mt-6">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">ID:</strong>
              <p className="text-gray-800 dark:text-gray-300">{user?.id}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                First Name:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">
                {user?.firstName}
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                Last Name:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">
                {user?.lastName}
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                Email:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">{user?.email}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                Store 1:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">
                {user?.store1 ? "Yes" : "No"}
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                Store 2:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">
                {user?.store2 ? "Yes" : "No"}
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                Store 3:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">
                {user?.store3 ? "Yes" : "No"}
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                Store 4:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">
                {user?.store4 ? "Yes" : "No"}
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                Company:
              </strong>
              <p className="text-gray-800 dark:text-gray-300 capitalize">
                {user?.company}
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">
                Role:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
      {error && showError && (
        <ErrorMessagePopup
          message={error}
          onClose={() => setShowError(false)}
        />
      )}
      {loading && <LoadingMessagePopup />}
      {showStoreError && (
        <ErrorMessagePopup
          message={storeMessage}
          onClose={() => setShowStoreError(false)}
        />
      )}
    </Layout>
  );
};

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  console.log("user session", session)

  // if (!session?.user) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: { session },
  };
}
