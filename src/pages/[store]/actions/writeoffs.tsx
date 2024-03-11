import Layout from "@/components/DynamicSaasPages/Layout";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsRequest } from "../../../actions/products/searchProducts";
import { RootState } from "../../../store/reducers/reducers";
import emptyProduct from "../../../../../../public/emptyProduct.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { writeoffProductsRequest } from "@/actions/products/writeoffProducts";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

const writeoff = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const userId = session?.user?.id;
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");

  const [total, setTotal] = useState(0);
  const [reason, setReason] = useState("");

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.searchproducts.data);
  const loading = useSelector(
    (state: RootState) => state.searchproducts.loading
  );
  const error = useSelector((state: RootState) => state.searchproducts.error);

  const writeoffProductResponse = useSelector(
    (state: RootState) => state.writeoffproducts.data
  );
  const [isWriteoffButtonActive, setIsWriteoffButtonActive] = useState(true);

  const handleSearch = (): void => {
    const filterArray = [{ field: "name", value: name }];

    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        searchProductsRequest(company as string, store as string, filterArray)
      );
    } else {
      console.error(`User does not have access to ${store}.`);
    }
  };

  const handleWriteoff = () => {
    // Implement the logic for handling the writeoff action here
    console.log("Writeoff action triggered");

    setIsWriteoffButtonActive(false);

    // Check if there are selected products
    if (selectedProducts.length === 0) {
      console.error("No products selected for writeoffing.");
      return;
    }

    // Create an array to store the filterArray for the writeoff mutation
    const writeofffilterArray: {
      productId: string;
      toSubtract: number;
      quantity: number;
    }[] = [];

    // Iterate through selected products to build the filterArray
    selectedProducts.forEach((selectedProduct) => {
      // Check if the selected product has a valid quantity
      if (selectedProduct.quantity <= 0) {
        console.error(`Invalid quantity for product ${selectedProduct.name}.`);
        return;
      }

      // Add product ID and quantity to the filterArray
      writeofffilterArray.push({
        productId: selectedProduct.id,
        toSubtract: selectedProduct.quantity,
        quantity: selectedProduct.quantity,
      });
    });

    // Assuming you're using TypeScript
    const firstName = session?.user?.firstName || "";
    const secondName = session?.user?.lastName || "";

    const name = `${firstName} || ${secondName}`;

    // Dispatch the writeoffProductsRequest action with the filterArray
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        writeoffProductsRequest(
          userId as string,
          name as string,
          company as string,
          store as string,
          total as number,
          reason as string,
          writeofffilterArray
        )
      );
    } else {
      console.error(`User does not have access to ${store}.`);
    }
    console.log("reason from writeoff.tsx", reason);
  };

  useEffect(() => {
    console.log("up", writeoffProductResponse);
    if (writeoffProductResponse) {
      console.log("down", writeoffProductResponse);

      // Once product data is available, proceed with image upload
      handleWriteoffButton();
    }
  }, [writeoffProductResponse]);

  const handleWriteoffButton = () => {
    if (writeoffProductResponse) {
      if (writeoffProductResponse) {
        setIsWriteoffButtonActive(true);
      } else {
        alert("Failed to run the writeoff");
      }
    }
  };

  useEffect(() => {
    const calculatedTotal = selectedProducts.reduce((acc, product) => {
      const productTotal = product.quantity * (product.sellingPrice || 0);
      return acc + productTotal;
    }, 0);
    setTotal(calculatedTotal);
  }, [selectedProducts]);

  const addSelected = (productId: string) => {
    // Add logic to determine whether the product is already selected
    const isProductSelected = selectedProducts.some(
      (selectedProduct) => selectedProduct?.id === productId
    );

    if (!isProductSelected) {
      const selectedProduct = products.find(
        (product) => product.id === productId
      );

      if (selectedProduct && selectedProduct.current !== 0) {
        // Add the 'quantity' property with a default value of 1
        const productWithQuantity = { ...selectedProduct, quantity: 1 };

        setSelectedProducts((prevSelected) => [
          ...(prevSelected as Product[]),
          productWithQuantity,
        ]);
      } else {
        // Optionally, handle the case where no product is found
        console.error(
          `Product with id ${productId} not found Or has 0 quantity.`
        );
      }
    }
  };

  const removeSelected = (productId: string) => {
    // Filter out the product with the given productId
    const updatedSelectedProducts = selectedProducts.filter(
      (selectedProduct) => selectedProduct?.id !== productId
    );

    // Update the state with the filtered array
    setSelectedProducts(updatedSelectedProducts);
  };

  return (
    <Layout>
      <div className="flex w-full flex-col-reverse lg:flex-row lg:min-h-screen">
        <div className="w-full lg:w-1/2 p-4">
          {selectedProducts.length === 0 ? (
            <p className="text-lg text-center">Empty List</p>
          ) : (
            <>
              <div className=" flex justify-between items-center">
                <h1 className="text-lg text-center font-extrabold">
                  Recipt List
                </h1>
                <p className=" text-lg text-center font-bold">Total: {total}</p>
              </div>
              <ul className="space-y-4">
                {selectedProducts?.map((selectedProduct: Product) => (
                  <li
                    key={selectedProduct.id}
                    className="relative pt-5 text-lg flex items-center h-full w-full justify-between font-semibold"
                  >
                    <img
                      src={selectedProduct.imageURL}
                      alt="Product Image"
                      className="w-24 h-24"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                        (e.target as HTMLImageElement).src = emptyProduct.src; // Corrected line
                      }}
                    />
                    <div className="ml-4">
                      <p>Name: {selectedProduct.name}</p>
                      <p>Category: {selectedProduct.category}</p>
                      <p>Price: {selectedProduct.sellingPrice}</p>
                      <div className="flex items-center">
                        <p className=" mr-3">Quantity: </p>
                        <button
                          className=" w-7 h-7"
                          onClick={() =>
                            setSelectedProducts((prevSelected) => {
                              const updatedSelectedProducts = prevSelected.map(
                                (product) =>
                                  product.id === selectedProduct.id &&
                                  product.quantity > 1
                                    ? {
                                        ...product,
                                        quantity: product.quantity - 1,
                                      }
                                    : product
                              );
                              return updatedSelectedProducts;
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>

                        <input
                          type="number"
                          value={selectedProduct.quantity}
                          className="w-full mx-3"
                          required
                          onChange={(e) =>
                            setSelectedProducts((prevSelected) => {
                              const updatedSelectedProducts = prevSelected.map(
                                (product) =>
                                  product.id === selectedProduct.id
                                    ? {
                                        ...product,
                                        quantity: Math.max(
                                          1,
                                          Math.min(
                                            parseInt(e.target.value, 10),
                                            product.current
                                          )
                                        ),
                                      }
                                    : product
                              );
                              return updatedSelectedProducts;
                            })
                          }
                        />

                        <button
                          className=" w-7 h-7"
                          onClick={() =>
                            setSelectedProducts((prevSelected) => {
                              const updatedSelectedProducts = prevSelected.map(
                                (product) =>
                                  product.id === selectedProduct.id
                                    ? {
                                        ...product,
                                        quantity: Math.max(
                                          1,
                                          Math.min(
                                            product.quantity + 1,
                                            product.current
                                          )
                                        ),
                                      }
                                    : product
                              );
                              return updatedSelectedProducts;
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                      <p>
                        Amount:{" "}
                        {selectedProduct.quantity *
                          selectedProduct.sellingPrice}
                      </p>
                    </div>
                    <button
                      className="absolute top-0 right-0 flex justify-end items-start bg-red-500 px-2 rounded-md"
                      onClick={() => removeSelected(selectedProduct.id)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <div className=" flex flex-col justify-end items-end space-x-4">
                <div className=" w-full sm:w-3/4 lg:w-full flex my-3">
                  <textarea
                    placeholder="Enter a Reason for writeoff"
                    value={reason}
                    required
                    onChange={(e) => setReason(e.target.value)}
                    className="flex-grow rounded-md py-2 px-4 border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-base"
                  />
                </div>
                <button
                  className={`${
                    isWriteoffButtonActive
                      ? "bg-emerald-600 hover:bg-emerald-800"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white px-4 py-2 rounded-md`}
                  disabled={!isWriteoffButtonActive}
                  onClick={handleWriteoff}
                >
                  Writeoff
                </button>
              </div>
            </>
          )}
        </div>

        <div className="w-full lg:w-1/2 p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter a product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-grow rounded-md py-2 px-4 border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-base"
              />
              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white rounded-md px-4 py-2"
              >
                Search
              </button>
            </div>
            <div>
              {loading ? (
                <p className="text-lg text-center text-black">Loading...</p>
              ) : products.length === 0 ? (
                <p className="text-lg text-center text-black">
                  No products found.
                </p>
              ) : (
                <ul>
                  {products?.map((product: Product) => (
                    <li
                      key={product.id}
                      onClick={() => addSelected(product.id)}
                      className="text-lg flex items-center font-semibold"
                    >
                      <img
                        src={product.imageURL}
                        alt="Product Image"
                        className="w-24 h-24"
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                          (e.target as HTMLImageElement).src = emptyProduct.src; // Corrected line
                        }}
                      />
                      <div>
                        <p>Name: {product.name}</p>
                        <p>Category: {product.category}</p>
                        <p>Quantity: {product.current}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default writeoff;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
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
  return {
    props: { session },
  };
}
