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
  const [category, setCategory] = useState("");
  const [current, setCurrent] = useState(0);
  const [reoderLevel, setReoderLevel] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [taxInformation, setTaxInformation] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [supplier, setSupplier] = useState("");

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

  if (loading || editLoading)
    return (
      <Layout>
        <div className="container mx-auto p-4 flex justify-center items-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </Layout>
    );

  if (error || editError)
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

  console.log("product", product);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(
        editProductRequest(
          productId,
          name,
          description,
          category,
          current,
          reoderLevel,
          unitCost,
          sellingPrice,
          taxInformation,
          imageURL,
          supplier,

          company,
          store // Assuming 'store' is the correct variable for the product type
        )
      );

      setName("");
      setDescription("");
      setCategory("");
      setCurrent(0);
      setReoderLevel(0);
      setUnitCost(0);
      setSellingPrice(0);
      setTaxInformation(0);
      setImageURL("");
      setSupplier("");
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
                htmlFor="category"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Product Category:
              </label>
              <input
                type="text"
                name="category" // Use lowercase 'category'
                id="category"
                value={product.category}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="category"
                id="category"
                value={category || ""}
                required
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter New Category"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="current"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Current Price:
              </label>
              <input
                type="number"
                name="current"
                id="current"
                value={product.current}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="current"
                id="current"
                value={current || ""}
                required
                onChange={(e) => setCurrent(parseInt(e.target.value, 10))}
                placeholder="Enter New Current Price"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="reoderLevel"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Reorder Level:
              </label>
              <input
                type="reoderLevel"
                name="reoderLevel"
                id="reoderLevel"
                value={product.reoderLevel}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="minimum"
                id="reoderLevel"
                value={reoderLevel || ""}
                required
                onChange={(e) => setReoderLevel(parseInt(e.target.value, 10))}
                placeholder="Enter New Reoder Level"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="unitCost"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Unit Cost:
              </label>
              <input
                type="number"
                name="unitCost"
                id="unitCost"
                value={product.unitCost}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="unitCost"
                id="unitCost"
                value={unitCost || ""}
                required
                onChange={(e) => setUnitCost(parseInt(e.target.value, 10))}
                placeholder="Enter New UnitCost"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="sellingPrice"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Selling Price:
              </label>
              <input
                type="number"
                name="sellingPrice"
                id="sellingPrice"
                value={product.sellingPrice}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="sellingPrice"
                id="sellingPrice"
                value={sellingPrice || ""}
                required
                onChange={(e) => setSellingPrice(parseInt(e.target.value, 10))}
                placeholder="Enter New Selling Price"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taxInformation"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Tax Information:
              </label>
              <input
                type="number"
                name="taxInformation"
                id="taxInformation"
                value={product.taxInformation}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="taxInformation"
                id="taxInformation"
                value={taxInformation || ""}
                required
                onChange={(e) =>
                  setTaxInformation(parseInt(e.target.value, 10))
                }
                placeholder="Enter New Tax Information"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="imageURL"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Image URL:
              </label>
              <input
                type="text"
                name="imageURL"
                id="imageURL"
                value={product.imageURL}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="imageURL"
                id="imageURL"
                value={imageURL || ""}
                required
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Enter New Image URL"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="supplier"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Product Supplier:
              </label>
              <input
                type="text"
                name="supplier"
                id="supplier"
                value={product.supplier}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="supplier"
                id="supplier"
                value={supplier || ""}
                required
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="Enter New Supplier"
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
