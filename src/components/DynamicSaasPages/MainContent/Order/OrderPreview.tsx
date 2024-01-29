import React from "react";
import { jsPDF } from "jspdf";
import { OrderDataState } from "@/types/next-auth";

interface OrderPreviewProps {
  orderData: OrderDataState;
}

const OrderPreview: React.FC<OrderPreviewProps> = ({ orderData }) => {
  const { header, vender, customer, shipping, products } = orderData;
  const downloadPdf = () => {
    const doc = new jsPDF();

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;



    doc.setFontSize(15);

    doc.text("Purchase Order", 70, 15);

    doc.setFontSize(10);

    const logoUrl = "https://i.ibb.co/GnmS8Wj/Logo-tower-black.png";

    const logoxCoordinate = 15;
    const logoyCoordinate = 15;

    const logoimageWidth = 60;
    const logoimageHeight = 30;

    doc.addImage(
      logoUrl,
      "PNG",
      logoxCoordinate,
      logoyCoordinate,
      logoimageWidth,
      logoimageHeight
    );

    doc.text(`P.O Number: ${header.pONumber}`, 110, 25, { maxWidth: 90 });
    doc.text(`Date: ${header.deliveryDate}`, 110, 35, { maxWidth: 90 });

    doc.text(`Contact: ${vender.contactName}`, 15, 50, { maxWidth: 90 });
    doc.text(`Company: ${vender.companyName}`, 15, 60, { maxWidth: 90 });
    doc.text(`Address: ${vender.address}`, 15, 70, { maxWidth: 90 });
    doc.text(`Phone: ${vender.phone}`, 15, 80, { maxWidth: 90 });
    doc.text(`Email: ${vender.email}`, 15, 90, { maxWidth: 90 });

    doc.text(`Name/Dept: ${customer.nameDept}`, 110, 50, { maxWidth: 90 });
    doc.text(`Company: ${customer.companyName}`, 110, 60, { maxWidth: 90 });
    doc.text(`Address: ${customer.address}`, 110, 70, { maxWidth: 90 });
    doc.text(`Phone: ${customer.phone}`, 110, 80, { maxWidth: 90 });
    doc.text(`Email: ${customer.email}`, 110, 90, { maxWidth: 90 });

    doc.text("ShippingVia", 15, 110);
    doc.text("ShippingMethod", 50, 110);
    doc.text("ShippingTerms", 85, 110);
    doc.text("ShippingAmount", 120, 110);
    doc.text("DeliveryDate", 155, 110);
    doc.line(15, 112, 195, 112);

    doc.text(`${shipping.shippingVia}`, 15, 117, { maxWidth: 30 });
    doc.text(`${shipping.shippingMethod}`, 50, 117, { maxWidth: 30 });
    doc.text(`${shipping.shippingTerms}`, 85, 117, { maxWidth: 30 });
    doc.text(`${shipping.shippingAmount}`, 120, 117, { maxWidth: 30 });
    doc.text(`${shipping.deliveryDate}`, 155, 117, { maxWidth: 30 });

    doc.text("#", 15, 135);
    doc.text("Code", 25, 135);
    doc.text("Description", 50, 135);
    doc.text("Quantity", 100, 135);
    doc.text("Disc %", 125, 135);
    doc.text("Tax %", 140, 135);
    doc.text("Price", 155, 135);
    doc.text("Total", 175, 135);
    doc.line(15, 137, 195, 137);

    let yPosition = 143;
    products.forEach((product, index) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;

        doc.text("#", 15, yPosition);
        doc.text("Code", 25, yPosition);
        doc.text("Description", 50, yPosition);
        doc.text("Quantity", 100, yPosition);
        doc.text("Disc %", 125, yPosition);
        doc.text("Tax %", 140, yPosition);
        doc.text("Price", 155, yPosition);
        doc.text("Total", 175, yPosition);
        doc.line(15, yPosition + 2, 195, yPosition + 2);

        yPosition = 27;
      }

      doc.text((index + 1).toString(), 15, yPosition, { maxWidth: 10 });
      doc.text(product.code, 25, yPosition, { maxWidth: 25 });
      doc.text(product.productDescription, 50, yPosition, { maxWidth: 50 });
      doc.text(product.quantity.toString(), 100, yPosition, { maxWidth: 25 });
      doc.text(product.discount.toString(), 125, yPosition, { maxWidth: 15 });
      doc.text(product.tax.toString(), 140, yPosition, { maxWidth: 15 });
      doc.text(product.price.toString(), 155, yPosition, { maxWidth: 20 });
      doc.text(product.amount.toString(), 175, yPosition, { maxWidth: 20 });

      yPosition += 10;
    });

    let totalPositiony = yPosition;

    if (totalPositiony > pageHeight - 50) {
      doc.addPage();
      totalPositiony = 20;

      doc.setFontSize(12);

      doc.text(`Total Amount:`, 125, totalPositiony + 5, { maxWidth: 45 });
      doc.text("KES", 160, totalPositiony + 5, { maxWidth: 45 });
      const totalAmount = products.reduce(
        (acc, product) => acc + product.amount,
        0
      );
      doc.text(totalAmount.toString(), 175, totalPositiony + 5, {
        maxWidth: 45,
      });

      doc.text(`Shipping:`, 135, totalPositiony + 13, { maxWidth: 45 });
      doc.text("KES", 160, totalPositiony + 13, { maxWidth: 45 });
      doc.text(`${shipping.shippingAmount}`, 175, totalPositiony + 13, {
        maxWidth: 45,
      });

      doc.text(`Total:`, 135, totalPositiony + 20, { maxWidth: 45 });
      doc.text("KES", 160, totalPositiony + 20, { maxWidth: 45 });
      const grandTotal = totalAmount + shipping.shippingAmount;
      doc.text(grandTotal.toString(), 175, totalPositiony + 20, {
        maxWidth: 45,
      });
    } else {
      doc.setFontSize(12);

      doc.text(`Total Amount:`, 125, totalPositiony + 5, { maxWidth: 45 });
      doc.text("KES", 160, totalPositiony + 5, { maxWidth: 45 });
      const totalAmount = products.reduce(
        (acc, product) => acc + product.amount,
        0
      );
      doc.text(totalAmount.toString(), 175, totalPositiony + 5, {
        maxWidth: 45,
      });

      doc.text(`Shipping:`, 135, totalPositiony + 13, { maxWidth: 45 });
      doc.text("KES", 160, totalPositiony + 13, { maxWidth: 45 });
      doc.text(`${shipping.shippingAmount}`, 175, totalPositiony + 13, {
        maxWidth: 45,
      });

      doc.text(`Total:`, 135, totalPositiony + 20, { maxWidth: 45 });
      doc.text("KES", 160, totalPositiony + 20, { maxWidth: 45 });
      const grandTotal = totalAmount + shipping.shippingAmount;
      doc.text(grandTotal.toString(), 175, totalPositiony + 20, {
        maxWidth: 45,
      });
    }

    doc.save("invoice.pdf");
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        onClick={downloadPdf}
      >
        Download PDF
      </button>
    </div>
  );
};

export default OrderPreview;
