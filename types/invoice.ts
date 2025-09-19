
export type InvoiceItem =
    | {
            id: string;
            type: 'part';
            description: string;
            quantity: number;
            price: number;
            amount: number;
        }
    | {
            id: string;
            type: 'labor';
            description: string;
            hours: number;
            rate: number;
            amount: number;
        };

export interface InvoiceData{
    invoiceNumber: string;
    date: string;
    fromName: string;
    fromEmail: string;
    toName: string;
    toEmail: string;
    items: InvoiceItem[];
    toPhone: string;
    notes: string;
    terms: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
    vehicleVIN: string;
    vehicleMileage: string;
    taxRate: number; // as a percentage, e.g., 10 for 10%
    discountRate: number; // as a percentage, e.g., 5 for 5%
    currencySymbol: string; // e.g., "$"
    subtotal: number;
    taxAmount: number;
    total: number;
    laborHours: number;
    partsCost: number;
    laborCost: number;
}