import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

interface ProductData {
  code: string;
  productDescription: string;
  quantity: number;
  discount: number;
  tax: number;
  price: number;
  amount: number;
  total: number;
}

interface ProductsOrderInputProps {
  onUpdate: (data: ProductData[]) => void;
}

const ProductsOrderInput: React.FC<ProductsOrderInputProps> = ({
  onUpdate,
}) => {
  const [products, setProducts] = useState<ProductData[]>([
    {
      code: "",
      productDescription: "",
      quantity: 0,
      discount: 0,
      tax: 0,
      price: 0,
      amount: 0,
      total: 0,
    },
  ]);

  const updateProductData = (
    index: number,
    field: keyof ProductData,
    value: string | number
  ) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value,
      };

      const { price, quantity, tax, discount } = updatedProducts[index];
      const calculatedAmount = (
        price *
        quantity *
        (1 + tax / 100) *
        (1 - discount / 100)
      ).toFixed(2);
      updatedProducts[index].amount = parseFloat(calculatedAmount);

      const updatedTotal = updatedProducts.reduce(
        (acc, product) => acc + product.amount,
        0
      );

      updatedProducts.forEach((product) => {
        product.total = updatedTotal;
      });

      return updatedProducts;
    });

    onUpdate([...products]);
  };

  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        code: "",
        productDescription: "",
        quantity: 0,
        discount: 0,
        tax: 0,
        price: 0,
        amount: 0,
        total: 0,
      },
    ]);

    onUpdate([...products]);
  };

  const removeProduct = (index: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });

    onUpdate([...products]);
  };

  const memoizedOnUpdate = useCallback(onUpdate, []);

  useEffect(() => {
    onUpdate([...products]);
  }, [products, memoizedOnUpdate]);

  return (
    <div>
      {products.map((product, index) => (
        <div key={index} className="p-4 border rounded mb-4">
          <h2 className="text-lg font-bold mb-4">Product {index + 1}</h2>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Code</h2>
            <input
              type="text"
              value={product.code}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateProductData(index, "code", e.target.value)
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Code"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Product Description</h2>
            <input
              type="text"
              value={product.productDescription}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateProductData(index, "productDescription", e.target.value)
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Product Description"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Quantity</h2>
            <input
              type="number"
              value={product.quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateProductData(
                  index,
                  "quantity",
                  parseInt(e.target.value, 10)
                )
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Quantity"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Price</h2>
            <input
              type="number"
              value={product.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateProductData(index, "price", parseInt(e.target.value, 10))
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Price"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Discount %</h2>
            <input
              type="number"
              value={product.discount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateProductData(
                  index,
                  "discount",
                  parseInt(e.target.value, 10)
                )
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Discount"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Tax %</h2>
            <input
              type="number"
              value={product.tax}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateProductData(index, "tax", parseInt(e.target.value, 10))
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Tax"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Amount</h2>
            <span className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 bg-gray-100 dark:bg-gray-800">
              {product.amount.toFixed(2)}{" "}
            </span>
          </label>

          <button
            onClick={() => removeProduct(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove Product
          </button>
        </div>
      ))}

      <button
        onClick={addProduct}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add New Product
      </button>
    </div>
  );
};

export default ProductsOrderInput;
