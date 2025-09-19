import { useInvoice } from "@/context/invoice-context";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./card";
import { Label } from "./label";

export default function TaxAndTotals() {

    const {invoice, updateInvoice} = useInvoice();

  return (
   <Card>
    <CardHeader>
        <CardTitle>Tax & Totals</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            {/* <Label htmlFor="taxRate">Tax Rate  9.5%</Label> */}
        </div>
        <div className="space-y-4">
             <div className="flex justify-between">
                <span >Parts:</span>
                <span >${invoice.partsCost.toFixed(2)}</span>
            </div>
             <div className="flex justify-between">
                <span >Labor:</span>
                <span >${invoice.laborCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span >Subtotal:</span>
                <span >${invoice.subtotal.toFixed(2)}</span>
            </div>
             <div className="flex justify-between">
                <span >Tax (9.5%):</span>
                <span >${invoice.taxAmount.toFixed(2)}</span>
            </div>
             <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span >Total:</span>
                <span >${invoice.total.toFixed(2)}</span>
            </div>
        </div>
    </CardContent>

   </Card>
  );
}
