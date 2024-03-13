import React, { useEffect } from "react";
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

interface DynamicRouteParams {
  store: string;
  userID: string;
}

const UserList: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.data);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(fetchUsersRequest(company as string, store as string));
    } else {
      console.error(`User does not have access to ${store}.`);
    }
  }, [dispatch, company, store]);

  if (loading)
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
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </Layout>
    );

  if (error)
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
          <div className="bg-red-100 p-4 border-l-4 border-red-500">
            <p className="text-red-700">No users could be found</p>
          </div>
        </div>
      </Layout>
    );

  if (!users) {
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
          <div className="bg-yellow-100 p-4 border-l-4 border-yellow-500">
            <p className="text-yellow-700">No users could be found</p>
          </div>
        </div>
      </Layout>
    );
  }

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
    </Layout>
  );
};

export default UserList;


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

  const { store } = params as unknown as DynamicRouteParams;


  if (session.user.id !== "ADMIN") {
    return {
      redirect: {
        destination: `/${store}`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}