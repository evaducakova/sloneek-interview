// export interface Category {
//   id: number;
//   name: string;
// }

export interface Transaction {
  id: string;
  name: string;
  date: string;
  type: TransactionType;
  description: string;
  value: number;
  category: Category;
}

export type TransactionType = 'income' | 'expense';
export type Category = 'income' | 'food';
