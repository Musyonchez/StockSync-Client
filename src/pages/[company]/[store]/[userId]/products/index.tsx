import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const GET_ALL_PRODUCTS = gql`
  query GetProduct($company: String!, $type: String!) {
    activeProducts(company: $company, type: $type) {
      id
      name
      description
      minimumQuantity
      currentQuantity
      reorderQuantity
      costCurrent
      costPrevious
      active
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

function ProductList() {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    variables: { company: company, type: store },
  });

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

  if (!data.activeProducts) {
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

  const products: Product[] = data.activeProducts;

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Products List</h2>
        </div>

        <div>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="mb-4 p-4 border rounded">
                <Link
                  href={`${router.asPath}/${product.id}`}
                  className="text-blue-500"
                >
                  <strong>ID:</strong> <br className=" sm:hidden"/> <span className=" text-black">{product.id}</span>
                  <br />
                  <strong>Name:</strong> <br className=" sm:hidden"/> <span className=" text-black">{product.name}</span>
                  <br />
                  <strong>Description:</strong> <br className=" sm:hidden"/> <span className=" text-black">{product.description}</span>
                  <br />
                  <strong>Minimum Quantity:</strong> <br className=" sm:hidden"/> <span className=" text-black">{product.minimumQuantity}</span>
                  <br />
                  <strong>Current Quantity:</strong> <br className=" sm:hidden"/> <span className=" text-black">{product.currentQuantity}</span>
                  <br />
                  <strong>Reorder Quantity:</strong> <br className=" sm:hidden"/> <span className=" text-black">{product.reorderQuantity}</span>
                  <br />
                  <strong>Current Cost:</strong> <br className=" sm:hidden"/> <span className=" text-black">{product.costCurrent}</span>
                  <br />
                  <strong>Previous Cost:</strong> <br className=" sm:hidden"/> <span className=" text-black">{product.costPrevious}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default ProductList;
