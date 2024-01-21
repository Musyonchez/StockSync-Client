import React, { useState } from "react";
import Layout from "@/components/DynamicSaasPages/Layout";
import BankInvoiceInput from "@/components/DynamicSaasPages/MainContent/Invoice/BankInvoiceInput";
import { InvoiceDataState } from "@/types/next-auth";
import HeaderInvoiceInput from "@/components/DynamicSaasPages/MainContent/Invoice/HeaderInvoiceInput";
import VenderInvoiceInput from "@/components/DynamicSaasPages/MainContent/Invoice/VenderInvoiceInput";
import CustomerInvoiceInput from "@/components/DynamicSaasPages/MainContent/Invoice/CustomerInvoiceInput";
import InvoicePreview from "@/components/DynamicSaasPages/MainContent/Invoice/InvoicePreview";
import ProductsInvoiceInput from "@/components/DynamicSaasPages/MainContent/Invoice/ProductsInvoiceInput";
import ShippingInvoiceInput from "@/components/DynamicSaasPages/MainContent/Invoice/ShippingInvoiceInput";

// // Define the type for the orderData state
// interface OrderDataState {
//   header: any;
//   vender: any;
//   customer: any;
//   shipping: any;
//   products: any[];
// }

const Index = () => {
  // State to hold data from input components
  const [InvoiceData, setInvoiceData] = useState<InvoiceDataState>({
    header: {},
    vender: {},
    customer: {},
    shipping: {},
    products: [],
    bank: [],
  });

  // Function to update orderData based on input component
  const updateInvoiceData = (section: string, data: any) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  return (
    <Layout>
      <div className="">
        <h1 className="flex w-full text-2xl font-bold my-4 justify-center">
          Invoice
        </h1>
        <HeaderInvoiceInput
          onUpdate={(data) => updateInvoiceData("header", data)}
        />
        <VenderInvoiceInput
          onUpdate={(data) => updateInvoiceData("vender", data)}
        />
        <CustomerInvoiceInput
          onUpdate={(data) => updateInvoiceData("customer", data)}
        />
        <ShippingInvoiceInput
          onUpdate={(data) => updateInvoiceData("shipping", data)}
        />
        <ProductsInvoiceInput
          onUpdate={(data) => updateInvoiceData("products", data)}
        />
        <BankInvoiceInput
          onUpdate={(data) => updateInvoiceData("bank", data)}
        />
        <InvoicePreview invoiceData={InvoiceData} />
        {/* <OrderPreview /> */}
      </div>
    </Layout>
  );
};

export default Index;
