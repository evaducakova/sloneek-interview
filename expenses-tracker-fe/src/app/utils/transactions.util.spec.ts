import {v4 as uuidv4} from 'uuid';
import {Transaction} from '../types/types';
import {TransactionsUtil} from './transactions.util';

describe('TransactionsUtil', () => {
  describe('groupTransactionsByCategory', () => {
    it('should group transactions by category', () => {
      const transactions: Transaction[] = [
        {
          id: uuidv4(),
          name: 'Transaction 1',
          date: '2023-01-01',
          type: 'income',
          description: 'Income 1',
          value: 100,
          category: {'Employment': 'Salary'}
        },
        {
          id: uuidv4(),
          name: 'Transaction 2',
          date: '2023-01-02',
          type: 'expense',
          description: 'Expense 1',
          value: 50,
          category: {'Housing': 'Rent'}
        },
        {
          id: uuidv4(),
          name: 'Transaction 3',
          date: '2023-01-03',
          type: 'income',
          description: 'Income 2',
          value: 200,
          category: {'Employment': 'Salary'}
        }
      ];
      const result = TransactionsUtil.groupTransactionsByCategory(transactions);
      expect(result).toEqual([
        {name: 'Employment', y: 300},
        {name: 'Housing', y: 50}
      ]);
    });
  });

  describe('groupTransactionsByCategoryValue', () => {
    it('should group transactions by category value', () => {
      const transactions: Transaction[] = [
        {
          id: uuidv4(),
          name: 'Transaction 1',
          date: '2023-01-01',
          type: 'income',
          description: 'Income 1',
          value: 100,
          category: {'Employment': 'Salary'}
        },
        {
          id: uuidv4(),
          name: 'Transaction 2',
          date: '2023-01-02',
          type: 'expense',
          description: 'Expense 1',
          value: 50,
          category: {'Housing': 'Rent'}
        },
        {
          id: uuidv4(),
          name: 'Transaction 3',
          date: '2023-01-03',
          type: 'income',
          description: 'Income 2',
          value: 200,
          category: {'Employment': 'Salary'}
        }
      ];
      const result = TransactionsUtil.groupTransactionsByCategoryValue(transactions);
      expect(result).toEqual([
        {name: 'Salary', y: 300},
        {name: 'Rent', y: 50}
      ]);
    });
  });

  describe('groupTransactionsByCategoryAverageValue', () => {
    it('should group transactions by category average value', () => {
      const transactions: Transaction[] = [
        {
          id: uuidv4(),
          name: 'Transaction 1',
          date: '2023-01-01',
          type: 'income',
          description: 'Income 1',
          value: 100,
          category: {'Employment': 'Salary'}
        },
        {
          id: uuidv4(),
          name: 'Transaction 2',
          date: '2023-01-02',
          type: 'expense',
          description: 'Expense 1',
          value: 50,
          category: {'Housing': 'Rent'}
        },
        {
          id: uuidv4(),
          name: 'Transaction 3',
          date: '2023-01-03',
          type: 'income',
          description: 'Income 2',
          value: 200,
          category: {'Employment': 'Salary'}
        }
      ];
      const result = TransactionsUtil.groupTransactionsByCategoryAverageValue(transactions);
      expect(result).toEqual([
        {name: 'Employment', y: 150},
        {name: 'Housing', y: 50}
      ]);
    });
  });

  describe('generateSampleTransactions', () => {
    it('should generate sample transactions', () => {
      const {transactions, incomeCategories, expenseCategories} = TransactionsUtil.generateSampleTransactions();
      expect(transactions.length).toBe(50);
      expect(incomeCategories.length).toBeGreaterThan(0);
      expect(expenseCategories.length).toBeGreaterThan(0);
    });
  });
});
