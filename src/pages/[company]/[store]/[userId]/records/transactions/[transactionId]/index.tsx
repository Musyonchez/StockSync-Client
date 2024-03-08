import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionRequest } from "@/actions/records/transactions/fetchTransaction";

import { RootState } from "../../../../../../../store/reducers/reducers";
import { TransactionDetail } from "../../../../../../../types/transaction";
import TransactionPreview from "@/components/DynamicSaasPages/MainContent/Transaction/TransactionPreview";

const Transaction = () => {
  const router = useRouter();
  const company = router.query?.company as string; // Ensure company is always a string
  const store = router.query?.store as string;
  const transactionId = router.query?.transactionId as string; // Ensure company is always a string

  const dispatch = useDispatch();
  const transaction = useSelector((state: RootState) => state.transaction.data);
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
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Transaction</h1>
        <ul>
          <li key={transaction.id} className="mb-8">
            <div className="bg-white p-6 shadow-md rounded-md">
              <p className="text-lg font-semibold mb-2">ID: {transaction.id}</p>
              <p>Created At: {transaction.createdAt}</p>
              <p>Total Amount: {transaction.totalAmount}</p>

              {/* Loop through details array */}
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
          </li>
        </ul>
        <TransactionPreview
          transactionData={{
            id: transaction.id,
            createdAt: transaction.createdAt,
            totalAmount: transaction.totalAmount,
            details: transaction.details.map((detail: TransactionDetail) => ({
              id: detail.id,
              name: detail.name,
              category: detail.category,
              current: detail.current,
              unitCost: detail.unitCost,
              sellingPrice: detail.sellingPrice,
              taxInformation: detail.taxInformation,
              supplier: detail.supplier,
              quantity: detail.quantity,
            })),
          }}
        />
      </div>
    </Layout>
  );
};

export default Transaction;
