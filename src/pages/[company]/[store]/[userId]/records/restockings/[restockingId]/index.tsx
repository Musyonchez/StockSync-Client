import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchRestockingRequest } from "@/actions/records/restockings/fetchRestocking";

import { RootState } from "../../../../../../../store/reducers/reducers";
import { RestockingDetail } from "../../../../../../../types/restocking";
import RestockingPreview from "@/components/DynamicSaasPages/MainContent/Restocking/RestockingPreview";

import { useSession } from "next-auth/react";
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from "next";

const Restocking = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const  company  = session?.user?.company;
  const store = router.query?.store as string;
  const restockingId = router.query?.restockingId as string; // Ensure company is always a string

  const dispatch = useDispatch();
  const restocking = useSelector((state: RootState) => state.restocking.data);
  const loading = useSelector((state: RootState) => state.restocking.loading);
  const error = useSelector((state: RootState) => state.restocking.error);

  useEffect(() => {
    if (company && store) {
      dispatch(
        fetchRestockingRequest(
          restockingId as string,
          company as string,
          store as string
        )
      );
    }
  }, [dispatch, company, store, restockingId]);

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

  if (!restocking) {
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
        <h1 className="text-3xl font-semibold mb-4">Restocking</h1>
        <ul>
          <li key={restocking.id} className="mb-8">
            <div className="bg-white p-6 shadow-md rounded-md">
              <p className="text-lg font-semibold mb-2">ID: {restocking.id}</p>
              <p>Created At: {restocking.createdAt}</p>
              <p>Creator ID: {restocking.creatorId}</p>
              <p>Creator Name: {restocking.creatorName}</p>

              {/* Loop through details array */}
              <ul className="mt-4">
                <p className="text-lg font-semibold mb-2">Details</p>
                {restocking.details.map((detail: RestockingDetail) => (
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
                    <p>Supplier: {detail.supplier}</p>
                    <p>Quantity: {detail.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
        <RestockingPreview
          restockingData={{
            id: restocking.id,
            createdAt: restocking.createdAt,
            creatorId: restocking.creatorId,
            creatorName: restocking.creatorName,
            details: restocking.details.map((detail: RestockingDetail) => ({
              id: detail.id,
              name: detail.name,
              category: detail.category,
              current: detail.current,
              unitCost: detail.unitCost,
              sellingPrice: detail.sellingPrice,
              supplier: detail.supplier,
              quantity: detail.quantity,
            })),
          }}
        />
      </div>
    </Layout>
  );
};

export default Restocking;

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