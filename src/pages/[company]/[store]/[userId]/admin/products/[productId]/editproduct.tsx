import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../../../../../../actions/products/fetchProduct";
import { editProductRequest } from "../../../../../../../actions/products/editProduct";
import { RootState } from "../../../../../../../store/reducers/reducers";
import { Product } from "../../../../../../../types/product"; // Import the Product type

import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

const ProductDetail = () => {
  const router = useRouter();
  const company = router.query?.company as string; // Ensure company is always a string
  const store = router.query?.store as string;
  const productId = router.query?.productId as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [reorderQuantity, setReorderQuantity] = useState(0);
  const [minimumQuantity, setMinimumQuantity] = useState(0);
  const [costCurrent, setCostCurrent] = useState(0);
  const [costPrevious, setCostPrevious] = useState(0);

  const dispatch = useDispatch();
  const initialProduct = useSelector((state: RootState) => state.product.data);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const editProduct = useSelector((state: RootState) => state.editproduct.data);
  const editLoading = useSelector(
    (state: RootState) => state.editproduct.loading
  );
  const editError = useSelector((state: RootState) => state.editproduct.error);

  const [product, setProduct] = useState<Product | null>(initialProduct);

  useEffect(() => {
    if (company && store) {
      dispatch(
        fetchProductRequest(
          productId as string,
          company as string,
          store as string
        )
      );
    }
  }, [dispatch, company, store, productId]);

  useEffect(() => {
    // Check if editproduct has changed and is not null
    if (initialProduct !== null) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  useEffect(() => {
    // Check if editproduct has changed and is not null
    if (editProduct !== null) {
      setProduct(editProduct);
    }
  }, [editProduct]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(
        editProductRequest(
          productId,
          name,
          description,
          minimumQuantity,
          currentQuantity,
          reorderQuantity,
          costCurrent,
          costPrevious,
          company,
          store // Assuming 'store' is the correct variable for the product type
        )
      );

      setName("");
      setDescription("");
      setCurrentQuantity(0);
      setReorderQuantity(0);
      setMinimumQuantity(0);
      setCostCurrent(0);
      setCostPrevious(0);
    } catch (error) {
      console.error("Error editing product:", error);
      // Handle error if needed
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Product</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 border rounded">
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter New Product Name"
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
                placeholder="Enter Product Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter New Product Name"
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
                placeholder="Enter Product Description"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <textarea
                name="description"
                id="description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter New Product Description"
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
              <input
                type="number"
                name="current"
                id="current"
                value={currentQuantity || ""}
                required
                onChange={(e) =>
                  setCurrentQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter New Current"
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
              <input
                type="number"
                name="reorder"
                id="reorder"
                value={reorderQuantity || ""}
                required
                onChange={(e) =>
                  setReorderQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter New Reorder"
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
              <input
                type="number"
                name="minimum"
                id="minimum"
                value={minimumQuantity || ""}
                required
                onChange={(e) =>
                  setMinimumQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter New Minimum"
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
              <input
                type="number"
                name="minimum"
                id="minimum"
                value={costCurrent || ""}
                required
                onChange={(e) => setCostCurrent(parseInt(e.target.value, 10))}
                placeholder="Enter New Minimum"
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
              <input
                type="number"
                name="minimum"
                id="minimum"
                value={costPrevious || ""}
                required
                onChange={(e) => setCostPrevious(parseInt(e.target.value, 10))}
                placeholder="Enter New Minimum"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Product
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
