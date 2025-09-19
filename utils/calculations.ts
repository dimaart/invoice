import type { InvoiceData, InvoiceItem } from "@/types/invoice";

export const calculateTotals = (items: InvoiceItem[],taxRate: number | string) =>{
    const subtotal = items.reduce((sum, item) => {
        const amount = typeof item.amount === "number" ? item.amount : 0;
        return sum + amount;
    }, 0);
    const partsCost = items.reduce((sum, item) => {
        if(item.type === 'part'){
            const amount = typeof item.amount === "number" ? item.amount : 0;
            return sum + amount;
        }
        return sum;
    }, 0);
    const laborCost = items.reduce((sum, item) => {
        if(item.type === 'labor'){
            const amount = typeof item.amount === "number" ? item.amount : 0;
            return sum + amount;
        }
        return sum;
    }, 0);
    const taxAmount = (partsCost * (Number(taxRate) / 100));
    const total = subtotal + taxAmount;
    return {subtotal, taxAmount, total, partsCost, laborCost}
}