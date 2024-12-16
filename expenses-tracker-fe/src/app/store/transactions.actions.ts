import { createAction, props } from '@ngrx/store';
import { Transaction } from '../types/types';

export const addTransaction = createAction(
  '[Transaction] Add Transaction',
  props<{ transaction: Transaction }>()
);
export const loadTransactionsFromLocalStorage = createAction(
  '[Transaction] Load Transactions From Local Storage'
);
export const loadTransactionsSuccess = createAction(
  '[Transaction] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);
export const loadTransactionsFailure = createAction(
  '[Transaction] Load Transactions Failure',
  props<{ error: string }>()
);