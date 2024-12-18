import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TransactionsState} from './transactions.reducer';
import {Transaction, TransactionBalance} from "../types/types";
import {TransactionSelectorUtil} from "./transaction.selector.util";

const selectTransactionsState =
  createFeatureSelector<TransactionsState>('transactionsState');

const selectTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState): Transaction[] => state.transactions
);

const calculateBalance = createSelector(
  selectTransactions,
  (transactions: Transaction[]): TransactionBalance => TransactionSelectorUtil.calculateBalance(transactions)
);

export const transactionSelectors = {selectTransactions, calculateBalance};
