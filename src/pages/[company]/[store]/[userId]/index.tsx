import Layout from "@/components/DynamicSaasPages/Layout";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../../../actions/userActions";
import { RootState } from "../../../../store/reducers/reducers";
import Link from "next/link";



const Index = () => {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;
  const { data: session } = useSession();
  const { userId } = router.query;
  const [greeting, setGreeting] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.data);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    if (company && store) {
      dispatch(
        fetchUserRequest(userId as string, company as string, store as string)
      );
    }

  }, [dispatch, company, store, userId]);


  return (
    <Layout>
      <div className="container mx-auto p-8">
        <div className=" flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-6">
            {greeting}, {user?.firstName}
          </h1>
          <span className=" flex text-xl">
            <Link href={`${router.asPath}/edituser`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <p>Edit</p>
            </Link>
          </span>
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
                Last Name:
              </strong>
              <p className="text-gray-800 dark:text-gray-300">
                {user?.lastName}
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <strong className="text-gray-600 dark:text-gray-200">Age:</strong>
              <p className="text-gray-800 dark:text-gray-300">{user?.age}</p>
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
    </Layout>
  );
};

export default Index;
