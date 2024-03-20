// Import necessary packages
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/reducers";
import { fetchRestockingsRequest } from "@/actions/records/restockings/fetchRestockings";
import { Restocking, RestockingDetail } from "../../../../types/restocking";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";

const Restockings = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const take = 2; // Number of items to take
  const skip = 0; // Number of items to skip

  const dispatch = useDispatch();
  const restockings = useSelector((state: RootState) => state.restockings.data);
  const loading = useSelector((state: RootState) => state.restockings.loading);
  const error = useSelector((state: RootState) => state.restockings.error);

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        fetchRestockingsRequest(
          company as string,
          store as string,
          take as number,
          skip as number
        )
      );
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  }, [dispatch, company, store]);

  return (
    <Layout>
      <div className="container dark:bg-black dark:text-white mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Restockings</h1>
        <ul>
          {restockings.map((restocking: Restocking) => (
            <li key={restocking.id} className="mb-8">
              <Link href={`${router.asPath}/${restocking.id}`}>
                <div className="bg-white dark:bg-gray-900 p-6 shadow-md rounded-md">
                  <p className="text-lg font-semibold mb-2">
                    ID: {restocking.id}
                  </p>
                  <p>Created At: {restocking.createdAt}</p>
                  <p>Creator ID: {restocking.creatorId}</p>
                  <p>Creator Name: {restocking.creatorName}</p>
                  <p>Total Amount: {restocking.totalAmount}</p>
                  <ul className="mt-4">
                    <p className="text-lg font-semibold mb-2">Details</p>
                    {restocking.details.map((detail: RestockingDetail) => (
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

export default Restockings;

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
