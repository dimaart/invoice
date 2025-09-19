"use client";
import Image from "next/image";
import { useState } from "react";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceForm from "@/components/ui/invoice-form";
import InvoicePreview from "@/components/ui/invoice-preview";



export default function Home() {

  const [showPreview, setShowPreview] = useState(false);
  if (showPreview) {
    return <InvoicePreview onBack={() => setShowPreview(false)} />
  }


  return (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1>Invoice Generator</h1>
          <p className="text-gray-600">Create and manage your invoices easily</p>
        </div>
        <Button onClick={() => setShowPreview(true)}>
          <Eye className="mr-2 h-4 w-4" />
          Preview Invoice
        </Button>
      </div>
       
      <InvoiceForm/>
    </div>
    </div>);
}
