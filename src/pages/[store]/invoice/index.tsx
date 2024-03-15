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
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const Index = () => {
  const [InvoiceData, setInvoiceData] = useState<InvoiceDataState>({
    header: {},
    vender: {},
    customer: {},
    shipping: {},
    products: [],
    bank: [],
  });

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
      </div>
    </Layout>
  );
};

export default Index;


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });


  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
