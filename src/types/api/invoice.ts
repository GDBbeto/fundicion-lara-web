export interface InvoiceData {
  invoiceNumber: string;
  amount: number;
  issuerRfc: string;
  pdfInfoFallback: Record<string, any>;
}
