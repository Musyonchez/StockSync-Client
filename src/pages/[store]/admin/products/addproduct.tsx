import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductRequest } from "../../../../actions/products/addProduct";
import { RootState } from "../../../../store/reducers/reducers";
import { Product } from "../../../../types/product"; // Import the Product type

// import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

interface DynamicRouteParams {
  store: string;
  userID: string;
}

const AddProduct = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.addproduct.data);
  const loading = useSelector((state: RootState) => state.addproduct.loading);
  const error = useSelector((state: RootState) => state.addproduct.error);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (session?.user && (session.user as User)[store] === true && company) {
        dispatch(
          addProductRequest(
            name,
            description,
            category,
            company,
            store // Assuming 'store' is the correct variable for the product type
          )
        );

        setName("");
        setDescription("");
        setCategory("");
      } else {
        console.error(`User does not have access to ${store}.`);
      }
      // Handle success if needed
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (image && product) {
      // Once product data is available, proceed with image upload
      handleImageUpload();
    }
  }, [product]);

  const handleImageUpload = async () => {
    try {
      if (image && product) {
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
    } catch (error) {
      console.error("Error uploading image:", error);
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
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
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
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Product Group:
              </label>
              <input
                type="text"
                name="group"
                id="group"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Product Group"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              >
                Product Image:
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                placeholder="Enter Product Image"
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
        destination: `/${store}`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}