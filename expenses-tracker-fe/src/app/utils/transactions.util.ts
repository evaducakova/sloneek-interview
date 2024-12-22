import {Category, Transaction, TransactionType} from "../types/types";
import {v4 as uuidv4} from "uuid";

export class TransactionsUtil {

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
          "Employment": [
            "Salary",
            "Freelance Gigs",
            "Reimbursement for Office Snacks"
          ]
        }
      },
      {
        id: '2',
        value: {
          "Gifts and Windfalls": [
            "Birthday Money from Grandma",
            "Lottery Winnings (Wishful Thinking)",
            "Unexpected Windfall"
          ]
        }
      },
      {
        id: '3',
        value: {
          "Savings and Refunds": [
            "Found in Couch Cushions",
            "Refunds from Overpriced Purchases",
            "Cashback from Credit Card"
          ]
        }
      },
      {
        id: '4',
        value: {
          "Side Hustles": [
            "Side Hustle: Selling Old Stuff"
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
          "Housing": [
            "Rent for My Humble Abode",
            "Utilities: Keeping the Lights On",
            "Internet: Lifeline to the World"
          ]
        }
      },
      {
        id: '2',
        value: {
          "Food and Drink": [
            "Groceries: Organic and Otherwise",
            "Coffee Addiction",
            "Eating Out: Because I Can't Cook"
          ]
        }
      },
      {
        id: '3',
        value: {
          "Entertainment": [
            "Streaming Services Overload",
            "Impulse Buys",
            "Gadgets and Gizmos",
            "Books and Learning",
            "Travel: Escaping Reality"
          ]
        }
      },
      {
        id: '4',
        value: {
          "Health and Fitness": [
            "Gym Membership",
            "Medical Bills: Ouch!",
            "Insurance: Just in Case"
          ]
        }
      },
      {
        id: '5',
        value: {
          "Transportation": [
            "Car Maintenance and Gas",
            "Public Transport: The Commute Blues"
          ]
        }
      },
      {
        id: '6',
        value: {
          "Personal Care": [
            "Clothing: Retail Therapy",
            "Pet Supplies for My Furry Friend",
            "Home Decor: Pinterest Made Me Do It"
          ]
        }
      },
      {
        id: '7',
        value: {
          "Miscellaneous": [
            "Hobbies and Crafts",
            "Gifts for Friends and Family",
            "Random Acts of Generosity"
          ]
        }
      }
    ];
  }
}
