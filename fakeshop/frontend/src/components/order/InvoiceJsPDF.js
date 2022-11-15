//ใบเสร็จแบบ2 jsPdf 
import React from "react";
import { jsPDF } from "jspdf";
import { font } from "./THA0011-normal";
import autoTable from "jspdf-autotable";
import moment from "moment/min/moment-with-locales";
const InvoiceJsPDF = ({ order }) => {
  console.log(order);

  const handlePDF = () => {
    const doc = new jsPDF();
    // add the font to jsPDF
    doc.addFileToVFS("MyFont.ttf", font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    let width = doc.internal.pageSize.getWidth();

    doc.text("Fake Shop Online", width / 2, 10, { align: "center" });
    doc.text(moment(Date.now()).locale("th").format("ll"), width / 2, 15, { align: "center" });

    let data = order.products.map((p, i) => [
      p.product.title,
      p.price,
      p.count,
    ]);


    let content = {
      startY: 20,
      head: [["รายการสินค้า", "ราคา", "จำนวน"]],
      body:data,
      styles:{font:'MyFont'}
    };
    doc.autoTable(content);
    doc.text("ยอดรวมสุทธิ : "+order.cartTotal, 190, 100, { align: "right" });
    doc.save("ใบเสร็จ.pdf");
  };

  return (
    <div>
      <button onClick={handlePDF} className="btn btn-info">
      PDF DownLoad
      </button>
    </div>
  );
};

export default InvoiceJsPDF;
