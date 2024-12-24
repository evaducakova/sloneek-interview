import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TransactionsState} from './transactions.reducer';
import {Category, Transaction, TransactionBalance} from '../types/types';
import {TransactionSelectorUtil} from './transaction.selector.util';

const selectTransactionsState =
  createFeatureSelector<TransactionsState>('transactionsState');

const selectTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState): Transaction[] => state.transactions
);

const selectIncomeTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState): Transaction[] => state.transactions.filter(transaction => transaction.type === 'income')
);

const selectExpenseTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState): Transaction[] => state.transactions.filter(transaction => transaction.type === 'expense')
);

const selectIncomeCategories = createSelector(
  selectTransactionsState,
  (state: TransactionsState): Category[] => state.incomeCategories
);

const selectExpenseCategories = createSelector(
  selectTransactionsState,
  (state: TransactionsState): Category[] => state.expenseCategories
);

const calculateBalance = createSelector(
  selectTransactions,
  (transactions: Transaction[]): TransactionBalance => TransactionSelectorUtil.calculateBalance(transactions)
);

export const transactionSelectors = {
  selectTransactions,
  selectIncomeTransactions,
  selectExpenseTransactions,
  selectIncomeCategories,
  selectExpenseCategories,
  calculateBalance
};
