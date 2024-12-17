import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  addTransaction,
  loadTransactionsFailure,
  loadTransactionsFromLocalStorage,
  loadTransactionsSuccess,
  saveToLocalStorageFailure,
  saveToLocalStorageSuccess,
} from './transactions.actions';
import {Category, Transaction} from '../types/types';

export interface TransactionsState {
  transactions: Transaction[];
  categories: Category[];
  error?: string;
}

export const initialState: TransactionsState = {
  transactions: [],
  categories: [],
};

export const transactionsReducer: ActionReducer<TransactionsState> =
  createReducer(
    initialState,
    on(loadTransactionsFromLocalStorage, (state) => ({
      ...state,
    })),
    on(loadTransactionsSuccess, (state, {transactions}) => ({
      ...state,
      transactions,
    })),
    on(loadTransactionsFailure, (state, {error}) => ({
      ...state,
      error,
    })),
    on(addTransaction, (state, {transaction}) => ({
      ...state,
      transactions: [...state.transactions, transaction],
    })),
    on(saveToLocalStorageSuccess, (state, {transactions}) => ({
      ...state,
      transactions,
    })),
    on(saveToLocalStorageFailure, (state, {error}) => ({
      ...state,
      error,
    })),
  );
