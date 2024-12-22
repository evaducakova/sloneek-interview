import {createAction, props} from '@ngrx/store';
import {Category, Transaction} from '../types/types';

export const loadTransactionsFromLocalStorage = createAction(
  '[Transaction] Load Transactions From Local Storage'
);
export const loadTransactionsSuccess = createAction(
  '[Transaction] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);
export const loadDataFailure = createAction(
  '[Transaction] Load From Local Storage Failure',
  props<{ error: string }>()
);

export const addTransaction = createAction(
  '[Transaction] Add Transaction',
  props<{ transaction: Transaction }>()
);
export const addSampleData = createAction(
  '[Transaction] Add Sample Data',
  props<{ transactions: Transaction[], incomeCategories: Category[], expenseCategories: Category[] }>()
);
export const saveToLocalStorageSuccess = createAction(
  '[Transaction] Save To Local Storage Success',
  props<{ data: Transaction[] | Category[] }>()
);
export const saveToLocalStorageFailure = createAction(
  '[Transaction] Save To Local Storage Failure',
  props<{ error: string }>()
);

export const loadIncomeCategoriesFromLocalStorage = createAction(
  '[Transaction] Load Income Categories From Local Storage'
);
export const loadExpenseCategoriesFromLocalStorage = createAction(
  '[Transaction] Load Expense Categories From Local Storage'
);
export const loadIncomeCategoriesSuccess = createAction(
  '[Transaction] Load Income Categories Success',
  props<{ categories: Category[] }>()
);
export const loadExpenseCategoriesSuccess = createAction(
  '[Transaction] Load Expense Categories Success',
  props<{ categories: Category[] }>()
);
export const addOrEditIncomeCategory = createAction(
  '[Transaction] Add Or Edit Income Category',
  props<{ category: Category }>()
);
export const addOrEditExpenseCategory = createAction(
  '[Transaction] Add Or Edit Expense Category',
  props<{ category: Category }>()
);
export const removeIncomeCategory = createAction(
  '[Transaction] Remove Income Category',
  props<{ id: string }>()
);
export const removeExpenseCategory = createAction(
  '[Transaction] Remove Expense Category',
  props<{ id: string }>()
);
