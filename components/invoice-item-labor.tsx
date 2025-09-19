import { Trash2 } from "lucide-react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { use } from "react";
import { useInvoice } from "@/context/invoice-context";
import { Button } from "./ui/button";


interface InvoiceItemProps {
    item: {
        description: string;
        quantity: number;
        price: number;
        amount: number;
        hours: number;
    };
    index: number;
    canRemove: boolean;
}

export default function InvoiceItem({ 
    item, 
    index, 
    canRemove, 
}: InvoiceItemProps) {
    const { removeItem, updateItem } = useInvoice();

    const handleQuantityChange = (value : string) => {
        if(value === ""){
            updateItem(index, "quantity", "");

        } else {
            const numValue = Number.parseInt(value);
            if(!isNaN(numValue) && numValue >= 0){
                updateItem(index, "quantity", numValue);
            }
        }
    };

    const handleQuantityBlur = () => {
        if(item.quantity === "" || item.quantity === 0){
            updateItem(index, "quantity", 1);
        }
    };

    const handleRateBlur = () => {
        if(item.price === "" || item.price === 0){
            updateItem(index, "rate", 0);
        }
    };

    const handleRateChange = (value : string) => {
        if(value === ""){
            updateItem(index, "rate", "");
        } else {
            const numValue = Number.parseFloat(value);
            if(!isNaN(numValue) && numValue >= 0){
                updateItem(index, "rate", numValue);
            }
        }
    };       


  return (
    <div className="grid grid-cols-12 gap-4 p-4 border rounded-lg">
          <div className="col-span-5">
              <Label>Description</Label>
              <Input 
              placeholder="Item"
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value )} 
              />
            </div>
            <div className="col-span-2">
                <Label>Hours</Label>
                <Input
                  placeholder="Hours"
                  value={item.hours}
                  onChange={(e) => updateItem(index, "hours", Number(e.target.value))}
                  onBlur={handleQuantityBlur} 
                />
            </div>
            <div className="col-span-2">
                <Label>Rate ($)</Label>
                <Input
                    min={"0.00"}
                    step={"0.01"}
                    type="number" 
                    value={item.price}
                    onChange={(e) => handleRateChange(e.target.value)}
                    onBlur={handleRateBlur}
                />
            </div>
            <div className="col-span-2">
              <Label>Amount ($)</Label>
              <div className ="h-10 px-3 py-2 bg-gray-50 border rounded-md flex items-center">
               {typeof item.amount === "number" ? item.amount.toFixed(2) : "0.00"}
              </div>
            </div>
              
          <div className="col-span-1 flex items-end justify-end">
              <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(index)}
                  disabled={!canRemove}
              >
                  <Trash2 className="h-4 w-4" />
              </Button>
          </div>
    </div>
  );
}
