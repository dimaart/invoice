import { InvoiceData } from "@/types/invoice";
import {jsPDF} from "jspdf";
import { Bold } from "lucide-react";

export const generatePDF = (invoice: InvoiceData) => {
    // Placeholder function to generate PDF
    const doc = new jsPDF();
    let y = 30;
    // Title
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20, {align: "left"});
    doc.setFontSize(12);
    // Invoice Details
    doc.text(`${invoice.invoiceNumber}`, 14, y);
    // Invoice Date
    doc.text(`${invoice.date}`, 175, y);
    y += 10;
    // From
    
    doc.text("Iron Hawk", 14, y);
    doc.text(`${invoice.toName}`, 140, y);
    y += 6;
    doc.text("4722 Floral Dr", 14, y);
    if (invoice.toEmail !== ""){
        
        doc.text(`Email: ${invoice.toEmail}`, 140, y);
        y += 6;
        doc.text("Los Angeles, CA 90022", 14, y);
        doc.text(`Phone: ${invoice.toPhone}`, 140, y);
    } else {
        doc.text(`Phone: ${invoice.toPhone}`, 140, y);
        y += 6;
        doc.text("Los Angeles, CA 90022", 14, y);
    }
    
    //doc.text(`Phone: ${invoice.toPhone}`, 140, y);
    y += 6;
    doc.text("Phone: (323) 915-8146", 14, y);
    y += 10;
    // Vehicle Details
    
    doc.text("Vehicle Details", 14, y-1);
    doc.line(14, y, 196, y);
    y += 6;
    doc.text(`Make: ${invoice.vehicleMake}`, 14, y);
    y += 6;
    doc.text(`Model: ${invoice.vehicleModel}`, 14, y);
    y += 6;
    doc.text(`Year: ${invoice.vehicleYear}`, 14, y);
    y += 6;
    doc.text(`VIN/Plate: ${invoice.vehicleVIN}`, 14, y);
    y += 6;
    doc.text(`Mileage: ${invoice.vehicleMileage}`, 14, y);
    y += 10;

    // Table Header
    doc.setFontSize(10);
    doc.text("Item", 14, y);
    doc.text("Description", 40, y);
    doc.text("Qty/Hrs", 100, y);
    doc.text("Unit Price/Rate", 140, y);
    doc.text("Total", 180, y);
    y += 6;
    doc.line(14, y, 196, y);
    y += 10;

    // Table Rows
    let i = 1;
    invoice.items.forEach((item) => {
        // Wrap description to fit column width (max 60px wide at x=40)
        const descLines = doc.splitTextToSize(item.description, 58);
        const lineCount = descLines.length;
        for (let lineIdx = 0; lineIdx < lineCount; lineIdx++) {
            const isFirstLine = lineIdx === 0;
            doc.text(isFirstLine ? i.toString() : '', 14, y);
            doc.text(descLines[lineIdx], 40, y);
            if (item.type === 'part') {
                doc.text(isFirstLine ? item.quantity.toString() : '', 100, y);
                doc.text(isFirstLine ? `$${item.price.toFixed(2)}` : '', 140, y);
                doc.text(isFirstLine ? `$${(item.quantity * item.price).toFixed(2)}` : '', 180, y);
            } else if (item.type === 'labor') {
                doc.text(isFirstLine ? item.hours.toString() : '', 100, y);
                doc.text(isFirstLine ? `$${item.rate.toFixed(2)}` : '', 140, y);
                doc.text(isFirstLine ? `$${(item.hours * item.rate).toFixed(2)}` : '', 180, y);
            }
            y += 6;
            if (y > 270) { // Avoid printing beyond page
                doc.addPage();
                y = 20;
            }
        }
        i++;
    });

    y += 10;
    doc.line(140, y, 196, y);
    y += 6;
    // Totals
    doc.text("Parts:", 140, y);
    doc.text(`$${invoice.partsCost.toFixed(2)}`, 180, y);
    y += 6;
    doc.text("Labor Cost:", 140, y);
    doc.text(`$${invoice.laborCost.toFixed(2)}`, 180, y);
    y += 6;
    doc.text("Subtotal:", 140, y);
    doc.text(`$${invoice.subtotal.toFixed(2)}`, 180, y);
    y += 6;
    doc.text(`Tax (${invoice.taxRate}%):`, 140, y);
    doc.text(`$${invoice.taxAmount.toFixed(2)}`, 180, y);
    y += 6;
    doc.setFontSize(12);
    doc.text("Total:", 140, y);
    doc.text(`$${invoice.total.toFixed(2)}`, 180, y);

    y += 10;
    // Notes
    if (invoice.notes === "") {
        doc.text("Notes", 14, y);
        y += 2;
        doc.line(14, y, 70, y);
        doc.text("Thank you for your business!", 14, y + 6);
    } else {
        doc.text("Notes", 14, y);
        y += 2;
        doc.line(14, y, 70, y);
        doc.text(`${invoice.notes}`, 14, y + 6);
    }

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    return pdfUrl;
};

function formatCurrency(rate: string | number): string | string[] {
    throw new Error("Function not implemented.");
}
