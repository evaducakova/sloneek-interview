import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.reducer';

const selectTransactionsState =
  createFeatureSelector<TransactionsState>('transactionsState');

const selectTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.transactions
);

export const transactionSelectors = { selectTransactions };
