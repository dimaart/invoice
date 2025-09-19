import type { InvoiceData } from "@/types/invoice";

export const initialInvoiceData: InvoiceData = {
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0], // current date in YYYY-MM-DD format,
    fromName: 'Iron Hawk',
    fromEmail: 'ironhawk@example.com',
    toName: "",
    toEmail: "",
    toPhone: "",
    items: [{
        id: "1",
        type: 'part',
        description: "",
        quantity: 1,
        price: 0,
        amount: 0
    }],
    taxRate: 9.5,
    subtotal: 0,
    taxAmount: 0,
    total: 0,
    laborCost: 0,
    partsCost: 0,
    notes: "",
    terms: "Payment is due within 30 days.",
    discountRate: 0,
    currencySymbol: "$",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleVIN: "",
    vehicleMileage: "",
}
