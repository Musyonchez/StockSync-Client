import React, { useCallback, useEffect, useState } from "react";

// Define the props interface
interface HeaderOrderInputProps {
  onUpdate: (data: any) => void;
}

const HeaderOrderInput: React.FC<HeaderOrderInputProps> = ({ onUpdate }) => {
  // State to hold data from input fields
  const [headerData, setHeaderData] = useState({
    invoice: "",
    pONumber: "",
    delivaryNumber: "",
    deliveryDate: "",
  });

  // Function to update headerData and notify parent component
  const updateHeaderData = (field: string, value: any) => {
    setHeaderData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Notify parent component
    onUpdate({ ...headerData, [field]: value });
  };

  const memoizedOnUpdate = useCallback(onUpdate, []);

  useEffect(() => {
    onUpdate({ ...headerData });
  }, [headerData, memoizedOnUpdate]);

  return (
    <div className="p-4 border rounded mb-4">
      <div className="text-lg font-bold mb-2">Header Details</div>

      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Invoice Number</h2>
        <input
          type="number"
          name="pONumber"
          value={headerData.invoice}
          onChange={(e) => updateHeaderData("invoice", e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Invoice Number"
        />
      </label>

      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">P.O Number</h2>
        <input
          type="number"
          name="pONumber"
          value={headerData.pONumber}
          onChange={(e) => updateHeaderData("pONumber", e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter P.O Number"
        />
      </label>

      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Delivery Number</h2>
        <input
          type="number"
          name="delivaryNumber"
          value={headerData.delivaryNumber}
          onChange={(e) => updateHeaderData("delivaryNumber", e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Delivery Number"
        />
      </label>

      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2"> Delivery Date</h2>
        <input
          type="date"
          name="deliveryDate"
          value={headerData.deliveryDate}
          onChange={(e) => updateHeaderData("deliveryDate", e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Delivery Date"
        />
      </label>

      {/* Add more input fields as needed */}
    </div>
  );
};

export default HeaderOrderInput;
