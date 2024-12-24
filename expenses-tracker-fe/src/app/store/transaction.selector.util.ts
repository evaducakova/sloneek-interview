import {Transaction, TransactionBalance} from '../types/types';

export class TransactionSelectorUtil {
  static calculateBalance(transactions: Transaction[]): TransactionBalance {
    const incomes = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.value, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.value, 0);
    const balance = incomes - expenses;
    return {incomes, expenses, balance};
  }
}
