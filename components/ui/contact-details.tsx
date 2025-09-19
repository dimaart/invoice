import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { useInvoice } from "@/context/invoice-context";


export default function ContactDetails() {
  const {invoice, updateInvoice} = useInvoice();
  return (
   <Card>
          <CardHeader>
              <CardTitle>From & To</CardTitle>         
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Bill From</h3>
              </div>
              <div className="space-y-4">
                <Label htmlFor="fromName" className="block text-sm font-medium text-gray-700">Iron Hawk</Label>
                <Input 
                id="fromName" 
                placeholder="Iron Hawk"
                value={invoice.fromName}
                onChange={(e) => updateInvoice({ fromName: e.target.value })}
                />

              </div>
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Bill To</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="toName" className="block text-sm font-medium text-gray-700">Name</Label>
                <Input 
                id="toName" 
                placeholder="Client Name"
                value={invoice.toName}
                onChange={(e) => updateInvoice({ toName: e.target.value })}
                />
                <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                <Input 
                id="email" 
                type="email" 
                placeholder="Client Email"
                value={invoice.toEmail}
                onChange={(e) => updateInvoice({ toEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</Label>
                <Input 
                id="phone" 
                type="tel" 
                placeholder="Client Phone"
                value={invoice.toPhone}
                onChange={(e) => updateInvoice({ toPhone: e.target.value })}
                />
              </div>
              </div>
              
          </CardContent>
      </Card>
  );
}
