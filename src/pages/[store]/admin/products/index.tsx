import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "@/actions/products/fetchProducts";
import { RootState } from "@/store/reducers/reducers";
import { Product } from "@/types/product"; // Import the Product type

import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";
interface DynamicRouteParams {
  store: string;
  userID: string;
}

function ProductList() {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;

  const take = 10;

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const [showError, setShowError] = useState(true);

  const totalProducts = useSelector((state: RootState) =>
    state.products.data.length > 0
      ? state.products.data[0].totalProducts
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
        fetchProductsRequest(
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
      <div className="container mx-auto px-4 pt-2 pb-7">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Products List</h2>
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link href={`${router.asPath}/addproduct`}>Add Product</Link>
            </button>
          </div>
        </div>
        {products.length > 0 && (
          <>
            <div>
              <ul>
                <li
                  className="mb-2 px-4 py-2 border rounded flex"
                  style={{ width: "1316px" }}
                >
                  <div className=" min-w-36">Name:</div>
                  <div className=" min-w-64">Description:</div>
                  <div className=" min-w-32">Category:</div>
                  <div className=" min-w-28">Current Quantity:</div>
                  <div className=" min-w-28">Reorder Quantity:</div>
                  <div className=" min-w-28">Unit Cost:</div>
                  <div className=" min-w-28">Selling Price:</div>
                  <div className=" min-w-28">Supplier:</div>
                  <div className=" min-w-52">ID:</div>
                </li>
                {products
                  .filter((product) => product.active)
                  .map((product) => (
                    <li
                      key={product.id}
                      className="p-4 border rounded"
                      style={{ width: "1316px" }}
                    >
                      <Link
                        href={`${router.asPath}/${product.id}`}
                        className="text-blue-500 flex w-full"
                      >
                        <div className=" min-w-36 overflow-hidden">
                          {product.name}
                        </div>
                        <div className=" min-w-64 overflow-hidden">
                          {product.description}
                        </div>
                        <div className=" min-w-32 overflow-hidden">
                          {product.category}
                        </div>
                        <div className=" min-w-28 overflow-hidden">
                          {product.current}
                        </div>
                        <div className=" min-w-28 overflow-hidden">
                          {product.reorderLevel}
                        </div>
                        <div className=" min-w-28 overflow-hidden">
                          {product.unitCost}
                        </div>
                        <div className=" min-w-28 overflow-hidden">
                          {product.sellingPrice}
                        </div>
                        <div className=" min-w-28 overflow-hidden">
                          {product.supplier}
                        </div>
                        <div className=" min-w-52 overflow-hidden">
                          {product.id}
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <ul>
                <h2 className=" text-red-600 font-bold text-xl py-2">
                  Deactivated
                </h2>
                <li
                  className="mb-2 px-4 py-2 border rounded flex"
                  style={{ width: "1316px" }}
                >
                  <div className=" min-w-36">Name:</div>
                  <div className=" min-w-64">Description:</div>
                  <div className=" min-w-32">Category:</div>
                  <div className=" min-w-28">Current Quantity:</div>
                  <div className=" min-w-28">Reorder Quantity:</div>
                  <div className=" min-w-28">Unit Cost:</div>
                  <div className=" min-w-28">Selling Price:</div>
                  <div className=" min-w-28">Supplier:</div>
                  <div className=" min-w-52">ID:</div>
                </li>
                {products
                  .filter((product) => !product.active)
                  .map((inactiveproduct) => (
                    <>
                      <li
                        key={inactiveproduct.id}
                        className="p-4 border rounded"
                        style={{ width: "1316px" }}
                      >
                        <Link
                          href={`${router.asPath}/${inactiveproduct.id}`}
                          className="text-blue-500 flex w-full"
                        >
                          <div className=" min-w-36">
                            {inactiveproduct.name}
                          </div>
                          <div className=" min-w-64 overflow-hidden">
                            {inactiveproduct.description}
                          </div>
                          <div className=" min-w-32">
                            {inactiveproduct.category}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.current}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.reorderLevel}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.unitCost}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.sellingPrice}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.supplier}
                          </div>
                          <div className=" min-w-52"> {inactiveproduct.id}</div>
                        </Link>
                      </li>
                    </>
                  ))}
              </ul>
            </div>
          </>
        )}
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
}

export default ProductList;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, params } = context;
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { store } = params as unknown as DynamicRouteParams;

  if (session.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: `/${store}/dashboard`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
