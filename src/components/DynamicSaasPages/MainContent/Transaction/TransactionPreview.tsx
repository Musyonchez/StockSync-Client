import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { TransactionDataState } from "@/types/next-auth";
import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";


interface TransactionPreviewProps {
  transactionData: TransactionDataState;
}

const TransactionPreview: React.FC<TransactionPreviewProps> = ({
  transactionData,
}) => {
  const {
    companyLogo,
    id,
    createdAt,
    creatorId,
    creatorName,
    totalAmount,
    details,
  } = transactionData;
  
  const [showImageError, setShowImageError] = useState(false);
  const [imageMessage, setImageMessage] = useState("");

  const downloadPdf = async () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;

    doc.setFontSize(15);

    doc.text("Transactions Report", 120, 15);

    doc.setFontSize(10);

    const fetch = require("node-fetch");

    async function isImageValid(url: string) {
      try {
        const response = await fetch(url);
        const contentType = response.headers.get("content-type");
        return contentType && contentType.startsWith("image/");
      } catch (error) {
        setImageMessage("Failed to fetch image:" + (error as Error).message);
        setShowImageError(true);
        return false;
      }
    }

    // Example usage
    const fallbackUrl = "https://i.ibb.co/GnmS8Wj/Logo-tower-black.png";

    const valid = await isImageValid(companyLogo);
    const logoUrl = valid ? companyLogo : fallbackUrl;

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

    doc.text(`Transaction Id: ${id}`, 150, 25, { maxWidth: 90 });
    doc.text(`Created At: ${createdAt}`, 150, 30, { maxWidth: 90 });
    doc.text(`Creator Id: ${creatorId}`, 150, 35, { maxWidth: 90 });
    doc.text(`Creator Name: ${creatorName}`, 150, 40, { maxWidth: 90 });
    doc.text(`Total Amount: ${totalAmount}`, 150, 45, { maxWidth: 90 });

    doc.text("Id", 15, 55);
    doc.text("Name", 65, 55);
    doc.text("Category", 105, 55);
    doc.text("Supplier", 130, 55);
    doc.text("UnitCost", 160, 55);
    doc.text("SellingPrice", 185, 55);
    doc.text("TaxInformation", 210, 55);
    doc.text("Current", 235, 55);
    doc.text("Quantity", 260, 55);
    doc.line(15, 57, 285, 57);

    let yPosition = 63;
    details.forEach((detail, index) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;

        doc.text("Id", 15, yPosition);
        doc.text("Name", 65, yPosition);
        doc.text("Category", 105, yPosition);
        doc.text("Supplier", 130, yPosition);
        doc.text("UnitCost", 160, yPosition);
        doc.text("SellingPrice", 185, yPosition);
        doc.text("TaxInformation", 210, yPosition);
        doc.text("Current", 235, yPosition);
        doc.text("Quantity", 260, yPosition);
        doc.line(15, yPosition + 2, 285, yPosition + 2);

        yPosition = 27;
      }

      doc.text(detail.id, 15, yPosition, { maxWidth: 49 });
      doc.text(detail.name, 65, yPosition, { maxWidth: 39 });
      doc.text(detail.category, 105, yPosition, { maxWidth: 24 });
      doc.text(detail.supplier.toString(), 130, yPosition, { maxWidth: 29 });
      doc.text(detail.unitCost.toString(), 160, yPosition, { maxWidth: 24 });
      doc.text(detail.sellingPrice.toString(), 185, yPosition, {
        maxWidth: 24,
      });
      doc.text(detail.taxInformation.toString(), 210, yPosition, {
        maxWidth: 24,
      });
      doc.text(detail.current.toString(), 235, yPosition, { maxWidth: 24 });
      doc.text(detail.quantity.toString(), 260, yPosition, { maxWidth: 34 });

      yPosition += 10;
    });

    doc.save("transaction.pdf");
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        onClick={downloadPdf}
      >
        Download PDF
      </button>
      {showImageError && (
        <ErrorMessagePopup
          message={imageMessage}
          onClose={() => setShowImageError(false)}
        />
      )}
    </div>
  );
};

export default TransactionPreview;
