// Import necessary packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/reducers";
import { fetchTransactionsRequest } from "@/actions/transactions/fetchTransactions";
import {
  Transaction,
  TransactionDetail,
} from "../../../../../../types/transaction";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const Transactions = () => {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;

  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.data
  );
  const loading = useSelector((state: RootState) => state.transactions.loading);
  const error = useSelector((state: RootState) => state.transactions.error);

  useEffect(() => {
    if (company && store) {
      dispatch(fetchTransactionsRequest(company as string, store as string));
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
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map((transaction: Transaction) => (
          <li key={transaction.id}>
            <Link href={`${router.asPath}/${transaction.id}`}>
              <p>ID: {transaction.id}</p>
              <p>Created At: {transaction.createdAt}</p>
              {/* Add other fields from Transaction type */}
              <p>Total Amount: {transaction.totalAmount}</p>
              {/* Loop through details array */}
              <ul>
                {transaction.details.map((detail: TransactionDetail) => (
                  <li key={detail.id}>
                    <p>Detail ID: {detail.id}</p>
                    {/* Add other fields from TransactionDetail type */}
                    <p>Name: {detail.name}</p>
                    <p>Quantity: {detail.quantity}</p>
                    {/* Add more fields as needed */}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
