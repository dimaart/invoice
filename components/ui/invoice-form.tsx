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
