import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../../../../../../actions/products/fetchProducts";
import { RootState } from "../../../../../../store/reducers";
import { Product } from "../../../../../../types/product"; // Import the Product type

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
            <span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/addproduct`}>Add Product</Link>
              </button>
            </span>
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
            <span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/addproduct`}>Add Product</Link>
              </button>
            </span>
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
            <span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link href={`${router.asPath}/addproduct`}>Add Product</Link>
              </button>
            </span>
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
          <span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link href={`${router.asPath}/addproduct`}>Add Product</Link>
            </button>
          </span>
        </div>
        {products.length > 0 && (
          <>
            <div>
              <ul>
                {products
                  .filter((product) => product.active)
                  .map((product) => (
                    <li key={product.id} className="mb-4 p-4 border rounded">
                      <Link
                        href={`${router.asPath}/${product.id}`}
                        className="text-blue-500"
                      >
                        <strong>ID:</strong> <br className=" sm:hidden" />{" "}
                        <span className=" text-black">{product.id}</span>
                        <br />
                        <strong>
                          Name:
                        </strong> <br className=" sm:hidden" />{" "}
                        <span className=" text-black">{product.name}</span>
                        <br />
                        <strong>Description:</strong>{" "}
                        <br className=" sm:hidden" />{" "}
                        <span className=" text-black">
                          {product.description}
                        </span>
                        <br />
                        <strong>Minimum Quantity:</strong>{" "}
                        <br className=" sm:hidden" />{" "}
                        <span className=" text-black">
                          {product.minimumQuantity}
                        </span>
                        <br />
                        <strong>Current Quantity:</strong>{" "}
                        <br className=" sm:hidden" />{" "}
                        <span className=" text-black">
                          {product.currentQuantity}
                        </span>
                        <br />
                        <strong>Reorder Quantity:</strong>{" "}
                        <br className=" sm:hidden" />{" "}
                        <span className=" text-black">
                          {product.reorderQuantity}
                        </span>
                        <br />
                        <strong>Current Cost:</strong>{" "}
                        <br className=" sm:hidden" />{" "}
                        <span className=" text-black">
                          {product.costCurrent}
                        </span>
                        <br />
                        <strong>Previous Cost:</strong>{" "}
                        <br className=" sm:hidden" />{" "}
                        <span className=" text-black">
                          {product.costPrevious}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <ul>
                {products
                  .filter((product) => !product.active)
                  .map((inactiveproduct) => (
                    <>
                      <h2>Deactivated</h2>
                      <li
                        key={inactiveproduct.id}
                        className="mb-4 p-4 border rounded"
                      >
                        <Link
                          href={`${router.asPath}/${inactiveproduct.id}`}
                          className="text-blue-500"
                        >
                          <strong>ID:</strong> <br className=" sm:hidden" />{" "}
                          <span className=" text-black">
                            {inactiveproduct.id}
                          </span>
                          <br />
                          <strong>
                            Name:
                          </strong> <br className=" sm:hidden" />{" "}
                          <span className=" text-black">
                            {inactiveproduct.name}
                          </span>
                          <br />
                          <strong>Description:</strong>{" "}
                          <br className=" sm:hidden" />{" "}
                          <span className=" text-black">
                            {inactiveproduct.description}
                          </span>
                          <br />
                          <strong>Minimum Quantity:</strong>{" "}
                          <br className=" sm:hidden" />{" "}
                          <span className=" text-black">
                            {inactiveproduct.minimumQuantity}
                          </span>
                          <br />
                          <strong>Current Quantity:</strong>{" "}
                          <br className=" sm:hidden" />{" "}
                          <span className=" text-black">
                            {inactiveproduct.currentQuantity}
                          </span>
                          <br />
                          <strong>Reorder Quantity:</strong>{" "}
                          <br className=" sm:hidden" />{" "}
                          <span className=" text-black">
                            {inactiveproduct.reorderQuantity}
                          </span>
                          <br />
                          <strong>Current Cost:</strong>{" "}
                          <br className=" sm:hidden" />{" "}
                          <span className=" text-black">
                            {inactiveproduct.costCurrent}
                          </span>
                          <br />
                          <strong>Previous Cost:</strong>{" "}
                          <br className=" sm:hidden" />{" "}
                          <span className=" text-black">
                            {inactiveproduct.costPrevious}
                          </span>
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
