import Layout from "@/components/DynamicSaasPages/Layout";
import React, { useState } from "react";
import { Product } from "@/types/product";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsRequest } from "../../../../../actions/products/searchProducts";
import { RootState } from "../../../../../store/reducers/reducers";

const selling = () => {
  const router = useRouter();
  const company = router.query?.company as string; // Ensure company is always a string
  const store = router.query?.store as string;
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.searchproducts.data);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const handleSearch = () => {
    const filterArray = [{ field: "name", value: name }];

    if (company && store) {
      dispatch(
        searchProductsRequest(company as string, store as string, filterArray)
      );
    }
  };

  return (
    <div>
      <Layout>
        <div className=" flex">
          <div className=" flex flex-1">
            <ul>
              <li>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul>
                    {product?.map((product: Product) => (
                      <li key={product.id}>{product.name}</li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="flex-col flex-1">
            <div className=" flex">
              <input
                type="text"
                placeholder="Search Bar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
              <p>total</p>
            </div>
            <div>
              <img src="your_dynamic_image_source" alt="Dynamic Image" />
            </div>
            <div>
              <button>Add Button</button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default selling;
