import { Contact } from "lucide-react";
import React from "react";
import BasicDetails from "./basic-details";
import ContactDetails from "./contact-details";
import ItemList from "./item-list";
import TaxAndTotals from "./tax-and-totals";
import NotesAndTerms from "./notes-and-terms";
import VehicleDetails from "./vehicle-details";

export default function InvoiceForm() {
//return <div>Invoice Form Component</div>;
       return (
    <div className="space-y-6">
      <BasicDetails/>
      <ContactDetails/>
      <VehicleDetails/>
      <ItemList/>
      <TaxAndTotals/>
      <NotesAndTerms/>

    </div>
  );
}
      
      
     
  
 {/* <div>
        <label className="block text-sm font-medium text-gray-700">Client Name</label>
        <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter client name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Invoice Date</label>
        <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div> */}