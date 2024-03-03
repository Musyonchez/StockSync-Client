import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionRequest } from "@/actions/transactions/fetchTransaction";

import { RootState } from "../../../../../../../store/reducers/reducers";
import {
  Transaction,
  TransactionDetail,
} from "../../../../../../../types/transaction";

const transactionItems = () => {
  const router = useRouter();
  const company = router.query?.company as string; // Ensure company is always a string
  const store = router.query?.store as string;
  const transactionId = router.query?.transactionId as string; // Ensure company is always a string

  const dispatch = useDispatch();
  const transaction = useSelector(
    (state: RootState) => state.transaction.data
  );
  const loading = useSelector((state: RootState) => state.transaction.loading);
  const error = useSelector((state: RootState) => state.transaction.error);

  useEffect(() => {
    if (company && store) {
      dispatch(
        fetchTransactionRequest(
          transactionId as string,
          company as string,
          store as string
        )
      );
    }
  }, [dispatch, company, store, transactionId]);

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

  if (!transaction) {
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
          <li key={transaction.id}>
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
          </li>
      </ul>
    </div>
  );
};

export default transactionItems;
