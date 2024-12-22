import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  addOrEditExpenseCategory,
  addOrEditIncomeCategory,
  addSampleData,
  addTransaction,
  loadExpenseCategoriesSuccess,
  loadIncomeCategoriesSuccess,
  loadTransactionsSuccess,
  removeExpenseCategory,
  removeIncomeCategory,
  saveToLocalStorageFailure,
} from './transactions.actions';
import {Category, Transaction} from '../types/types';

export interface TransactionsState {
  transactions: Transaction[];
  incomeCategories: Category[];
  expenseCategories: Category[];
  error?: string;
}

export const initialState: TransactionsState = {
  transactions: [],
  incomeCategories: [],
  expenseCategories: [],
};

export const transactionsReducer: ActionReducer<TransactionsState> =
  createReducer(
    initialState,
    on(loadTransactionsSuccess, (state, {transactions}) => ({
      ...state,
      transactions,
    })),

    on(addTransaction, (state, {transaction}) => ({
      ...state,
      transactions: [...state.transactions, transaction],
    })),
    on(addSampleData, (state, {transactions, incomeCategories, expenseCategories}) => ({
      ...state,
      transactions,
      incomeCategories,
      expenseCategories,
    })),
    on(saveToLocalStorageFailure, (state, {error}) => ({
      ...state,
      error,
    })),

    on(loadIncomeCategoriesSuccess, (state, {categories}) => ({
      ...state,
      incomeCategories: categories
    })),
    on(loadExpenseCategoriesSuccess, (state, {categories}) => ({
      ...state,
      expenseCategories: categories
    })),
    on(addOrEditIncomeCategory, (state, {category}) => ({
      ...state,
      incomeCategories: state.incomeCategories.some(cat => cat.id === category.id)
        ? state.incomeCategories.map(cat => cat.id === category.id ? category : cat)
        : [...state.incomeCategories, category],
    })),
    on(addOrEditExpenseCategory, (state, {category}) => ({
      ...state,
      expenseCategories: state.expenseCategories.some(cat => cat.id === category.id)
        ? state.expenseCategories.map(cat => cat.id === category.id ? category : cat)
        : [...state.expenseCategories, category],
    })),
    on(removeIncomeCategory, (state, {id}) => ({
      ...state,
      incomeCategories: state.incomeCategories.filter(cat => cat.id !== id),
    })),
    on(removeExpenseCategory, (state, {id}) => ({
      ...state,
      expenseCategories: state.expenseCategories.filter(cat => cat.id !== id),
    })),
  );
