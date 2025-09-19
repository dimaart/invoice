import { Trash2 } from "lucide-react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { use } from "react";
import { useInvoice } from "@/context/invoice-context";
import { Button } from "./ui/button";



interface InvoiceItemLaborProps {
    item: {
        description: string;
        hours: number;
        rate: number;
        amount: number;
    };
    index: number;
    canRemove: boolean;
}

export default function InvoiceItemLabor({ 
    item, 
    index, 
    canRemove, 
}: InvoiceItemLaborProps) {
    const { removeItem, updateItem } = useInvoice();


    const handleHoursChange = (value: string) => {
        const numValue = Number(value);
        if (!isNaN(numValue) && numValue >= 0) {
            updateItem(index, "hours", numValue);
        }
    };

    const handleRateBlur = () => {
        if (item.rate === 0) {
            updateItem(index, "rate", 0);
        }
    };

    const handleRateChange = (value: string) => {
        const numValue = Number(value);
        if (!isNaN(numValue) && numValue >= 0) {
            updateItem(index, "rate", numValue);
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
                  type="number"
                  min={"0"}
                  value={item.hours}
                  onChange={(e) => handleHoursChange(e.target.value)}
                />
            </div>
            <div className="col-span-2">
                <Label>Rate ($)</Label>
                <Input
                    min={"0.00"}
                    step={"0.01"}
                    type="number" 
                    value={item.rate}
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
