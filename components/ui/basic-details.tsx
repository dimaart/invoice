
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { useInvoice } from "@/context/invoice-context";

export default function BasicDetails() {
  const {invoice, updateInvoice} = useInvoice();

  return (
      <Card>
          <CardHeader>
              <CardTitle>Invoice Details</CardTitle>         
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <Label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Invoice Number</Label>
                  <Input id="invoiceNumber" 
                    value={invoice.invoiceNumber}
                    onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })} 
                  />
              </div>
              <div>
                <Label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</Label>
                <Input 
                id="date" 
                type="date" 
                onChange={(e) => updateInvoice({ date: e.target.value })} 
                value={invoice.date} 
                />
              </div>
          </CardContent>
      </Card>
  );
}
