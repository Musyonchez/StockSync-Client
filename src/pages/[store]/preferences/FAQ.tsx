import React, { useState } from "react";
import Layout from "@/components/DynamicSaasPages/Layout";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const FAQ = () => {
    const faqData = [
        {
          question: "What is your product?",
          answer: "Our product is...",
        },
        {
          question: "How can I get started?",
          answer: "To get started...",
        },
        {
          question: "Is there a free trial?",
          answer: "Yes, we offer a free trial...",
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Certainly, you can cancel anytime...",
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards and PayPal...",
        },
        {
          question: "How do I contact support?",
          answer: "You can reach our support team at support@example.com...",
        },
        {
          question: "Do you have a mobile app?",
          answer: "Yes, we have a mobile app available for iOS and Android...",
        },
        {
          question: "What security measures do you have in place?",
          answer: "We prioritize the security of your data with...",
        },
        {
          question: "How often do you release updates?",
          answer: "We release updates regularly to improve...",
        },
        {
          question: "Can I upgrade my plan?",
          answer: "Certainly, you can upgrade your plan at any time...",
        },
      ];

      const [activeIndex, setActiveIndex] = useState<number | null>(null);

      const toggleAccordion = (index: number) => {
        setActiveIndex((prevIndex: number | null) => (prevIndex === index ? null : index));
      };
    

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h1>
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item border-b border-gray-300 py-4">
            <div
              className={`faq-question cursor-pointer ${
                index === activeIndex ? "text-blue-500" : "text-gray-800 dark:text-white"
              }`}
              onClick={() => toggleAccordion(index)}
            >
              {faq.question}
            </div>
            {index === activeIndex && (
              <div className="faq-answer text-gray-600 dark:text-white mt-2">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FAQ;

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
