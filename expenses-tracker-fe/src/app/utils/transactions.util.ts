import {Category, Transaction, TransactionType} from '../types/types';
import {v4 as uuidv4} from 'uuid';
import * as Highcharts from 'highcharts';

export class TransactionsUtil {

  static groupTransactionsByCategory(transactions: Transaction[]): Highcharts.PointOptionsObject[] {
    const categoryMap = new Map<string, number>();

    transactions.forEach(transaction => {
      const category: string = Object.keys(transaction.category)[0];
      const value: number = transaction.value;
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category)! + value);
      } else {
        categoryMap.set(category, value);
      }
    });

    return Array.from(categoryMap.entries()).map(([name, y]) => ({name, y}));
  }

  static groupTransactionsByCategoryValue(transactions: Transaction[]): Highcharts.PointOptionsObject[] {
    const grouped: { [key: string]: number } = transactions.reduce((acc: {
      [key: string]: number
    }, transaction: Transaction) => {
      const categoryValue = Object.values(transaction.category)[0] as string;
      if (!acc[categoryValue]) {
        acc[categoryValue] = 0;
      }
      acc[categoryValue] += transaction.value;
      return acc;
    }, {});

    return Object.keys(grouped).map(key => ({
      name: key,
      y: grouped[key]
    }));
  }

  static groupTransactionsByCategoryAverageValue(transactions: Transaction[]): Highcharts.PointOptionsObject[] {
    const grouped: { [key: string]: { total: number, count: number } } = transactions.reduce((acc: {
      [key: string]: { total: number, count: number }
    }, transaction: Transaction) => {
      const categoryKey = Object.keys(transaction.category)[0];
      if (!acc[categoryKey]) {
        acc[categoryKey] = {total: 0, count: 0};
      }
      acc[categoryKey].total += transaction.value;
      acc[categoryKey].count += 1;
      return acc;
    }, {});

    return Object.keys(grouped).map(key => ({
      name: key,
      y: grouped[key].total / grouped[key].count
    }));
  }

  static generateSampleTransactions(): {
    transactions: Transaction[],
    incomeCategories: Category[],
    expenseCategories: Category[],
  } {
    const transactions: Transaction[] = [];
    const incomeCategories: Category[] = this.getSampleIncomeCategories();
    const expenseCategories: Category[] = this.getSampleExpenseCategories();

    const getRandomCategory = (categories: Category[]): { [key: string]: string } => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const keys = Object.keys(randomCategory.value);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return {[randomKey]: randomCategory.value[randomKey][Math.floor(Math.random() * randomCategory.value[randomKey].length)]};
    };

    for (let i = 0; i < 50; i++) {
      const type: TransactionType = Math.random() < 0.3 ? 'income' : 'expense';
      transactions.push({
        id: uuidv4(),
        name: `Transaction ${i + 1}`,
        date: new Date().toISOString().split('T')[0],
        type: type,
        description: `Description for transaction ${i + 1}`,
        value: parseFloat((Math.random() * (type === 'income' ? 1000 : 100)).toFixed(2)),
        category: type === 'income' ? getRandomCategory(incomeCategories) : getRandomCategory(expenseCategories),
      });
    }

    return {transactions, incomeCategories, expenseCategories};
  }

  private static getSampleIncomeCategories(): Category[] {
    return [
      {
        id: '1',
        value: {
          'Employment': [
            'Salary',
            'Freelance Gigs',
            'Reimbursement for Office Snacks'
          ]
        }
      },
      {
        id: '2',
        value: {
          'Gifts and Windfalls': [
            'Birthday Money from Grandma',
            'Lottery Winnings (Wishful Thinking)',
            'Unexpected Windfall'
          ]
        }
      },
      {
        id: '3',
        value: {
          'Savings and Refunds': [
            'Found in Couch Cushions',
            'Refunds from Overpriced Purchases',
            'Cashback from Credit Card'
          ]
        }
      },
      {
        id: '4',
        value: {
          'Side Hustles': [
            'Side Hustle: Selling Old Stuff'
          ]
        }
      }
    ];
  }

  private static getSampleExpenseCategories(): Category[] {
    return [
      {
        id: '1',
        value: {
          'Housing': [
            'Rent for My Humble Abode',
            'Utilities: Keeping the Lights On',
            'Internet: Lifeline to the World'
          ]
        }
      },
      {
        id: '2',
        value: {
          'Food and Drink': [
            'Groceries: Organic and Otherwise',
            'Coffee Addiction',
            'Eating Out: Because I Can\'t Cook'
          ]
        }
      },
      {
        id: '3',
        value: {
          'Entertainment': [
            'Streaming Services Overload',
            'Impulse Buys',
            'Gadgets and Gizmos',
            'Books and Learning',
            'Travel: Escaping Reality'
          ]
        }
      },
      {
        id: '4',
        value: {
          'Health and Fitness': [
            'Gym Membership',
            'Medical Bills: Ouch!',
            'Insurance: Just in Case'
          ]
        }
      },
      {
        id: '5',
        value: {
          'Transportation': [
            'Car Maintenance and Gas',
            'Public Transport: The Commute Blues'
          ]
        }
      },
      {
        id: '6',
        value: {
          'Personal Care': [
            'Clothing: Retail Therapy',
            'Pet Supplies for My Furry Friend',
            'Home Decor: Pinterest Made Me Do It'
          ]
        }
      },
      {
        id: '7',
        value: {
          'Miscellaneous': [
            'Hobbies and Crafts',
            'Gifts for Friends and Family',
            'Random Acts of Generosity'
          ]
        }
      }
    ];
  }
}
