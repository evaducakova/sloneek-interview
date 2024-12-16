import { ActionReducer, createReducer, on } from '@ngrx/store';
import {
  addTransaction,
  loadTransactionsFailure,
  loadTransactionsFromLocalStorage,
  loadTransactionsSuccess,
} from './transactions.actions';
import { Category, Transaction } from '../types/types';

export interface TransactionsState {
  transactions: Transaction[];
  categories: Category[];
  isLoading: boolean;
  error?: string;
}

export const initialState: TransactionsState = {
  transactions: [],
  categories: [],
  isLoading: false,
};

export const transactionsReducer: ActionReducer<TransactionsState> =
  createReducer(
    initialState,
    on(loadTransactionsFromLocalStorage, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(loadTransactionsSuccess, (state, { transactions }) => ({
      ...state,
      transactions,
      isLoading: false,
    })),
    on(loadTransactionsFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    })),
    on(addTransaction, (state, { transaction }) => ({
      ...state,
      transactions: [...state.transactions, transaction],
    }))
  );
