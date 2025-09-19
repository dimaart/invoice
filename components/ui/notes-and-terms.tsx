import { useInvoice } from "@/context/invoice-context";

export default function NotesAndTerms() {
  const {invoice, updateInvoice} = useInvoice();
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Notes & Terms</h2>
      <textarea id="notes" value={invoice.notes} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows={4} placeholder="Enter notes and terms" 
      onChange={(e) => updateInvoice({ ...invoice, notes: e.target.value })} />
    </div>
  );
}
