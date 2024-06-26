import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../../../../actions/users/fetchUsers";
import { RootState } from "../../../../store/reducers/reducers";
import Link from "next/link";
import { User, Users } from "../../../../types/user"; // Import the Product type

import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";
interface DynamicRouteParams {
  store: string;
  userID: string;
}

const UserList: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;

  const take = 10;

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.data);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const [showError, setShowError] = useState(true);

  const totalProducts = useSelector((state: RootState) =>
  state.users.data.length > 0
    ? state.users.data[0].totalProducts
    : 0
);
const totalPages = Math.ceil(totalProducts as number / take);

const [currentPage, setCurrentPage] = useState(1);
const pagesToShow = 10; // Number of page buttons to show at a time

const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  }
};

  useEffect(() => {
    const newSkip = (currentPage - 1) * take;
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        fetchUsersRequest(
          company as string,
          store as string,
          take as number,
          newSkip        )
      );
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  }, [dispatch, company, store, take, currentPage]);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Users List</h2>
          <span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link href={`${router.asPath}/adduser`}>Add User</Link>
            </button>
          </span>
        </div>
        {Array.isArray(users) && users.length > 0 ? (
          <>
            <div>
              <ul>
                <li
                  className="mb-2 px-4 py-2 border rounded flex"
                  style={{ width: "1200px" }}
                >
                  <div className=" min-w-52">ID:</div>
                  <div className=" min-w-36">First Name:</div>
                  <div className=" min-w-36">Last Name:</div>
                  <div className=" min-w-72 overflow-hidden">Email:</div>
                  <div className=" min-w-20">Store 1:</div>
                  <div className=" min-w-20">Store 2:</div>
                  <div className=" min-w-20">Store 3:</div>
                  <div className=" min-w-20">Store 4:</div>
                  <div className=" min-w-28">Role:</div>
                </li>
                {users
                  .filter((user) => user.active)
                  .map((user) => (
                    <li
                      key={user.id}
                      className="mb-4 p-4 border rounded"
                      style={{ width: "1200px" }}
                    >
                      <Link
                        href={`${router.asPath}/${user.id}`}
                        className="text-blue-500 flex w-full"
                      >
                        <div className=" min-w-52">{user.id}</div>

                        <div className=" min-w-36">{user.firstName}</div>

                        <div className=" min-w-36">{user.lastName}</div>

                        <div className=" min-w-72 overflow-hidden">
                          {user.email}
                        </div>

                        <div className=" min-w-20">
                          {user.store1 ? "Yes" : "No"}
                        </div>

                        <div className=" min-w-20">
                          {user.store2 ? "Yes" : "No"}
                        </div>

                        <div className=" min-w-20">
                          {user.store3 ? "Yes" : "No"}
                        </div>

                        <div className=" min-w-20">
                          {user.store4 ? "Yes" : "No"}
                        </div>

                        <div className=" min-w-28">{user.role}</div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <ul>
                <h2 className=" text-red-600 font-bold text-xl py-2">
                  Deactivated
                </h2>
                <li
                  className="mb-2 px-4 py-2 border rounded flex"
                  style={{ width: "1200px" }}
                >
                  <div className=" min-w-52">ID:</div>
                  <div className=" min-w-36">First Name:</div>
                  <div className=" min-w-36">Last Name:</div>
                  <div className=" min-w-72 overflow-hidden">Email:</div>
                  <div className=" min-w-20">Store 1:</div>
                  <div className=" min-w-20">Store 2:</div>
                  <div className=" min-w-20">Store 3:</div>
                  <div className=" min-w-20">Store 4:</div>
                  <div className=" min-w-28">Role:</div>
                </li>
                {users
                  .filter((user) => !user.active)
                  .map((inactiveuser) => (
                    <>
                      <li
                        key={inactiveuser.id}
                        className="p-4 border rounded"
                        style={{ width: "1316px" }}
                      >
                        <Link
                          href={`${router.asPath}/${inactiveuser.id}`}
                          className="text-blue-500 flex w-full"
                        >
                          <div className=" min-w-52">{inactiveuser.id}</div>

                          <div className=" min-w-36">
                            {inactiveuser.firstName}
                          </div>

                          <div className=" min-w-36">
                            {inactiveuser.lastName}
                          </div>

                          <div className=" min-w-72 overflow-hidden">
                            {inactiveuser.email}
                          </div>

                          <div className=" min-w-20">
                            {inactiveuser.store1 ? "Yes" : "No"}
                          </div>

                          <div className=" min-w-20">
                            {inactiveuser.store2 ? "Yes" : "No"}
                          </div>

                          <div className=" min-w-20">
                            {inactiveuser.store3 ? "Yes" : "No"}
                          </div>

                          <div className=" min-w-20">
                            {inactiveuser.store4 ? "Yes" : "No"}
                          </div>

                          <div className=" min-w-28">{inactiveuser.role}</div>
                        </Link>
                      </li>
                    </>
                  ))}
              </ul>
            </div>
          </>
        ) : null}
      </div>
      <div className="fixed bottom-3 flex justify-center items-center ml-2">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => setCurrentPage(startPage + index)}
            className={`mx-2 ${
              currentPage === startPage + index ? "bg-blue-500 text-white" : ""
            }`}
          >
            {startPage + index}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
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

export default UserList;

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
