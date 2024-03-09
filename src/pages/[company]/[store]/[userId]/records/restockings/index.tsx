// Import necessary packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/reducers";
import { fetchRestockingsRequest } from "@/actions/records/restockings/fetchRestockings";
import {
  Restocking,
  RestockingDetail,
} from "../../../../../../types/restocking";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const Restockings = () => {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;

  const dispatch = useDispatch();
  const restockings = useSelector(
    (state: RootState) => state.restockings.data
  );
  const loading = useSelector((state: RootState) => state.restockings.loading);
  const error = useSelector((state: RootState) => state.restockings.error);

  useEffect(() => {
    if (company && store) {
      dispatch(fetchRestockingsRequest(company as string, store as string));
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

  if (!restockings) {
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
        <h1 className="text-3xl font-semibold mb-4">Restockings</h1>
        <ul>
          {restockings.map((restocking: Restocking) => (
            <li key={restocking.id} className="mb-8">
              <Link href={`${router.asPath}/${restocking.id}`}>
                <div className="bg-white p-6 shadow-md rounded-md">
                  <p className="text-lg font-semibold mb-2">
                    ID: {restocking.id}
                  </p>
                  <p>Created At: {restocking.createdAt}</p>
                  <p>Creator ID: {restocking.creatorId}</p>
                  <p>Creator Name: {restocking.creatorName}</p>
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Restockings;
