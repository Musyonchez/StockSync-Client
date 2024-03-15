import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionRequest } from "@/actions/records/transactions/fetchTransaction";

import { RootState } from "../../../../../store/reducers/reducers";
import { TransactionDetail } from "../../../../../types/transaction";
import TransactionPreview from "@/components/DynamicSaasPages/MainContent/Transaction/TransactionPreview";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";

const Transaction = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const transactionId = router.query?.transactionId as string; // Ensure company is always a string

  const dispatch = useDispatch();
  const transaction = useSelector((state: RootState) => state.transaction.data);
  const loading = useSelector((state: RootState) => state.transaction.loading);
  const error = useSelector((state: RootState) => state.transaction.error);

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        fetchTransactionRequest(
          transactionId as string,
          company as string,
          store as string
        )
      );
    } else {
      console.error(`User does not have access to ${store}.`);
    }
  }, [dispatch, company, store, transactionId]);


  return (
    <Layout>
      <div className="container dark:bg-black dark:text-white mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Transaction</h1>
        <ul>
          <li key={transaction?.id} className="mb-8">
            <div className="bg-white dark:bg-gray-900 p-6 shadow-md rounded-md">
              <p className="text-lg font-semibold mb-2">ID: {transaction?.id}</p>
              <p>Created At: {transaction?.createdAt}</p>
              <p>Creator ID: {transaction?.creatorId}</p>
              <p>Creator Name: {transaction?.creatorName}</p>
              <p>Total Amount: {transaction?.totalAmount}</p>

              {/* Loop through details array */}
              <ul className="mt-4">
                <p className="text-lg font-semibold mb-2">Details</p>
                {transaction?.details.map((detail: TransactionDetail) => (
                  <li
                    key={detail.id}
                    className="mb-2 dark:bg-gray-800 bg-white p-6 shadow-md rounded-md"
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
          </li>
        </ul>
        <TransactionPreview
          transactionData={{
            companyLogo: session?.user?.companyLogo ?? "",
            id: transaction?.id ?? "",
            createdAt: transaction?.createdAt ?? "",
            creatorId: transaction?.creatorId ?? "",
            creatorName: transaction?.creatorName ?? "",
            totalAmount: transaction?.totalAmount ?? 0,
            details: transaction?.details.map((detail: TransactionDetail) => ({
              id: detail.id,
              name: detail.name,
              category: detail.category,
              current: detail.current,
              unitCost: detail.unitCost,
              sellingPrice: detail.sellingPrice,
              taxInformation: detail.taxInformation,
              supplier: detail.supplier,
              quantity: detail.quantity,
            })) ?? [],
          }}
        />
      </div>
      {error && showError && (
        <ErrorMessagePopup
          message={error}
          onClose={() => setShowError(false)}
        />
      )}
      {loading && <LoadingMessagePopup />}
    </Layout>
  );
};

export default Transaction;

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
