import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

// Define the GraphQL query
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

// Assuming this is your product type
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

// Create a functional component to display products
function ProductList() {
  const router = useRouter();
  const { company } = router.query;
  const { store } = router.query;


  // Use the useQuery hook to execute the query
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

  // Extract products from the data

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
      <div className="container mx-auto p-4">
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
                  <strong>ID:</strong> {product.id}
                  <br />
                  <strong>Name:</strong> {product.name}
                  <br />
                  <strong>Description:</strong> {product.description}
                  <br />
                  <strong>Minimum Quantity:</strong> {product.minimumQuantity}
                  <br />
                  <strong>Current Quantity:</strong> {product.currentQuantity}
                  <br />
                  <strong>Reorder Quantity:</strong> {product.reorderQuantity}
                  <br />
                  <strong>Current Cost:</strong> {product.costCurrent}
                  <br />
                  <strong>Previous Cost:</strong> {product.costPrevious}
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
