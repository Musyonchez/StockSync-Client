// Import necessary packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers/reducers";
import { fetchWriteoffsRequest } from "@/actions/records/writeoffs/fetchWriteoffs";
import {
  Writeoff,
  WriteoffDetail,
} from "../../../../../../types/writeoff";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const Writeoffs = () => {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;

  const dispatch = useDispatch();
  const writeoffs = useSelector(
    (state: RootState) => state.writeoffs.data
  );
  const loading = useSelector((state: RootState) => state.writeoffs.loading);
  const error = useSelector((state: RootState) => state.writeoffs.error);

  useEffect(() => {
    if (company && store) {
      dispatch(fetchWriteoffsRequest(company as string, store as string));
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

  if (!writeoffs) {
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
        <h1 className="text-3xl font-semibold mb-4">Writeoffs</h1>
        <ul>
          {writeoffs.map((writeoff: Writeoff) => (
            <li key={writeoff.id} className="mb-8">
              <Link href={`${router.asPath}/${writeoff.id}`}>
                <div className="bg-white p-6 shadow-md rounded-md">
                  <p className="text-lg font-semibold mb-2">
                    ID: {writeoff.id}
                  </p>
                  <p>Created At: {writeoff.createdAt}</p>
                  <p>Creator ID: {writeoff.creatorId}</p>
                  <p>Creator Name: {writeoff.creatorName}</p>
                  <p>Total Amount: {writeoff.totalAmount}</p>
                  <ul className="mt-4">
                    <p className="text-lg font-semibold mb-2">Details</p>
                    {writeoff.details.map((detail: WriteoffDetail) => (
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

export default Writeoffs;