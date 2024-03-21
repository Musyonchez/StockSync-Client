// Import necessary packages
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/reducers";
import { fetchTransactionsRequest } from "@/actions/records/transactions/fetchTransactions";
import { Transaction, TransactionDetail } from "../../../../types/transaction";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";

const Transactions = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;

  const take = 2;

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.data
  );
  const loading = useSelector((state: RootState) => state.transactions.loading);
  const error = useSelector((state: RootState) => state.transactions.error);

  const [showError, setShowError] = useState(true);

  const totalProducts = useSelector((state: RootState) =>
    state.transactions.data.length > 0
      ? state.transactions.data[0].totalProducts
      : 0
  );
  const totalPages = Math.ceil(totalProducts / take);
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
        fetchTransactionsRequest(
          company as string,
          store as string,
          take as number,
          newSkip
        )
      );
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  }, [dispatch, company, store, take, currentPage]);

  return (
    <Layout>
      <div className="container min-h-screen mx-auto dark:bg-black dark:text-white px-4 pt-2 pb-7">
        <h1 className="text-3xl font-semibold mb-4">Transactions</h1>
        <ul>
          {transactions.map((transaction: Transaction) => (
            <li key={transaction.id} className="mb-8">
              <Link href={`${router.asPath}/${transaction.id}`}>
                <div className="bg-white p-6 dark:bg-gray-900 shadow-md rounded-md">
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
              </Link>
            </li>
          ))}
        </ul>
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

export default Transactions;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

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
