import React from "react";
import { jsPDF } from "jspdf";
import { InvoiceDataState } from "@/types/next-auth";
// import logo_black from '../../../../../public/logo-tower-black.png';

interface OrderPreviewProps {
  invoiceData: InvoiceDataState;
}

const OrderPreview: React.FC<OrderPreviewProps> = ({ invoiceData }) => {
  const { header, vender, customer, shipping, products, bank } = invoiceData;
  const downloadPdf = () => {
    const doc = new jsPDF();

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;

    console.log(`Maximum x-coordinate: ${pageWidth}`);
    console.log(`Maximum y-coordinate: ${pageHeight}`);

    // Business Information
    doc.setFontSize(15);

    //document title
    doc.text("Purchase Order", 70, 15);

    doc.setFontSize(12);

    // Assuming your logo URL is stored in a variable
    const logoUrl = "https://i.ibb.co/GnmS8Wj/Logo-tower-black.png";

    // Assuming your logo URL is stored in a variable
    // const logoUrl = logo_black;
    // const logoDataUrl = logoUrl.src;

    // Coordinates for placing the image
    const logoxCoordinate = 15; // Adjust as needed
    const logoyCoordinate = 15; // Adjust as needed

    // Dimensions of the image (width and height)
    const logoimageWidth = 60; // Adjust as needed
    const logoimageHeight = 30; // Adjust as needed

    // Add the image to the document
    doc.addImage(
      logoUrl,
      "PNG",
      logoxCoordinate,
      logoyCoordinate,
      logoimageWidth,
      logoimageHeight
    );

    // doc.text("Business Name", 15, 25);
    // doc.text('Albania, Tirane ish-Dogana, Durres 2001', 15, 30);
    // doc.text('(+355) 069 11 11 111', 15, 45);
    // doc.text('email@example.com', 15, 60);
    // doc.text('info@example.al', 15, 75);
    // doc.text('www.example.al', 15, 90);

    // Invoice Details
    doc.text(`P.O Number: ${header.pONumber}`, 110, 25, { maxWidth: 90 });
    doc.text(`Invoice Number: ${header.invoice}`, 110, 30, { maxWidth: 90 });
    doc.text(`Date: ${header.deliveryDate}`, 110, 35, { maxWidth: 90 });

    // Render Vender Details
    doc.text(`Contact: ${vender.contactName}`, 15, 50, { maxWidth: 90 });
    doc.text(`Company: ${vender.companyName}`, 15, 60, { maxWidth: 90 });
    doc.text(`Address: ${vender.address}`, 15, 70, { maxWidth: 90 });
    doc.text(`Phone: ${vender.phone}`, 15, 80, { maxWidth: 90 });
    doc.text(`Email: ${vender.email}`, 15, 90, { maxWidth: 90 });

    // Render Customer Details
    doc.text(`Name/Dept: ${customer.nameDept}`, 110, 50, { maxWidth: 90 });
    doc.text(`Company: ${customer.companyName}`, 110, 60, { maxWidth: 90 });
    doc.text(`Address: ${customer.address}`, 110, 70, { maxWidth: 90 });
    doc.text(`Phone: ${customer.phone}`, 110, 80, { maxWidth: 90 });
    doc.text(`Email: ${customer.email}`, 110, 90, { maxWidth: 90 });

    //Shipping Table Header
    doc.text("ShippingVia", 15, 110);
    doc.text("ShippingMethod", 50, 110);
    doc.text("ShippingTerms", 85, 110);
    doc.text("ShippingAmount", 120, 110);
    doc.text("DeliveryDate", 155, 110);
    doc.line(15, 112, 195, 112);

    //Shipping Table Details
    doc.text(`${shipping.shippingVia}`, 15, 117, { maxWidth: 30 });
    doc.text(`${shipping.shippingMethod}`, 50, 117, { maxWidth: 30 });
    doc.text(`${shipping.shippingTerms}`, 85, 117, { maxWidth: 30 });
    doc.text(`${shipping.shippingAmount}`, 120, 117, { maxWidth: 30 });
    doc.text(`${shipping.deliveryDate}`, 155, 117, { maxWidth: 30 });

    // // Invoice Details
    // doc.text('Invoice issued for:', 120, 15);

    // // Render Header Details
    // doc.text(`P.O. Number: ${header.pONumber}`, 120, 30);
    // doc.text(`Delivery Date: ${header.deliveryDate}`, 120, 45);

    // // Render Vender Details
    // doc.text(`Contact Name: ${vender.contactName}`, 120, 60);
    // doc.text(`Company Name: ${vender.companyName}`, 120, 75);

    // // Render Customer Details
    // doc.text(`Name/Dept: ${customer.nameDept}`, 120, 90);
    // doc.text(`Company Name: ${customer.companyName}`, 120, 105);

    // // Render Shipping Details
    // doc.text(`Shipping Via: ${shipping.shippingVia}`, 120, 120);
    // doc.text(`Shipping Method: ${shipping.shippingMethod}`, 120, 135);
    // doc.text(`Delivery Date: ${shipping.deliveryDate}`, 120, 150);

    // Table Header
    doc.text("#", 15, 135);
    doc.text("Code", 25, 135);
    doc.text("Description", 50, 135);
    doc.text("Quantity", 100, 135);
    doc.text("Disc %", 125, 135);
    doc.text("Tax %", 140, 135);
    doc.text("Price", 155, 135);
    doc.text("Total", 175, 135);
    doc.line(15, 137, 195, 137);

    // // Table Content
    // let yPosition = 143;
    // products.forEach((product, index) => {

    //   doc.text((index + 1).toString(), 15, yPosition, { maxWidth: 10 });
    //   doc.text(product.code, 25, yPosition, { maxWidth: 25 });
    //   doc.text(product.productDescription, 50, yPosition, { maxWidth: 50 });
    //   doc.text(product.quantity.toString(), 100, yPosition, { maxWidth: 25 });
    //   doc.text(product.discount.toString(), 125, yPosition, { maxWidth: 15 });
    //   doc.text(product.tax.toString(), 140, yPosition, { maxWidth: 15 });
    //   doc.text(product.price.toString(), 155, yPosition, { maxWidth: 20 });
    //   doc.text(product.amount.toString(), 175, yPosition, { maxWidth: 20 });

    //   yPosition += 10;
    // });

    // ... (Previous code remains unchanged)

    // Table Content
    let yPosition = 143;
    products.forEach((product, index) => {
      // Check if the current position exceeds the page height
      if (yPosition > pageHeight - 20) {
        // Add a new page
        doc.addPage();
        // Reset the yPosition for the new page
        yPosition = 20; // Adjust as needed

        // You might want to add headers or other content here for the new page
        // ...

        // // Continue with the table headers for the new page
        // doc.text("#", 15, yPosition);
        // doc.text("Code", 25, yPosition);
        // // ... (other headers)

        // doc.line(15, yPosition + 2, 195, yPosition + 2);

        doc.text("#", 15, yPosition);
        doc.text("Code", 25, yPosition);
        doc.text("Description", 50, yPosition);
        doc.text("Quantity", 100, yPosition);
        doc.text("Disc %", 125, yPosition);
        doc.text("Tax %", 140, yPosition);
        doc.text("Price", 155, yPosition);
        doc.text("Total", 175, yPosition);
        doc.line(15, yPosition + 2, 195, yPosition + 2);

        yPosition = 27; // Adjust as needed
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

    doc.setFontSize(12);

    // Continue with the rest of your document creation...

    let totalPositiony = yPosition; // Adjust as needed

    // Table Content
    if (totalPositiony > pageHeight - 70) {
      // Add a new page
      doc.addPage();
      // Reset the yPosition for the new page
      totalPositiony = 20; // Adjust as needed

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

    let BankPositiony = totalPositiony; // Adjust as needed

    // Table Content
    if (BankPositiony > pageHeight - 70) {
      // Add a new page
      doc.addPage();
      // Reset the yPosition for the new page
      BankPositiony = 20; // Adjust as needed

      bank.forEach((bank, index) => {
        if (index % 2 === 0) {
          // Even index, display in the first column
          doc.text((index + 1).toString(), 15, (BankPositiony += 5), {
            maxWidth: 50,
          });
          doc.text(`${bank.account} Account`, 15, (BankPositiony += 5), {
            maxWidth: 50,
          });
          doc.text(bank.company, 15, (BankPositiony += 10), { maxWidth: 50 });
          doc.text(`Bank Code: ${bank.bankCode}`, 15, (BankPositiony += 10), {
            maxWidth: 50,
          });
          doc.text(
            `Branch Code: ${bank.branchCode}`,
            15,
            (BankPositiony += 10),
            { maxWidth: 50 }
          );
          doc.text(`Swift Code: ${bank.swiftCode}`, 15, (BankPositiony += 10), {
            maxWidth: 50,
          });
          BankPositiony += 10;
        } else {
          // Odd index, display in the second column
          doc.text((index + 1).toString(), 70, (BankPositiony -= 55), {
            maxWidth: 50,
          });
          doc.text(`${bank.account} Account`, 70, (BankPositiony += 5), {
            maxWidth: 50,
          });
          doc.text(bank.company, 70, (BankPositiony += 10), { maxWidth: 50 });
          doc.text(`Bank Code: ${bank.bankCode}`, 70, (BankPositiony += 10), {
            maxWidth: 50,
          });
          doc.text(
            `Branch Code: ${bank.branchCode}`,
            70,
            (BankPositiony += 10),
            { maxWidth: 50 }
          );
          doc.text(`Swift Code: ${bank.swiftCode}`, 70, (BankPositiony += 10), {
            maxWidth: 50,
          });
          BankPositiony += 10;
        }
      });
    } else if (BankPositiony > pageHeight - 130) {
      bank.forEach((bank, index) => {
        if (index < 2) {
          // Display index 1 and 2 on the same page

          if (index % 2 === 0) {
            // Even index, display in the first column
            doc.text((index + 1).toString(), 15, (BankPositiony += 5), {
              maxWidth: 50,
            });
            doc.text(`${bank.account} Account`, 15, (BankPositiony += 5), {
              maxWidth: 50,
            });
            doc.text(bank.company, 15, (BankPositiony += 10), { maxWidth: 50 });
            doc.text(`Bank Code: ${bank.bankCode}`, 15, (BankPositiony += 10), {
              maxWidth: 50,
            });
            doc.text(
              `Branch Code: ${bank.branchCode}`,
              15,
              (BankPositiony += 10),
              { maxWidth: 50 }
            );
            doc.text(
              `Swift Code: ${bank.swiftCode}`,
              15,
              (BankPositiony += 10),
              { maxWidth: 50 }
            );
            BankPositiony += 10;
          } else {
            // Odd index, display in the second column
            doc.text((index + 1).toString(), 70, (BankPositiony -= 55), {
              maxWidth: 50,
            });
            doc.text(`${bank.account} Account`, 70, (BankPositiony += 5), {
              maxWidth: 50,
            });
            doc.text(bank.company, 70, (BankPositiony += 10), { maxWidth: 50 });
            doc.text(`Bank Code: ${bank.bankCode}`, 70, (BankPositiony += 10), {
              maxWidth: 50,
            });
            doc.text(
              `Branch Code: ${bank.branchCode}`,
              70,
              (BankPositiony += 10),
              { maxWidth: 50 }
            );
            doc.text(
              `Swift Code: ${bank.swiftCode}`,
              70,
              (BankPositiony += 10),
              { maxWidth: 50 }
            );
            BankPositiony += 10;
          }
        } else {
          // Index 3 and 4, push to a new page
          doc.addPage();

          // Reset the yPosition for the new page
          BankPositiony = 20; // Adjust as needed

          if (index % 2 === 0) {
            // Even index, display in the first column
            doc.text((index + 1).toString(), 15, (BankPositiony += 5), {
              maxWidth: 50,
            });
            doc.text(`${bank.account} Account`, 15, (BankPositiony += 5), {
              maxWidth: 50,
            });
            doc.text(bank.company, 15, (BankPositiony += 10), { maxWidth: 50 });
            doc.text(`Bank Code: ${bank.bankCode}`, 15, (BankPositiony += 10), {
              maxWidth: 50,
            });
            doc.text(
              `Branch Code: ${bank.branchCode}`,
              15,
              (BankPositiony += 10),
              { maxWidth: 50 }
            );
            doc.text(
              `Swift Code: ${bank.swiftCode}`,
              15,
              (BankPositiony += 10),
              { maxWidth: 50 }
            );
            BankPositiony += 10;
          } else {
            // Odd index, display in the second column
            doc.text((index + 1).toString(), 70, (BankPositiony -= 55), {
              maxWidth: 50,
            });
            doc.text(`${bank.account} Account`, 70, (BankPositiony += 5), {
              maxWidth: 50,
            });
            doc.text(bank.company, 70, (BankPositiony += 10), { maxWidth: 50 });
            doc.text(`Bank Code: ${bank.bankCode}`, 70, (BankPositiony += 10), {
              maxWidth: 50,
            });
            doc.text(
              `Branch Code: ${bank.branchCode}`,
              70,
              (BankPositiony += 10),
              { maxWidth: 50 }
            );
            doc.text(
              `Swift Code: ${bank.swiftCode}`,
              70,
              (BankPositiony += 10),
              { maxWidth: 50 }
            );
            BankPositiony += 10;
          }
        }
      });
    } else {
      bank.forEach((bank, index) => {
        if (index % 2 === 0) {
          // Even index, display in the first column
          doc.text((index + 1).toString(), 15, (BankPositiony += 5), {
            maxWidth: 50,
          });
          doc.text(`${bank.account} Account`, 15, (BankPositiony += 5), {
            maxWidth: 50,
          });
          doc.text(bank.company, 15, (BankPositiony += 10), { maxWidth: 50 });
          doc.text(`Bank Code: ${bank.bankCode}`, 15, (BankPositiony += 10), {
            maxWidth: 50,
          });
          doc.text(
            `Branch Code: ${bank.branchCode}`,
            15,
            (BankPositiony += 10),
            { maxWidth: 50 }
          );
          doc.text(`Swift Code: ${bank.swiftCode}`, 15, (BankPositiony += 10), {
            maxWidth: 50,
          });
          BankPositiony += 10;
        } else {
          // Odd index, display in the second column
          doc.text((index + 1).toString(), 70, (BankPositiony -= 55), {
            maxWidth: 50,
          });
          doc.text(`${bank.account} Account`, 70, (BankPositiony += 5), {
            maxWidth: 50,
          });
          doc.text(bank.company, 70, (BankPositiony += 10), { maxWidth: 50 });
          doc.text(`Bank Code: ${bank.bankCode}`, 70, (BankPositiony += 10), {
            maxWidth: 50,
          });
          doc.text(
            `Branch Code: ${bank.branchCode}`,
            70,
            (BankPositiony += 10),
            { maxWidth: 50 }
          );
          doc.text(`Swift Code: ${bank.swiftCode}`, 70, (BankPositiony += 10), {
            maxWidth: 50,
          });
          BankPositiony += 10;
        }
      });
    }

    doc.text("Singed", 15, BankPositiony + 5);
    doc.line(30, BankPositiony + 5, 60, BankPositiony + 5);

    doc.text("Date", 70, BankPositiony + 5);
    doc.line(80, BankPositiony + 5, 120, BankPositiony + 5);

    // Continue with the rest of your document creation...

    // // Invoice Note
    // const invoiceNote =
    // "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.";
    // doc.setFontSize(10);
    // doc.text("Invoice Note:", 15, yPosition + 20);
    // doc.text(invoiceNote, 15, yPosition + 30, { maxWidth: 50 });

    // Save the PDF
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
