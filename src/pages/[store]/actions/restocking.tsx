import Layout from "@/components/DynamicSaasPages/Layout";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsRequest } from "../../../actions/products/searchProducts";
import { RootState } from "../../../store/reducers/reducers";
import emptyProduct from "../../../../public/emptyProduct.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { restockingProductsRequest } from "@/actions/products/restockingProducts";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/types/user";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";

const Restocking = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const company = session?.user?.company;
  const store = router.query?.store as string;
  const userId = session?.user?.id;
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");

  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.searchproducts.data);
  const productsLoading = useSelector(
    (state: RootState) => state.searchproducts.loading
  );
  const productsError = useSelector(
    (state: RootState) => state.searchproducts.error
  );

  const restockingProductResponse = useSelector(
    (state: RootState) => state.restockingproducts.data
  );
  const restockingLoading = useSelector(
    (state: RootState) => state.restockingproducts.loading
  );
  const restockingError = useSelector(
    (state: RootState) => state.restockingproducts.error
  );

  const [showSelectedProductError, setShowSelectedProductError] =
    useState(false);
  const [selectedProductMessage, setSelectedProductMessage] = useState("");

  const [showStoreError, setShowStoreError] = useState(false);
  const [storeMessage, setStoreMessage] = useState("");

  const [showProductsError, setShowProductError] = useState(true);
  const [showRestockingError, setShowRestockingError] = useState(true);

  const [isRestockingButtonActive, setIsRestockingButtonActive] =
    useState(true);

  const handleSearch = (): void => {
    const filterArray = [{ field: "name", value: name }];

    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        searchProductsRequest(company as string, store as string, filterArray)
      );
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  };

  const handleRestocking = () => {
    // Implement the logic for handling the restocking action here

    setIsRestockingButtonActive(false);

    // Check if there are selected products
    if (selectedProducts.length === 0) {
      setSelectedProductMessage("No products selected for selling.");
      setShowSelectedProductError(true);
      return;
    }

    // Create an array to store the filterArray for the restocking mutation
    const restockingfilterArray: {
      productId: string;
      toAdd: number;
      quantity: number;
    }[] = [];

    // Iterate through selected products to build the filterArray
    selectedProducts.forEach((selectedProduct) => {
      // Check if the selected product has a valid quantity
      if (selectedProduct.quantity <= 0) {
        setSelectedProductMessage(
          `Invalid quantity for product ${selectedProduct.name}.`
        );
        setShowSelectedProductError(true);
        return;
      }

      // Add product ID and quantity to the filterArray
      restockingfilterArray.push({
        productId: selectedProduct.id,
        toAdd: selectedProduct.quantity,
        quantity: selectedProduct.quantity,
      });
    });

    // Assuming you're using TypeScript
    const firstName = session?.user?.firstName || "";
    const secondName = session?.user?.lastName || "";

    const name = `${firstName} || ${secondName}`;

    // Dispatch the restockingProductsRequest action with the filterArray
    if (session?.user && (session.user as User)[store] === true && company) {
      dispatch(
        restockingProductsRequest(
          userId as string,
          name as string,
          company as string,
          store as string,
          total as number,
          restockingfilterArray
        )
      );
     
    } else {
      setStoreMessage(`User does not have access to ${store}.`);
      setShowStoreError(true);
    }
  };

  useEffect(() => {
    if (restockingProductResponse) {
      // Once product data is available, proceed with image upload
      handleRestockingButton();
    }
  }, [restockingProductResponse]);

  const handleRestockingButton = () => {
    if (restockingProductResponse) {
      if (restockingProductResponse) {
        setIsRestockingButtonActive(true);
        setTotal(0);
        setSelectedProducts([]);
      } else {
        alert("Failed to run the restocking");
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

      if (selectedProduct) {
        // Add the 'quantity' property with a default value of 1
        const productWithQuantity = { ...selectedProduct, quantity: 1 };

        setSelectedProducts((prevSelected) => [
          ...(prevSelected as Product[]),
          productWithQuantity,
        ]);
      } else {
        setSelectedProductMessage(
          `Product with id ${productId} is not selected.` //this is because removing the if statement will cause an error i dont know how to fix
        );
        setShowSelectedProductError(true);
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
                    className="relative text-lg flex items-center h-full w-full justify-between font-semibold"
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
                                          parseInt(e.target.value, 10)
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
                                          product.quantity + 1
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
              <div className=" flex justify-end items-end space-x-4">
                <button
                  className={`${
                    isRestockingButtonActive
                      ? "bg-emerald-600 hover:bg-emerald-800"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white px-4 py-2 rounded-md`}
                  disabled={!isRestockingButtonActive}
                  onClick={handleRestocking}
                >
                  Restock
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
              {productsLoading ? (
                <p className="text-lg text-center dark:text-white text-black">
                  Loading...
                </p>
              ) : products.length === 0 ? (
                <p className="text-lg text-center dark:text-white text-black">
                  No products found.
                </p>
              ) : (
                <ul>
                  {products?.map((product: Product) => (
                    <li
                      key={product.id}
                      onClick={() => addSelected(product.id)}
                      className="text-lg flex items-center justify-between font-semibold"
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
      {productsError && showProductsError && (
        <ErrorMessagePopup
          message={productsError}
          onClose={() => setShowProductError(false)}
        />
      )}
      {productsLoading && <LoadingMessagePopup />}
      {restockingError && showRestockingError && (
        <ErrorMessagePopup
          message={restockingError}
          onClose={() => setShowRestockingError(false)}
        />
      )}
      {restockingLoading && <LoadingMessagePopup />}
      {showStoreError && (
        <ErrorMessagePopup
          message={storeMessage}
          onClose={() => setShowStoreError(false)}
        />
      )}
      {showSelectedProductError && (
        <ErrorMessagePopup
          message={selectedProductMessage}
          onClose={() => setShowSelectedProductError(false)}
        />
      )}
    </Layout>
  );
};

export default Restocking;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

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
