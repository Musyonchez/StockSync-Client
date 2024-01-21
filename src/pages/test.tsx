import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Layout from "@/components/DynamicSaasPages/Layout";

const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $minimumQuantity: Int!
    $currentQuantity: Int!
    $reorderQuantity: Int!
    $costCurrent: Int!
    $costPrevious: Int!
  ) {
    addProduct(
      name: $name
      description: $description
      minimumQuantity: $minimumQuantity
      currentQuantity: $currentQuantity
      reorderQuantity: $reorderQuantity
      costCurrent: $costCurrent
      costPrevious: $costPrevious
    ) {
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

const AddProduct = () => {
  // State to manage form input values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [reorderQuantity, setReorderQuantity] = useState(0);
  const [minimumQuantity, setMinimumQuantity] = useState(0);
  const [costCurrent, setCostCurrent] = useState(0);
  const [costPrevious, setCostPrevious] = useState(0);

  // Use useMutation hook to get the mutation function
  const [addProduct] = useMutation(ADD_PRODUCT);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await addProduct({
        variables: {
          name,
          description,
          minimumQuantity,
          currentQuantity,
          reorderQuantity,
          costCurrent,
          costPrevious,
        },
      });

      // Reset form values after successful submission
      setName("");
      setDescription("");
      setCurrentQuantity(0);
      setReorderQuantity(0);
      setMinimumQuantity(0);
      setCostCurrent(0);
      setCostPrevious(0);

      // Handle the result as needed (e.g., show a success message)
      console.log("Product added successfully:", data.addProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <div className="max-w-md w-full mx-auto px-4 pb-4 bg-white rounded shadow-md">
          <h1 className="flex w-full text-2xl font-bold my-4 justify-center">
            Add Product
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Product Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Product Description */}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Product Description"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            Current Quantity
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
                value={currentQuantity || ""}
                onChange={(e) =>
                  setCurrentQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter Current Quantity"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Reorder Quantity */}
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
                value={reorderQuantity || ""}
                onChange={(e) =>
                  setReorderQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter Reorder Quantity"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Minimum Quantity */}
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
                value={minimumQuantity || ""}
                onChange={(e) =>
                  setMinimumQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter Minimum Quantity"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Current Cost */}
            <div className="mb-4">
              <label
                htmlFor="costCurrent"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Current Cost:
              </label>
              <input
                type="number"
                name="costCurrent"
                id="costCurrent"
                value={costCurrent || ""}
                onChange={(e) => setCostCurrent(parseInt(e.target.value, 10))}
                placeholder="Enter Current Cost"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Previous Cost */}
            <div className="mb-4">
              <label
                htmlFor="costPrevious"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Previous Cost:
              </label>
              <input
                type="number"
                name="costPrevious"
                id="costPrevious"
                value={costPrevious || ""}
                onChange={(e) => setCostPrevious(parseInt(e.target.value, 10))}
                placeholder="Enter Previous Cost"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
