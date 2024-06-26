import React, { useCallback, useEffect, useState } from "react";

interface HeaderOrderInputProps {
  onUpdate: (data: any) => void;
}

const HeaderOrderInput: React.FC<HeaderOrderInputProps> = ({ onUpdate }) => {
  const [headerData, setHeaderData] = useState({
    pONumber: "",
    deliveryDate: "",
  });

  const updateHeaderData = (field: string, value: any) => {
    setHeaderData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

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
    </div>
  );
};

export default HeaderOrderInput;
