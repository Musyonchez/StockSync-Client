import Layout from "@/components/DynamicSaasPages/Layout";
import React from "react";

const selling = () => {
  return (
    <div>
      <Layout>
        <div className=" flex">
          <div className=" flex flex-1">
            <ul>
              <li>items</li>
            </ul>
          </div>
          <div className="flex-col flex-1">
            <div className=" flex">
              <input type="text" placeholder="Search Bar" />
              <p>total</p>
            </div>
            <div>
              <img src="your_dynamic_image_source" alt="Dynamic Image" />
            </div>
            <div>
              <button>Add Button</button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default selling;
