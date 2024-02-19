import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../../../../../../actions/products/fetchProduct";
import { RootState } from "../../../../../../../store/reducers/reducers";
import { Product } from "../../../../../../../types/product"; // Import the Product type




const DEACTIVATE_PRODUCT = gql`
  mutation DeactivateProduct($id: String!, $company: String!, $type: String!) {
    deactivateProduct(id: $id, company: $company, type: $type) {
      id
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!, $company: String!, $type: String!) {
    deleteProduct(id: $id, company: $company, type: $type) {
      id
    }
  }
`;


const ProductDetail = () => {
  const [deactivateProduct] = useMutation(DEACTIVATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;
  const { productId } = router.query;
  const { pathname, query } = router;
  const [isActiveButtonActive, setIsActiveButtonActive] = useState(true);
  const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(true);


  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product.data);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    if (company && store) {
      dispatch(fetchProductRequest( productId as string, company as string, store as string));
    }
  }, [dispatch, company, store, productId]);


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


  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <p className="text-yellow-700">No product could be found</p>
        </div>
      </Layout>
    );
  }

  const handleDeactivate = async () => {
    setIsActiveButtonActive(false);

    try {
      const { data } = await deactivateProduct({
        variables: { id: productId, company: company, type: store },
      });

      const userId = query.userId;

      // Use router.push to navigate to the new URL structure
      router.push(`/${company}/${store}/${userId}/admin/products/`).then(() => {
        window.location.reload();
      });
    } catch (error) {}
  };

  const handleDelete = async () => {
    setIsDeleteButtonActive(false);

    try {
      const { data } = await deleteProduct({
        variables: { id: productId, company: company, type: store },
      });

      const userId = query.userId;

      // Use router.push to navigate to the new URL structure
      router.push(`/${company}/${store}/${userId}/admin/products/`).then(() => {
        window.location.reload();
      });
    } catch (error) {}
  };

  const handleActivate = async () => {
    setIsActiveButtonActive(false);

    try {
      const { data } = await deactivateProduct({
        variables: { id: productId, company: company, type: store },
      });

      const userId = query.userId;

      // Use router.push to navigate to the new URL structure
      router.push(`/${company}/${store}/${userId}/admin/products/`).then(() => {
        window.location.reload();
      });
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Product Details</h2>
          <span className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link href={`${router.asPath}/editproduct`}>Edit</Link>
            </button>
            <button
              onClick={product.active ? handleDeactivate : handleActivate}
              className={`${
                product.active
                  ? isActiveButtonActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                  : isActiveButtonActive
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-4 py-2 rounded`}
              disabled={!isActiveButtonActive}
            >
              {product.active
                ? isActiveButtonActive
                  ? "Deactivate"
                  : "Deactivating..."
                : isActiveButtonActive
                ? "Activate"
                : "Activating"}
            </button>
            {!product.active && (
              <button
                onClick={handleDelete}
                className={`${
                  isDeleteButtonActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white px-4 py-2 rounded`}
                disabled={!isDeleteButtonActive}
              >
                {isDeleteButtonActive ? "Delete" : "Deleting..."}
              </button>
            )}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 border rounded">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-600 mb-1"
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
              className="block text-sm font-semibold text-gray-600 mb-1"
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
              className="block text-sm font-semibold text-gray-600 mb-1"
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
              htmlFor="current"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Current Quantity:
            </label>
            <input
              type="number"
              name="current"
              id="current"
              value={product.currentQuantity}
              readOnly
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="reorder"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Reorder Quantity:
            </label>
            <input
              type="number"
              name="reorder"
              id="reorder"
              value={product.reorderQuantity}
              readOnly
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="minimum"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Minimum Quantity:
            </label>
            <input
              type="number"
              name="minimum"
              id="minimum"
              value={product.minimumQuantity}
              readOnly
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="minimum"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Current Cost:
            </label>
            <input
              type="number"
              name="minimum"
              id="minimum"
              value={product.costCurrent}
              readOnly
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="minimum"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Previous Cost:
            </label>
            <input
              type="number"
              name="minimum"
              id="minimum"
              value={product.costPrevious}
              readOnly
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
