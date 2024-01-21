import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

interface CustomerData {
  nameDept: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
}

interface CustomerOrderInputProps {
  onUpdate: (data: CustomerData) => void;
}

const CustomerOrderInput: React.FC<CustomerOrderInputProps> = ({
  onUpdate,
}) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    nameDept: "",
    companyName: "",
    address: "",
    phone: "",
    email: "",
  });

  const updateCustomerData = (field: keyof CustomerData, value: string) => {
    setCustomerData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    onUpdate({ ...customerData, [field]: value });
  };

  const memoizedOnUpdate = useCallback(onUpdate, []);

  useEffect(() => {
    onUpdate({ ...customerData });
  }, [customerData, memoizedOnUpdate]);

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-4">Customer Details</h2>

      {/* Name/Dept */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Name/Dept</h2>
        <input
          type="text"
          name="nameDept"
          value={customerData.nameDept}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateCustomerData("nameDept", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Name/Dept"
        />
      </label>

      {/* Company Name */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Company Name</h2>
        <input
          type="text"
          name="companyName"
          value={customerData.companyName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateCustomerData("companyName", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Company Name"
        />
      </label>

      {/* Address */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Address</h2>
        <input
          type="text"
          name="address"
          value={customerData.address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateCustomerData("address", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Address"
        />
      </label>

      {/* Phone */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Phone</h2>
        <input
          type="tel"
          name="phone"
          value={customerData.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateCustomerData("phone", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Phone"
        />
      </label>

      {/* Email */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Email</h2>
        <input
          type="email"
          name="email"
          value={customerData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateCustomerData("email", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Email"
        />
      </label>
    </div>
  );
};

export default CustomerOrderInput;
