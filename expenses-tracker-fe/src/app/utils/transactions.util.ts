import {Category, Transaction} from "../types/types";
import {v4 as uuidv4} from "uuid";

export class TransactionsUtil {

  static generateSampleTransactions(): {
    transactions: Transaction[],
    incomeCategories: Category,
    expenseCategories: Category
  } {
    const transactions: Transaction[] = [];
    const incomeCategories = this.getSampleIncomeCategories();
    const expenseCategories = this.getSampleExpenseCategories();

    const getRandomCategory = (categories: Category) => {
      const keys = Object.keys(categories);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return {[randomKey]: categories[randomKey][Math.floor(Math.random() * categories[randomKey].length)]};
    };

    for (let i = 0; i < 50; i++) {
      const type = Math.random() < 0.3 ? 'income' : 'expense';
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

  private static getSampleIncomeCategories(): Category {
    return {
      "Employment": [
        "Salary",
        "Freelance Gigs",
        "Reimbursement for Office Snacks"
      ],
      "Gifts and Windfalls": [
        "Birthday Money from Grandma",
        "Lottery Winnings (Wishful Thinking)",
        "Unexpected Windfall"
      ],
      "Savings and Refunds": [
        "Found in Couch Cushions",
        "Refunds from Overpriced Purchases",
        "Cashback from Credit Card"
      ],
      "Side Hustles": [
        "Side Hustle: Selling Old Stuff"
      ]
    }
  }

  private static getSampleExpenseCategories(): Category {
    return {
      "Housing": [
        "Rent for My Humble Abode",
        "Utilities: Keeping the Lights On",
        "Internet: Lifeline to the World"
      ],
      "Food and Drink": [
        "Groceries: Organic and Otherwise",
        "Coffee Addiction",
        "Eating Out: Because I Can't Cook"
      ],
      "Entertainment": [
        "Streaming Services Overload",
        "Impulse Buys",
        "Gadgets and Gizmos",
        "Books and Learning",
        "Travel: Escaping Reality"
      ],
      "Health and Fitness": [
        "Gym Membership I Rarely Use",
        "Medical Bills: Ouch!",
        "Insurance: Just in Case"
      ],
      "Transportation": [
        "Car Maintenance and Gas",
        "Public Transport: The Commute Blues"
      ],
      "Personal Care": [
        "Clothing: Retail Therapy",
        "Pet Supplies for My Furry Friend",
        "Home Decor: Pinterest Made Me Do It"
      ],
      "Miscellaneous": [
        "Hobbies and Crafts",
        "Gifts for Friends and Family",
        "Random Acts of Generosity"
      ]
    }
  }
}
