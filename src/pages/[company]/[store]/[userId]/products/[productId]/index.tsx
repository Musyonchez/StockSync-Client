import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/DynamicSaasPages/Layout";

const GET_PRODUCT = gql`
  query GetProduct($id: String!, $company: String!, $type: String!) {
    product(id: $id, company: $company, type: $type) {
      id
      name
      description
      minimumQuantity
      currentQuantity
      reorderQuantity
      costCurrent
      costPrevious
    }
  }
`;

interface Product {
  id: string;
  name: string;
  description: string;
  minimumQuantity: number;
  currentQuantity: number;
  reorderQuantity: number;
  costCurrent: number;
  costPrevious: number;
}

const ProductDetail = () => {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;
  const { productId } = router.query;

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId, company: company, type: store },
  });

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

  const product: Product = data.product;

  if (!product) {
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Product Details</h2>
        </div>
        <div className="bg-white p-4 border rounded">
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
