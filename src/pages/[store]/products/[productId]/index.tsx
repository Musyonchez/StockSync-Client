import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../../../actions/products/fetchProduct";
import { RootState } from "../../../../store/reducers/reducers";
import { Product } from "../../../../types/product"; // Import the Product type

import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";

const ProductDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const productId = router.query?.productId as string;

  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product.data);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        fetchProductRequest(
          productId as string,
          company as string,
          store as string
        )
      );
    } else {
      console.error(`User does not have access to ${store}.`);
    }
  }, [dispatch, company, store, productId]);

  

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Product Details</h2>
        </div>
        {product && (
          <div
            className="bg-white dark:bg-gray-800 p-4 border rounded"
            key={product.id}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Product ID:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={product.id}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Product Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={product.name}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Product Description:
              </label>
              <textarea
                name="description"
                id="description"
                value={product.description}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Product Category:
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={product.category}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="current"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Current Quantity:
              </label>
              <input
                type="number"
                name="current"
                id="current"
                value={product.current}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="reorderLevel"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Reorder Quantity:
              </label>
              <input
                type="number"
                name="reorderLevel"
                id="reorderLevel"
                value={product.reorderLevel}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="unitCost"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Unit Cost:
              </label>
              <input
                type="number"
                name="unitCost"
                id="unitCost"
                value={product.unitCost}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="sellingPrice"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Selling Price:
              </label>
              <input
                type="number"
                name="sellingPrice"
                id="sellingPrice"
                value={product.sellingPrice}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="supplier"
                className="block  dark:text-white text-sm font-semibold text-gray-600 mb-1"
              >
                Supplier:
              </label>
              <input
                type="text"
                name="supplier"
                id="supplier"
                value={product.supplier}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
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

export default ProductDetail;

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
