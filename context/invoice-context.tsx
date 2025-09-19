"use client";
import { createContext, useContext, useState} from "react";
import { InvoiceData, InvoiceItem } from "../types/invoice";
import { initialInvoiceData } from "@/lib/constants";
import { calculateTotals } from "@/utils/calculations";

interface InvoiceContextType {
    invoice: InvoiceData;
    updateInvoice: (data: Partial<InvoiceData>) => void;
    addItem: () => void;
    addItemLabor: () => void;
    removeItem: (index: number) => void;
    updateItem: (
        index: number, 
        field: string, 
        value: string | number
    ) => void;
}
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({children}: {children: React.ReactNode}) {
    const [invoice, setInvoice] = useState<InvoiceData>(initialInvoiceData);

    const updateInvoice = (updates: Partial<InvoiceData>) => {
        const newInvoice = { ...invoice, ...updates };
        if (updates.items !== undefined) {
            const {partsCost, laborCost, subtotal, taxAmount, total} = calculateTotals(
                updates.items || invoice.items,
                updates.taxRate || invoice.taxRate
                
            );
            newInvoice.partsCost = partsCost;
            newInvoice.laborCost = laborCost;
            newInvoice.subtotal = subtotal;
            newInvoice.taxAmount = taxAmount;
            newInvoice.total = total;
        }   

    setInvoice(newInvoice);
    };
    const addItem = () => {
        const newItem: InvoiceItem = {
            id: Date.now().toString(),
            type: 'part',
            description: "",
            quantity: 1,
            price: 0,
            amount: 0,
        };
        updateInvoice({ items: [...invoice.items, newItem] });
    }

    const addItemLabor = () => {
        const newItemLabor: InvoiceItem = {
            id: "labor=" + Date.now().toString(),
            type: 'labor',
            description: "",
            hours: 1,
            rate: 0,
            amount: 0,
        };
        updateInvoice({ items: [...invoice.items, newItemLabor] });
    }

    const removeItem = (index: number) => {
        if(invoice.items.length > 1){
            const newItems = invoice.items.filter((_, i) => i !== index);
            updateInvoice({ items: newItems });
        }
    };

    const updateItem = (
        index: number,
        field: string,
        value: string | number
    ) => {
        const newItems = [...invoice.items];
        newItems[index] = { ...newItems[index], [field]: value };
        const item = newItems[index];

        if (item.type === 'part') {
            if (field === 'quantity' || field === 'price') {
                const quantity = typeof (item as any).quantity === 'number' ? (item as any).quantity : Number((item as any).quantity) || 0;
                const price = typeof (item as any).price === 'number' ? (item as any).price : Number((item as any).price) || 0;
                newItems[index].amount = quantity * price;
            }
        } else if (item.type === 'labor') {
            if (field === 'hours' || field === 'rate') {
                const hours = typeof (item as any).hours === 'number' ? (item as any).hours : Number((item as any).hours) || 0;
                const rate = typeof (item as any).rate === 'number' ? (item as any).rate : Number((item as any).rate) || 0;
                newItems[index].amount = hours * rate;
            }
        }
        updateInvoice({ items: newItems });
    };

    return (
    <InvoiceContext.Provider value={{invoice, updateInvoice, addItem, removeItem, updateItem, addItemLabor}}>
        {children}
    </InvoiceContext.Provider>);
} 

export function useInvoice() {
    const context = useContext(InvoiceContext);
    if (context === undefined) {
        throw new Error("useInvoice must be used within an InvoiceProvider");
    }
    return context;
}


