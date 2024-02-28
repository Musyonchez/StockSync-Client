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
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [reorderQuantity, setReorderQuantity] = useState(0);
  const [minimumQuantity, setMinimumQuantity] = useState(0);
  const [costCurrent, setCostCurrent] = useState(0);
  const [costPrevious, setCostPrevious] = useState(0);

  const dispatch = useDispatch();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(
        addProductRequest(
          name,
          description,
          group,
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
      setGroup("");
      setCurrentQuantity(0);
      setReorderQuantity(0);
      setMinimumQuantity(0);
      setCostCurrent(0);
      setCostPrevious(0);

      // Handle success if needed
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <Layout>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-md w-full mx-auto px-4 pb-4 min-h-screen dark:bg-gray-800 bg-white rounded shadow-md">
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
                required
                onChange={(e) =>
                  setCurrentQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter Current Quantity"
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
                value={reorderQuantity || ""}
                required
                onChange={(e) =>
                  setReorderQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter Reorder Quantity"
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
                value={minimumQuantity || ""}
                required
                onChange={(e) =>
                  setMinimumQuantity(parseInt(e.target.value, 10))
                }
                placeholder="Enter Minimum Quantity"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
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
                required
                onChange={(e) => setCostCurrent(parseInt(e.target.value, 10))}
                placeholder="Enter Current Cost"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
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
                required
                onChange={(e) => setCostPrevious(parseInt(e.target.value, 10))}
                placeholder="Enter Previous Cost"
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
