import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

interface BankDetailData {
  account: string;
  company: string;
  bankCode: string;
  branchCode: string;
  swiftCode: string;
}

interface BankInvoiceInputProps {
  onUpdate: (data: BankDetailData[]) => void;
}

const BankInvoiceInput: React.FC<BankInvoiceInputProps> = ({ onUpdate }) => {
  const [bankDetails, setBankDetails] = useState<BankDetailData[]>([
    {
      account: "",
      company: "",
      bankCode: "",
      branchCode: "",
      swiftCode: "",
    },
  ]);

  const updateBankDetailData = (
    index: number,
    field: keyof BankDetailData,
    value: string | number
  ) => {
    setBankDetails((prevBankDetails) => {
      const updatedBankDetails = [...prevBankDetails];
      updatedBankDetails[index] = {
        ...updatedBankDetails[index],
        [field]: value,
      };

      return updatedBankDetails;
    });

    onUpdate([...bankDetails]);
  };

  const addBankDetail = () => {
    setBankDetails((prevBankDetails) => [
      ...prevBankDetails,
      {
        account: "",
        company: "",
        bankCode: "",
        branchCode: "",
        swiftCode: "",
      },
    ]);

    onUpdate([...bankDetails]);
  };

  const removeBankDetail = (index: number) => {
    setBankDetails((prevBankDetails) => {
      const updatedBankDetails = [...prevBankDetails];
      updatedBankDetails.splice(index, 1);
      return updatedBankDetails;
    });

    onUpdate([...bankDetails]);
  };

  const memoizedOnUpdate = useCallback(onUpdate, []);

  useEffect(() => {
    memoizedOnUpdate([...bankDetails]);
  }, [bankDetails, memoizedOnUpdate]);

  return (
    <div>
      {bankDetails.map((bankDetail, index) => (
        <div key={index} className="p-4 border rounded mb-4">
          <h2 className="text-lg font-bold mb-4">BankDetail {index + 1}</h2>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Account</h2>
            <input
              type="text"
              value={bankDetail.account}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateBankDetailData(index, "account", e.target.value)
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Account"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">Company</h2>
            <input
              type="text"
              value={bankDetail.company}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateBankDetailData(index, "company", e.target.value)
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Company"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">BankCode</h2>
            <input
              type="text"
              value={bankDetail.bankCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateBankDetailData(index, "bankCode", e.target.value)
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter BankCode"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">BranchCode</h2>
            <input
              type="text"
              value={bankDetail.branchCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateBankDetailData(index, "branchCode", e.target.value)
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter BranchCode"
              required
            />
          </label>

          <label className="block mb-4">
            <h2 className="text-sm font-bold mb-2">SwiftCode</h2>
            <input
              type="text"
              value={bankDetail.swiftCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateBankDetailData(index, "swiftCode", e.target.value)
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter SwiftCode"
              required
            />
          </label>

          <button
            onClick={() => removeBankDetail(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove BankDetail
          </button>
        </div>
      ))}

      <button
        onClick={addBankDetail}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add New BankDetail
      </button>
    </div>
  );
};

export default BankInvoiceInput;
