// Import necessary packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/reducers";
import { fetchTransactionsRequest } from "@/actions/records/transactions/fetchTransactions";
import {
  Transaction,
  TransactionDetail,
} from "../../../../types/transaction";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useSession } from "next-auth/react";
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

const Transactions = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const  company  = session?.user?.company;
  const store = router.query?.store as string;

  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.data
  );
  const loading = useSelector((state: RootState) => state.transactions.loading);
  const error = useSelector((state: RootState) => state.transactions.error);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(fetchTransactionsRequest(company as string, store as string));
    } else {
      console.error(`User does not have access to ${store}.`);
    }
  }, [dispatch, company, store]);

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

  if (!transactions) {
    return (
      <Layout>
        <div className="container mx-auto p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <p className="text-yellow-700">No product could be found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Transactions</h1>
        <ul>
          {transactions.map((transaction: Transaction) => (
            <li key={transaction.id} className="mb-8">
              <Link href={`${router.asPath}/${transaction.id}`}>
                <div className="bg-white p-6 shadow-md rounded-md">
                  <p className="text-lg font-semibold mb-2">
                    ID: {transaction.id}
                  </p>
                  <p>Created At: {transaction.createdAt}</p>
                  <p>Creator ID: {transaction.creatorId}</p>
                  <p>Creator Name: {transaction.creatorName}</p>
                  <p>Total Amount: {transaction.totalAmount}</p>
                  <ul className="mt-4">
                    <p className="text-lg font-semibold mb-2">Details</p>
                    {transaction.details.map((detail: TransactionDetail) => (
                      <li
                        key={detail.id}
                        className="mb-2 bg-white p-6 shadow-md rounded-md"
                      >
                        <p className="text-sm font-semibold">ID: {detail.id}</p>
                        <p>Name: {detail.name}</p>
                        <p>Category: {detail.category}</p>
                        <p>Current: {detail.current}</p>
                        <p>Unit Cost: {detail.unitCost}</p>
                        <p>Selling Price: {detail.sellingPrice}</p>
                        <p>Tax Information: {detail.taxInformation}</p>
                        <p>Supplier: {detail.supplier}</p>
                        <p>Quantity: {detail.quantity}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Transactions;


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
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
  return {
    props: { session },
  };
}