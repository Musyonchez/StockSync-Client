import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchWriteoffRequest } from "@/actions/records/writeoffs/fetchWriteoff";

import { RootState } from "../../../../../store/reducers/reducers";
import { WriteoffDetail } from "../../../../../types/writeoff";
import WriteoffPreview from "@/components/DynamicSaasPages/MainContent/Writeoff/WriteoffPreview";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";

const Writeoff = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const writeoffId = router.query?.writeoffId as string; // Ensure company is always a string

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const dispatch = useDispatch();
  const writeoff = useSelector((state: RootState) => state.writeoff.data);
  const loading = useSelector((state: RootState) => state.writeoff.loading);
  const error = useSelector((state: RootState) => state.writeoff.error);

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        fetchWriteoffRequest(
          writeoffId as string,
          company as string,
          store as string
        )
      );
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  }, [dispatch, company, store, writeoffId]);

  return (
    <Layout>
      <div className="container dark:bg-black dark:text-white mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Writeoff</h1>
        <ul>
          <li key={writeoff?.id} className="mb-8">
            <div className="bg-white dark:bg-gray-900 p-6 shadow-md rounded-md">
              <p className="text-lg font-semibold mb-2">ID: {writeoff?.id}</p>
              <p>Created At: {writeoff?.createdAt}</p>
              <p>Creator ID: {writeoff?.creatorId}</p>
              <p>Creator Name: {writeoff?.creatorName}</p>
              <p>Total Amount: {writeoff?.totalAmount}</p>
              <p>Reason: {writeoff?.reason}</p>

              {/* Loop through details array */}
              <ul className="mt-4">
                <p className="text-lg font-semibold mb-2">Details</p>
                {writeoff?.details.map((detail: WriteoffDetail) => (
                  <li
                    key={detail.id}
                    className="mb-2 bg-white dark:bg-gray-800 p-6 shadow-md rounded-md"
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
        <WriteoffPreview
          writeoffData={{
            companyLogo: session?.user?.companyLogo ?? "",
            id: writeoff?.id ?? "",
            createdAt: writeoff?.createdAt ?? "",
            creatorId: writeoff?.creatorId ?? "",
            creatorName: writeoff?.creatorName ?? "",
            totalAmount: writeoff?.totalAmount ?? 0,
            reason: writeoff?.reason ?? "",
            details:
              writeoff?.details.map((detail: WriteoffDetail) => ({
                id: detail.id,
                name: detail.name,
                category: detail.category,
                current: detail.current,
                unitCost: detail.unitCost,
                sellingPrice: detail.sellingPrice,
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
      {showStoreError && (
        <ErrorMessagePopup
          message={storeMessage}
          onClose={() => setShowStoreError(false)}
        />
      )}
    </Layout>
  );
};

export default Writeoff;

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
