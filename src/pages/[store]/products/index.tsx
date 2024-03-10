import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchactiveProductsRequest } from "../../../actions/products/fetchactiveProducts";
import { RootState } from "../../../store/reducers/reducers";
import { Product } from "../../../types/product"; // Import the Product type

import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

function ProductList() {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.activeproducts.data);
  const loading = useSelector(
    (state: RootState) => state.activeproducts.loading
  );
  const error = useSelector((state: RootState) => state.activeproducts.error);

  useEffect(() => {
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(fetchactiveProductsRequest(company as string, store as string));
    } else {
      console.error(`User does not have access to ${store}.`);
    }
  }, [dispatch, company, store]);

  if (loading)
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Products List</h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Products List</h2>
          </div>
          <div className="bg-red-100 p-4 border-l-4 border-red-500">
            <p className="text-red-700">No products could be found</p>
          </div>
        </div>
      </Layout>
    );

  if (!products) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Products List</h2>
          </div>
          <div className="bg-yellow-100 p-4 border-l-4 border-yellow-500">
            <p className="text-yellow-700">No products could be found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Products List</h2>
        </div>
        {Array.isArray(products) && products.length > 0 ? (
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
        ) : null}
      </div>
    </Layout>
  );
}

export default ProductList;

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
