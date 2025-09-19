import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { useInvoice } from "@/context/invoice-context";

export default function VehicleDetails() {
  const {invoice, updateInvoice} = useInvoice();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700">Make</Label>
          <Input 
          id="vehicleMake" 
          placeholder="Vehicle Make"
          value={invoice.vehicleMake}
          onChange={(e) => updateInvoice({ vehicleMake: e.target.value })}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700">Model</Label>
          <Input 
          id="vehicleModel" 
          placeholder="Vehicle Model" 
          value={invoice.vehicleModel}
          onChange={(e) => updateInvoice({ vehicleModel: e.target.value })}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700">Year</Label>
          <Input 
          id="vehicleYear" 
          type="number" 
          placeholder="Vehicle Year"
          value={invoice.vehicleYear}
          onChange={(e) => updateInvoice({ vehicleYear: e.target.value })}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="vehicleVin" className="block text-sm font-medium text-gray-700">VIN</Label>
          <Input 
          id="vehicleVin" 
          placeholder="Vehicle VIN"
          value={invoice.vehicleVIN}
          onChange={(e) => updateInvoice({ vehicleVIN: e.target.value })}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="vehicleMileage" className="block text-sm font-medium text-gray-700">Milage</Label>
          <Input 
          id="vehicleMileage" 
          placeholder="Vehicle Mileage"
          value={invoice.vehicleMileage}
          onChange={(e) => updateInvoice({ vehicleMileage: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
