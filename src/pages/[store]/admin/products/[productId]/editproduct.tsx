import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../../../../actions/products/fetchProduct";
import { editProductRequest } from "../../../../../actions/products/editProduct";
import { RootState } from "../../../../../store/reducers/reducers";
import { Product } from "../../../../../types/product"; // Import the Product type

import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import emptyProduct from "../../../../../../public/emptyProduct.jpg";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

interface DynamicRouteParams {
  store: string;
  userID: string;
}

const ProductDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const productId = router.query?.productId as string;

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    reorderLevel: 0,
    unitCost: 0,
    sellingPrice: 0,
    taxInformation: 0,
    supplier: "",
  });

  const [initialData, setInitialData] = useState({
    name: "",
    description: "",
    category: "",
    reorderLevel: 0,
    unitCost: 0,
    sellingPrice: 0,
    taxInformation: 0,
    supplier: "",
  });

  const [image, setImage] = useState<File | null>(null);

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
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        fetchProductRequest(
          productId as string,
          company as string,
          store as string
        )
      );
    } else {
      console.error(`User does not have access to ${store}.`);
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

    console.log("firstname", data.name);
    console.log("Initial Data:", initialData);
    console.log("Current Data:", data);

    const filterArray: { field: string; value: string }[] = [];

    Object.keys(data).forEach((key) => {
      const dataValue = data[key as keyof typeof data];
      const initialValue = initialData[key as keyof typeof initialData];

      // Special handling for boolean values and case sensitivity for strings
      if (typeof dataValue === "boolean" || typeof initialValue === "boolean") {
        if (dataValue !== initialValue) {
          filterArray.push({ field: key, value: dataValue.toString() });
        }
      } else if (
        typeof dataValue === "string" &&
        typeof initialValue === "string"
      ) {
        if (dataValue.toLowerCase() !== initialValue.toLowerCase()) {
          filterArray.push({ field: key, value: dataValue });
        }
      } else if (
        typeof dataValue === "number" ||
        typeof initialValue === "number"
      ) {
        if (dataValue !== initialValue) {
          filterArray.push({ field: key, value: dataValue.toString() });
        }
      } else {
        // For other types, use strict equality check
        if (dataValue !== initialValue) {
          filterArray.push({ field: key, value: dataValue.toString() });
        }
      }
    });

    console.log("Form submitted with changes:", filterArray);

    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        editProductRequest(
          productId as string,
          company as string,
          store as string,
          filterArray
        )
      );

      setData({
        name: "",
        description: "",
        category: "",
        reorderLevel: 0,
        unitCost: 0,
        sellingPrice: 0,
        taxInformation: 0,
        supplier: "",
      });
    } else {
      console.error(`User does not have access to ${store}.`);
    }

    if (image) {
      const formData = new FormData();
      const newImageName = product.id;

      // Append the file with the desired name
      formData.append("file", image, newImageName);
      if (company) {
        formData.append("company", company);
      } else {
        // Handle the case where company is undefined
        // For example, you might want to skip appending it or provide a default value
        console.error("Company is undefined, skipping append operation");
      }

      console.log(
        "file from fileupload rest api",
        image,
        newImageName,
        product
      );

      // Send a POST request to your REST API endpoint
      await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">Edit Product</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 border rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                value={data.name}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }))
                }
                placeholder="Enter New Product Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                value={data.description}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter New Product Description"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                value={data.category || ""}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    category: e.target.value,
                  }))
                }
                placeholder="Enter New Category"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="reorderLevel"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Reorder Level:
              </label>
              <input
                type="reorderLevel"
                name="reorderLevel"
                id="reorderLevel"
                value={product.reorderLevel}
                readOnly
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="minimum"
                id="reorderLevel"
                value={data.reorderLevel || ""}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    reorderLevel: +e.target.value,
                  }))
                }
                placeholder="Enter New reorder Level"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="unitCost"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                value={data.unitCost || ""}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    unitCost: +e.target.value,
                  }))
                }
                placeholder="Enter New UnitCost"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="sellingPrice"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                value={data.sellingPrice || ""}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    sellingPrice: +e.target.value,
                  }))
                }
                placeholder="Enter New Selling Price"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taxInformation"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                value={data.taxInformation || ""}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    taxInformation: +e.target.value,
                  }))
                }
                placeholder="Enter New Tax Information"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="imageURL"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Image URL:
              </label>
              <img
                src={product.imageURL}
                alt="Product Image"
                className="w-24 h-24"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                  (e.target as HTMLImageElement).src = emptyProduct.src; // Corrected line
                }}
              />

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                name="imageURL"
                id="imageURL"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                placeholder="Enter New Image URL"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="supplier"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                value={data.supplier || ""}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    supplier: e.target.value,
                  }))
                }
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, params } = context;
  const session = await getSession({ req });

  console.log("Server-side session:", session); // Add this line for debugging

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { store } = params as unknown as DynamicRouteParams;


  if (session.user.id !== "ADMIN") {
    return {
      redirect: {
        destination: `/${store}/dashboard`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
