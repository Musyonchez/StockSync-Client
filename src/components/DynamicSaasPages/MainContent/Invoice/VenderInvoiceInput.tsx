import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

interface VendorData {
  contactName: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
}

interface VendorOrderInputProps {
  onUpdate: (data: VendorData) => void;
}

const VendorOrderInput: React.FC<VendorOrderInputProps> = ({ onUpdate }) => {
  const [vendorData, setVendorData] = useState<VendorData>({
    contactName: "",
    companyName: "",
    address: "",
    phone: "",
    email: "",
  });

  const updateVendorData = (field: keyof VendorData, value: string) => {
    setVendorData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    onUpdate({ ...vendorData, [field]: value });
  };

  const memoizedOnUpdate = useCallback(onUpdate, []);

  useEffect(() => {
    onUpdate({ ...vendorData });
  }, [vendorData, memoizedOnUpdate]);

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-4">Vendor Details</h2>

      {/* Contact Name */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Contact Name</h2>
        <input
          type="text"
          name="contactName"
          value={vendorData.contactName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateVendorData("contactName", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Contact Name"
        />
      </label>

      {/* Company Name */}
      <label className="block mb-4">
        <h2 className="text-sm font-bold mb-2">Company Name</h2>
        <input
          type="text"
          name="companyName"
          value={vendorData.companyName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateVendorData("companyName", e.target.value)
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
          value={vendorData.address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateVendorData("address", e.target.value)
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
          value={vendorData.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateVendorData("phone", e.target.value)
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
          value={vendorData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateVendorData("email", e.target.value)
          }
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter Email"
        />
      </label>
    </div>
  );
};

export default VendorOrderInput;
