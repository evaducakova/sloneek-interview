import {inject, Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Category, Transaction, TransactionBalance, TransactionType} from '../types/types';
import {TransactionsState} from '../store/transactions.reducer';
import {Observable} from 'rxjs';
import {
  addOrEditExpenseCategory,
  addOrEditIncomeCategory,
  addSampleData,
  addTransaction,
  loadExpenseCategoriesFromLocalStorage,
  loadIncomeCategoriesFromLocalStorage,
  loadTransactionsFromLocalStorage,
  removeExpenseCategory,
  removeIncomeCategory,
} from '../store/transactions.actions';
import {transactionSelectors} from '../store/transaction.selector';
import {TransactionsUtil} from '../utils/transactions.util';

@Injectable({
  providedIn: 'root',
})
export class TransactionsFacadeService {
  private store = inject(Store<TransactionsState>);

  loadTransactions(): void {
    this.store.dispatch(loadTransactionsFromLocalStorage());
  }

  loadIncomeCategories(): void {
    this.store.dispatch(loadIncomeCategoriesFromLocalStorage());
  }

  loadExpenseCategories(): void {
    this.store.dispatch(loadExpenseCategoriesFromLocalStorage());
  }

  selectTransactions(): Observable<Transaction[]> {
    return this.store.pipe(select(transactionSelectors.selectTransactions));
  }

  selectIncomeTransactions(): Observable<Transaction[]> {
    return this.store.pipe(select(transactionSelectors.selectIncomeTransactions));
  }

  selectExpenseTransactions(): Observable<Transaction[]> {
    return this.store.pipe(select(transactionSelectors.selectExpenseTransactions));
  }

  selectIncomeCategories(): Observable<Category[]> {
    return this.store.pipe(select(transactionSelectors.selectIncomeCategories));
  }

  selectExpenseCategories(): Observable<Category[]> {
    return this.store.pipe(select(transactionSelectors.selectExpenseCategories));
  }

  addTransaction(transaction: Transaction): void {
    this.store.dispatch(addTransaction({transaction}));
  }

  generateSampleData(): void {
    const {transactions, incomeCategories, expenseCategories} = TransactionsUtil.generateSampleTransactions();
    this.store.dispatch(addSampleData({transactions, incomeCategories, expenseCategories}));
  }

  calculateBalance(): Observable<TransactionBalance> {
    return this.store.pipe(select(transactionSelectors.calculateBalance));
  }

  addOrEditCategory(type: string, category: Category): void {
    if (type === 'income') {
      this.store.dispatch(addOrEditIncomeCategory({category}));
    }
    if (type === 'expense') {
      this.store.dispatch(addOrEditExpenseCategory({category}));
    }
  }

  removeCategory(type: TransactionType, id: string): void {
    if (type === 'income') {
      this.store.dispatch(removeIncomeCategory({id}));
    }
    if (type === 'expense') {
      this.store.dispatch(removeExpenseCategory({id}));
    }
  }
}
