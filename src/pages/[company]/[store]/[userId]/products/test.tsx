// test.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductRequest } from '../../../../../actions/productActions';
import { RootState } from '../../../../../store/reducers';
import Link from "next/link";
import { Product } from '../../../../../types/product'; // Import the Product type

const ExampleComponent: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.data);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  // Example values for company and type
  const company = 'yourCompany';
  const type = 'yourType';

  useEffect(() => {
    dispatch(fetchProductRequest(company, type));
    // ... rest of your useEffect
  }, [dispatch, company, type]);

  return (
    <div>
      <Link href="/test2">
        <p>Products</p>
      </Link>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {Array.isArray(products) && products.length > 0 ? (
        <div>
          <h2>Product Data</h2>
          <ul>
            {products.map((product: Product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <strong>ID:</strong> <br className=" sm:hidden" />{" "}
                <span className=" text-black">{product.id}</span>
                <br />
                <strong>Name:</strong> <br className=" sm:hidden" />{" "}
                <span className=" text-black">{product.name}</span>
                <br />
                <strong>Description:</strong> <br className=" sm:hidden" />{" "}
                <span className=" text-black">{product.description}</span>
                <br />
                <strong>Minimum Quantity:</strong> <br className=" sm:hidden" />{" "}
                <span className=" text-black">{product.minimumQuantity}</span>
                <br />
                <strong>Current Quantity:</strong> <br className=" sm:hidden" />{" "}
                <span className=" text-black">{product.currentQuantity}</span>
                <br />
                <strong>Reorder Quantity:</strong> <br className=" sm:hidden" />{" "}
                <span className=" text-black">{product.reorderQuantity}</span>
                <br />
                <strong>Current Cost:</strong> <br className=" sm:hidden" />{" "}
                <span className=" text-black">{product.costCurrent}</span>
                <br />
                <strong>Previous Cost:</strong> <br className=" sm:hidden" />{" "}
                <span className=" text-black">{product.costPrevious}</span>
  
                {/* Add other product information as needed */}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ExampleComponent;
