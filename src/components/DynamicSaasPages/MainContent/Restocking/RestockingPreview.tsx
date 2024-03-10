import React from "react";
import { jsPDF } from "jspdf";
import { RestockingDataState } from "@/types/next-auth";

interface RestockingPreviewProps {
    restockingData: RestockingDataState;
}

const TransactionPreview: React.FC<RestockingPreviewProps> = ({ restockingData }) => {
    const { id, createdAt, creatorId, creatorName, details } = restockingData;
    const downloadPdf = () => {
        const doc = new jsPDF({
          orientation: "landscape", 
        });

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;
    
    doc.setFontSize(15);

    doc.text("Restocking Report", 120, 15);

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

    doc.text(`Transaction Id: ${id}`, 150, 25, { maxWidth: 90 });
    doc.text(`Created At: ${createdAt}`, 150, 30, { maxWidth: 90 });
    doc.text(`Creator Id: ${creatorId}`, 150, 35, { maxWidth: 90 });
    doc.text(`Creator Name: ${creatorName}`, 150, 40, { maxWidth: 90 });

    doc.text("Id", 15, 55);
    doc.text("Name", 65, 55);
    doc.text("Category", 105, 55);
    doc.text("Supplier", 135, 55);
    doc.text("UnitCost", 165, 55);
    doc.text("SellingPrice", 195, 55);
    doc.text("Current", 225, 55);
    doc.text("Quantity", 255, 55);
    doc.line(15, 57, 285, 57);

    let yPosition = 63;
    details.forEach((detail, index) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;

        doc.text("Id", 15, yPosition);
        doc.text("Name", 65, yPosition);
        doc.text("Category", 105, yPosition);
        doc.text("Supplier", 135, yPosition);
        doc.text("UnitCost", 165, yPosition);
        doc.text("SellingPrice", 195, yPosition);
        doc.text("Current", 225, yPosition);
        doc.text("Quantity", 255, yPosition);
        doc.line(15, yPosition + 2, 285, yPosition + 2);

        yPosition = 27;
      }

      doc.text(detail.id, 15, yPosition, { maxWidth: 49 });
      doc.text(detail.name, 65, yPosition, { maxWidth: 39 });
      doc.text(detail.category, 105, yPosition, { maxWidth: 29 });
      doc.text(detail.supplier.toString(), 135, yPosition, { maxWidth: 29 });
      doc.text(detail.unitCost.toString(), 165, yPosition, { maxWidth: 29 });
      doc.text(detail.sellingPrice.toString(), 195, yPosition, { maxWidth: 29 });
      doc.text(detail.current.toString(), 225, yPosition, { maxWidth: 29 });
      doc.text(detail.quantity.toString(), 255, yPosition, { maxWidth: 29 });

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
    </div>
  );
};

export default TransactionPreview;
