import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/DynamicSaasPages/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../../../../actions/products/fetchProduct";
import { deleteProductRequest } from "../../../../../actions/products/deleteProduct";
import { deactivateProductRequest } from "../../../../../actions/products/deactivateProduct";
import { RootState } from "../../../../../store/reducers/reducers";
import { Product } from "../../../../../types/product"; // Import the Product type

import emptyProduct from "../../../../../../public/emptyProduct.jpg";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";
interface DynamicRouteParams {
  store: string;
  userID: string;
}

const ProductDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const productId = router.query?.productId as string; // Ensure company is always a string
  const { pathname, query } = router;
  const [isActiveButtonActive, setIsActiveButtonActive] = useState(true);
  const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(true);

  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product.data);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const [productMessage, setProductMessage] = useState("");
  const [showProductError, setShowProductError] = useState(false);

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const [showError, setShowError] = useState(true);

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
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  }, [dispatch, company, store, productId]);

  const handleDeactivate = async () => {
    setIsActiveButtonActive(false);

    try {
      if (session?.user && (session.user as User)[store] === true && company) {
        dispatch(
          deactivateProductRequest(
            productId,
            company,
            store // Assuming 'store' is the correct variable for the product type
          )
        );
      } else {
        setStoreMessage(`User does not have access to ${store}.`);
        setShowStoreError(true);
      }
      // Use router.push to navigate to the new URL structure
      router.push(`/${store}/admin/products/`).then(() => {
        window.location.reload();
      });
    } catch (error) {}
  };

  const handleDelete = async () => {
    setIsDeleteButtonActive(false);

    try {
      if (session?.user && (session.user as User)[store] === true && company) {
        if (product?.firstRecordAction === false) {
          dispatch(
            deleteProductRequest(
              productId,
              company,
              store // Assuming 'store' is the correct variable for the product type
            )
          );

          const userId = query.userId;

          // Use router.push to navigate to the new URL structure
          router.push(`/${store}/admin/products/`).then(() => {
            window.location.reload();
          });
        } else {
          setProductMessage("Product has a transaction hence can't delete");
          setShowProductError(true);
        }
      } else {
        setStoreMessage(`User does not have access to ${store}.`);
        setShowStoreError(true);
      }
    } catch (error) {
      setProductMessage("Error deleting product: " + (error as Error).message);
      setShowProductError(true);
    }
  };

  const handleActivate = async () => {
    setIsActiveButtonActive(false);
    try {
      if (session?.user && (session.user as User)[store] === true && company) {
        dispatch(
          deactivateProductRequest(
            productId,
            company,
            store // Assuming 'store' is the correct variable for the product type
          )
        );

        const userId = query.userId;

        // Use router.push to navigate to the new URL structure
        router.push(`/${store}/admin/products/`).then(() => {
          window.location.reload();
        });
      } else {
        setStoreMessage(`User does not have access to ${store}.`);
        setShowStoreError(true);
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">
            Product Details
          </h2>
          <span className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Link href={`${router.asPath}/editproduct`}>Edit</Link>
            </button>
            <button
              onClick={product?.active ? handleDeactivate : handleActivate}
              className={`${
                isActiveButtonActive
                  ? product?.active
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-4 py-2 rounded`}
              disabled={!isActiveButtonActive}
            >
              {product?.active
                ? isActiveButtonActive
                  ? "Deactivate"
                  : "Deactivating..."
                : isActiveButtonActive
                ? "Activate"
                : "Activating"}
            </button>

            {!product?.active && (
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
        <div>
          {product && (
            <div
              className="bg-white dark:bg-gray-800 p-4 border rounded"
              key={product.id}
            >
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
                  name="category"
                  id="category"
                  value={product.category}
                  readOnly
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="current"
                  className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
                >
                  Current Quantity:
                </label>
                <input
                  type="number"
                  name="current"
                  id="current"
                  value={product.current}
                  readOnly
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reorderLevel"
                  className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
                >
                  Reorder Quantity:
                </label>
                <input
                  type="number"
                  name="reorderLevel"
                  id="reorderLevel"
                  value={product.reorderLevel}
                  readOnly
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
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
                >
                  Image:
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
              </div>

              <div className="mb-4">
                <label
                  htmlFor="supplier"
                  className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
                >
                  Supplier:
                </label>
                <input
                  type="text"
                  name="supplier"
                  id="supplier"
                  value={product.supplier}
                  readOnly
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {error && showError && (
        <ErrorMessagePopup
          message={error}
          onClose={() => setShowError(false)}
        />
      )}
      {loading && <LoadingMessagePopup />}
      {showStoreError && (
        <ErrorMessagePopup
          message={storeMessage}
          onClose={() => setShowStoreError(false)}
        />
      )}
       {showProductError && (
        <ErrorMessagePopup
          message={productMessage}
          onClose={() => setShowProductError(false)}
        />
      )}
    </Layout>
  );
};

export default ProductDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, params } = context;
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { store } = params as unknown as DynamicRouteParams;

  if (session.user.role !== "ADMIN") {
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
