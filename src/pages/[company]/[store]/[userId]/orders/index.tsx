import React, { useState } from "react";
import Layout from "@/components/DynamicSaasPages/Layout";
import CustomerOrderInput from "@/components/DynamicSaasPages/MainContent/Order/CustomerOrderInput";
import HeaderOrderInput from "@/components/DynamicSaasPages/MainContent/Order/HeaderOrderInput";
import OrderPreview from "@/components/DynamicSaasPages/MainContent/Order/OrderPreview";
import ProductsOrderInput from "@/components/DynamicSaasPages/MainContent/Order/ProductsOrderInput";
import ShippingOrderInput from "@/components/DynamicSaasPages/MainContent/Order/ShippingOrderInput";
import VenderOrderInput from "@/components/DynamicSaasPages/MainContent/Order/VenderOrderInput";
import { OrderDataState } from "@/types/next-auth";


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
  const [orderData, setOrderData] = useState<OrderDataState>({
    header: {},
    vender: {},
    customer: {},
    shipping: {},
    products: [],
  });

  // Function to update orderData based on input component
  const updateOrderData = (section: string, data: any) => {
    setOrderData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  return (
    <Layout>
      <div className="">
        <h1 className="flex w-full text-2xl font-bold my-4 justify-center">
          Purchase Order
        </h1>
        <HeaderOrderInput
          onUpdate={(data) => updateOrderData("header", data)}
        />
        <VenderOrderInput
          onUpdate={(data) => updateOrderData("vender", data)}
        />
        <CustomerOrderInput
          onUpdate={(data) => updateOrderData("customer", data)}
        />
        <ShippingOrderInput
          onUpdate={(data) => updateOrderData("shipping", data)}
        />
        <ProductsOrderInput
          onUpdate={(data) => updateOrderData("products", data)}
        />
        <OrderPreview orderData={orderData} />
        {/* <OrderPreview /> */}
      </div>
    </Layout>
  );
};

export default Index;
