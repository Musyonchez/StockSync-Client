import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "@/actions/products/fetchProducts";
import { RootState } from "@/store/reducers/reducers";
import { Product } from "@/types/product"; // Import the Product type

import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

function ProductList() {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (company && store) {
      dispatch(fetchProductsRequest(company as string, store as string));
    }
  }, [dispatch, company, store]);

  if (loading)
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Products List</h2>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/addproduct`}>Add Product</Link>
              </button>
            </div>
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
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/addproduct`}>Add Product</Link>
              </button>
            </div>
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
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/addproduct`}>Add Product</Link>
              </button>
            </div>
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
      <div className="container mx-auto p-4">
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
                  <div className=" min-w-32">Group:</div>
                  <div className=" min-w-28">Minimum Quantity:</div>
                  <div className=" min-w-28">Current Quantity:</div>
                  <div className=" min-w-28">Reorder Quantity:</div>
                  <div className=" min-w-28">Current Cost:</div>
                  <div className=" min-w-28">Previous Cost:</div>
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
                        <div className=" min-w-36">{product.name}</div>
                        <div className=" min-w-64 overflow-hidden">
                          {product.description}
                        </div>
                        <div className=" min-w-32">{product.group}</div>
                        <div className=" min-w-28">
                          {product.minimumQuantity}
                        </div>
                        <div className=" min-w-28">
                          {product.currentQuantity}
                        </div>
                        <div className=" min-w-28">
                          {product.reorderQuantity}
                        </div>
                        <div className=" min-w-28">{product.costCurrent}</div>
                        <div className=" min-w-28">{product.costPrevious}</div>
                        <div className=" min-w-52">{product.id}</div>
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
                  <div className=" min-w-32">Group:</div>
                  <div className=" min-w-28">Minimum Quantity:</div>
                  <div className=" min-w-28">Current Quantity:</div>
                  <div className=" min-w-28">Reorder Quantity:</div>
                  <div className=" min-w-28">Current Cost:</div>
                  <div className=" min-w-28">Previous Cost:</div>
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
                            {inactiveproduct.group}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.minimumQuantity}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.currentQuantity}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.reorderQuantity}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.costCurrent}
                          </div>
                          <div className=" min-w-28">
                            {inactiveproduct.costPrevious}
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
    </Layout>
  );
}

export default ProductList;
