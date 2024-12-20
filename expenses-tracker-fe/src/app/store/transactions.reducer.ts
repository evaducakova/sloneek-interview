import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  addSampleData,
  addTransaction,
  loadExpenseCategoriesSuccess,
  loadIncomeCategoriesSuccess,
  loadTransactionsSuccess,
  saveToLocalStorageFailure,
} from './transactions.actions';
import {Category, Transaction} from '../types/types';

export interface TransactionsState {
  transactions: Transaction[];
  incomeCategories: Category;
  expenseCategories: Category;
  error?: string;
}

export const initialState: TransactionsState = {
  transactions: [],
  incomeCategories: {} as Category,
  expenseCategories: {} as Category,
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
  );
