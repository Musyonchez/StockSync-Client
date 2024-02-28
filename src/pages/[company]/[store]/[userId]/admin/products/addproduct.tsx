import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductRequest } from "../../../../../../actions/products/addProduct";
// import { RootState } from "../../../../../../store/reducers/reducers";
// import { Product } from "../../../../../../types/product"; // Import the Product type

// import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const AddProduct = () => {
  // const [addProduct] = useMutation(ADD_PRODUCT);
  const router = useRouter();
  const company = router.query?.company as string; // Ensure company is always a string
  const store = router.query?.store as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(
        addProductRequest(
          name,
          description,
          group,

          company,
          store // Assuming 'store' is the correct variable for the product type
        )
      );

      setName("");
      setDescription("");
      setGroup("");

      // Handle success if needed
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <Layout>
      <div className="w-full flex mt-20 justify-center items-center">
        <div className="max-w-md w-full mx-auto my-auto h-full px-4 pb-4 dark:bg-gray-800 bg-white rounded shadow-md">
          <h1 className="flex w-full text-2xl font-bold my-4 justify-center">
            Add Product
          </h1>
          <form onSubmit={handleSubmit}>
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
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Product Name"
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
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Product Description"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="group"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Product Group:
              </label>
              <input
                type="text"
                name="group"
                id="group"
                value={group}
                required
                onChange={(e) => setGroup(e.target.value)}
                placeholder="Enter Product Group"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

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
