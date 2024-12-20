export interface Transaction {
  id: string;
  name: string;
  date: string;
  type: TransactionType;
  description: string;
  value: number;
  category: {
    [key: string]: string;
  };
}

export type TransactionType = 'income' | 'expense';

export interface Category {
  [key: string]: string[];
}

export interface TransactionBalance {
  incomes: number;
  expenses: number;
  balance: number;
}
