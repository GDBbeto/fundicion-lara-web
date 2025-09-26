import { CommonError, Transaction, TransactionSummary } from 'types/api';
import Option from 'types/option';

export interface DashboardContextType {
  monthOptions: Option[];
  yearOptions: Option[];
  isSummaryLoading: boolean;
  summaryError: CommonError | null;
  summaryData: TransactionSummary | null;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  dataSale: Transaction[] | null;
  isLoadingSale: boolean;
  isErrorSale: boolean;
  errorSale: CommonError | null;
  dataPurchase: Transaction[] | null;
  isLoadingPurchase: boolean;
  isErrorPurchase: boolean;
  errorPurchase: CommonError | null;
}
