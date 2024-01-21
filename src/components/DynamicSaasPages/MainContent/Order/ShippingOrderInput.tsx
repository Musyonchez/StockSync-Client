import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

interface ShippingData {
  shippingVia: string;
  shippingMethod: string;
  shippingTerms: string;
  deliveryDate: string;
  shippingAmount: number;
}

interface ShippingOrderInputProps {
  onUpdate: (data: ShippingData) => void;
}

const ShippingOrderInput: React.FC<ShippingOrderInputProps> = ({
  onUpdate,
}) => {
  const [shippingData, setShippingData] = useState<ShippingData>({
    shippingVia: "",
    shippingMethod: "",
    shippingTerms: "",
    deliveryDate: "",
    shippingAmount: 0,
  });

  const updateShippingData = (
    field: keyof ShippingData,
    value: string | number
  ) => {
    setShippingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    onUpdate({ ...shippingData, [field]: value });
  };

  const memoizedOnUpdate = useCallback(onUpdate, []);

  useEffect(() => {
    onUpdate({ ...shippingData });
  }, [shippingData, memoizedOnUpdate]);

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-4">Shipping Details</h2>

      {/* Shipping Via */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Shipping Via</h2>
        <input
          type="text"
          name="shippingVia"
          value={shippingData.shippingVia}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateShippingData("shippingVia", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Shipping Via"
        />
      </label>

      {/* Shipping Method */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Shipping Method</h2>
        <input
          type="text"
          name="shippingMethod"
          value={shippingData.shippingMethod}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateShippingData("shippingMethod", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Shipping Method"
        />
      </label>

      {/* Shipping Terms */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Shipping Terms</h2>
        <input
          type="text"
          name="shippingTerms"
          value={shippingData.shippingTerms}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateShippingData("shippingTerms", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Shipping Terms"
        />
      </label>

      {/* Delivery Date */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Delivery Date</h2>
        <input
          type="date"
          name="deliveryDate"
          value={shippingData.deliveryDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateShippingData("deliveryDate", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Delivery Date"
        />
      </label>

      {/* Shipping Amount */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Shipping Amount</h2>
        <input
          type="number"
          name="shippingAmount"
          value={shippingData.shippingAmount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateShippingData("shippingAmount", parseFloat(e.target.value))
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Shipping Amount"
        />
      </label>
    </div>
  );
};

export default ShippingOrderInput;
