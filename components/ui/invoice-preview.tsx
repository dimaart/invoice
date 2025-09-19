import { format } from "path";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { useInvoice } from "@/context/invoice-context";
import { generatePDF } from "@/utils/pdf-generator";
import { useState } from "react";

// export const items = [
//   { id: 1, description: "Oil Change", quantity: 1, price: 29.99 },
//   { id: 2, description: "Tire Rotation", quantity: 4, price: 19.99 },
//   { id: 3, description: "Brake Inspection", quantity: 1, price: 49.99 },
//   { id: 4, description: "Battery Replacement", quantity: 1, price: 89.99 },
//   { id: 5, description: "Engine Tune-Up", quantity: 1, price: 199.99 },
//   { id: 6, description: "Wheel Alignment", quantity: 1, rate: 150 },
// ];

interface InvoicePreviewProps{
    onBack: () => void;
}

export default function InvoicePreview({onBack}:InvoicePreviewProps) {
    const {invoice} = useInvoice();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleDownloadPDF = () => {
        const url = generatePDF(invoice);
        if (typeof url === "string") {
            setPdfUrl(url);
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoice Preview</h1>
        <div className="space-x-4">
            <Button variant="outline" onClick={onBack}>Back to Edit</Button>
            <Button  onClick={handleDownloadPDF}>Download PDF</Button>
        </div>
       </div>

        {pdfUrl && (
            <div className="mb-4 border rounded-lg overflow-hidden">
                <iframe
                    src={pdfUrl}
                    width="100%"
                    height="600px"
                />
            </div>
        )}

        <Card>
            <CardContent className="p-8">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                                <h2 className="text-3xl font-bold mb-2">Invoice</h2>
                    <p className="text-gray-600">{invoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-600">Date: {formatDate(invoice.date)}</p>
                </div>
            </div>

            {/* From To */}
            
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                   {/*  <h3 className="text-3xl font-bold mb-2">Invoice</h3> */}
                    <p className="font-medium">Iron Hawk</p>
                    <p className="text-gray-600">4722 Floral Dr</p>
                    <p className="text-gray-600">Los Angeles, CA 90022</p>
                    <p className="text-gray-600">Phone: (323) 915-8146</p>
                </div>
                <div>
                    <p className="font-medium">Customer:</p>
                    <p className="text-gray-600">{invoice.toName}</p>
                    <p className="text-gray-600">{invoice.toEmail}</p>
                    <p className="text-gray-600">{invoice.toPhone}</p>
                </div>
            </div>

            {/* Vehicle details */}            
            <div className="grid grid-cols-2 gap-8 mb-8">
               
                <div>
                    <p className="font-medium">Vehicle:</p>
                    <p className="text-gray-600">Make: {invoice.vehicleMake}</p>
                    <p className="text-gray-600">Model: {invoice.vehicleModel}</p>
                    <p className="text-gray-600">Year: {invoice.vehicleYear}</p>
                    <p className="text-gray-600">VIN/Plate: {invoice.vehicleVIN}</p>
                    <p className="text-gray-600">Mileage: {invoice.vehicleMileage}</p>
                </div>
            </div>

            {/* Item Table */}
            <table className="w-full mb-8 border-collapse">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-4 border-b">Item</th>
                        <th className="text-left py-2 px-4 border-b">Description</th>
                        <th className="text-left py-2 px-4 border-b">Qty/Hrs</th>
                        <th className="text-left py-2 px-4 border-b">Price/Rate</th>
                        <th className="text-left py-2 px-4 border-b">Total</th>
                    </tr>
                </thead>
                <tbody>{invoice.items && invoice.items.map((item: unknown, count :number=0) => (
                    <tr key={item.id} className="border-b">
                        <td className="py-2 px-4 border-b">{count + 1}</td>
                        <td className="py-2 px-4 border-b">{item.description}</td>
                                                    <td className="py-2 px-4 border-b">{item.type === 'part' ? item.quantity : item.hours}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        {item.type === 'part'
                                                            ? `$${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}`
                                                            : `$${typeof item.rate === "number" ? item.rate.toFixed(2) : "0.00"}`}
                                                    </td>
                                                    <td className="py-2 px-4 border-b">
                                                        {item.type === 'part'
                                                            ? `$${(item.quantity * item.price).toFixed(2)}`
                                                            : `$${(item.hours * item.rate).toFixed(2)}`}
                                                    </td>
                    </tr>
                ))}</tbody>
            </table> 
            
            {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w=64 space-y-2">
                            <div className="flex justify-between">
                                <span>Parts: </span>
                                <span>{formatCurrency(invoice.partsCost)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Labor: </span>
                                <span>{formatCurrency(invoice.laborCost)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Subtotal: </span>
                                <span>{formatCurrency(invoice.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (9.5%): </span>
                                <span>{formatCurrency(invoice.taxAmount)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total: </span>
                                <span>{formatCurrency(invoice.total)}</span>
                            </div>
                        </div>
                    </div>

                {/* Notes & Terms */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-left py-2 px-4 border-b">Notes</h3>
                        <p className="text-left py-2 px-4 ">
                        {invoice.notes && invoice.notes.trim() !== "" ? invoice.notes : "Thank you for your business!"}
                        </p>
                    </div>
                    
                </div>
                 
         </CardContent>
       </Card>
       </div>
    </div>


  );
}
