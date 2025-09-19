import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { Plus } from "lucide-react";
import { Button } from "./button";
import InvoiceItem from "./invoice-item";
import InvoiceItemLabor from "../invoice-item-labor";
import { useInvoice } from "@/context/invoice-context";
import { items } from "./invoice-preview";

// export const items = [
//   { id: 1, name: "Oil Change", quantity: 1, price: 29.99 },
//   { id: 2, name: "Tire Rotation", quantity: 4, price: 19.99 },
//   { id: 3, name: "Brake Inspection", quantity: 1, price: 49.99 },
//   { id: 4, name: "Battery Replacement", quantity: 1, price: 89.99 },
//   { id: 5, name: "Engine Tune-Up", quantity: 1, price: 199.99 },
//   { id: 6, name: "Wheel Alignment", quantity: 1, rate: 150 },
// ];

export default function ItemList() {
  const {invoice, addItem, addItemLabor} = useInvoice();
   /* const addItem = () => {};*/
  return (
    <Card>
     <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Invoice Items</CardTitle>
              <Button onClick={addItem} variant="outline" size="sm" className="ml-auto" >
                <Plus className="mr-2 h-4 w-4" />
                Add Parts
              </Button> 
              <Button onClick={addItemLabor} variant="outline" size="sm" className="items-right flex-row"  >
                <Plus className="mr-2 h-4 w-4" />
                Add Labor
              </Button>                                 
     </CardHeader>
        <CardContent className="space-y-4">
      {invoice.items.map((item, index) => {
        if (typeof item.hours === 'number') {
          return (
            <InvoiceItemLabor
              key={item.id}
              item={item}
              index={index}
              canRemove={invoice.items.length !== 0}
            />
          );
        } else {
          return (
            <InvoiceItem
              key={item.id}
              item={item}
              index={index}
              canRemove={invoice.items.length !== 0}
            />
          );
        }
      })}

        
        </CardContent> 
    </Card>

  );
}
